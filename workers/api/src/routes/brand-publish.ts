import type { Env } from '../index';
import { logAudit } from '../lib/audit';
import { handleCorsPreflight, withCors } from '../lib/cors';
import { requireAuth, requireSuper } from '../lib/auth';

export const handleBrandPublish = async (
  request: Request,
  env: Env
): Promise<Response> => {
  // Handle CORS preflight
  if (request.method === 'OPTIONS') {
    return handleCorsPreflight(request, env);
  }

  if (request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  // Require super admin authentication
  const auth = await requireAuth(request, env);
  if (auth instanceof Response) return withCors(request, auth, env);
  const superCheck = requireSuper(auth);
  if (superCheck instanceof Response) return withCors(request, superCheck, env);

  try {
    const url = new URL(request.url);
    const pathParts = url.pathname.split('/').filter(Boolean);
    // Expected path: /api/omdalat/brands/:id/publish
    const brandId = pathParts[3]; // Index 3 is the brand ID

    if (!brandId) {
      return new Response(
        JSON.stringify({ error: 'Brand ID required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Check if brand exists
    const brandCheck = await env.DB.prepare(
      `SELECT id, publication_status, can_host_stay FROM brands WHERE id = ?`
    ).bind(brandId).first();

    if (!brandCheck) {
      return new Response(
        JSON.stringify({ error: 'Brand not found' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Check all required gates before allowing publish
    const gates = await checkPublishGates(env, brandId);

    if (!gates.all_passed) {
      return new Response(
        JSON.stringify({
          error: 'Cannot publish - required gates not met',
          gates
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const now = new Date().toISOString();

    // Update brand publication_status to published
    const updateResult = await env.DB.prepare(
      `UPDATE brands SET publication_status = 'published', updated_at = ? WHERE id = ?`
    ).bind(now, brandId).run();

    if (!updateResult.success) {
      return new Response(
        JSON.stringify({ error: 'Failed to update brand status' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Create release report
    const releaseReportId = `release_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    await env.DB.prepare(
      `INSERT INTO release_reports (id, brand_id, release_status, risk_flags, missing_items, created_at)
       VALUES (?, ?, ?, ?, ?, ?)`
    ).bind(
      releaseReportId,
      brandId,
      'ready_to_publish',
      JSON.stringify([]),
      JSON.stringify([]),
      now
    ).run();

    await logAudit(env, null, 'brand.publish.completed', 'brand', brandId, {
      publication_status: 'published',
      gates
    });

    const response = new Response(
      JSON.stringify({
        brand_id: brandId,
        publication_status: 'published',
        release_report_id: releaseReportId,
        gates
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

    return withCors(request, response, env);
  } catch (error) {
    console.error('Brand publish error:', error);
    await logAudit(env, null, 'brand.publish.error', 'brand', null, {
      error: error instanceof Error ? error.message : 'Unknown error'
    });
    const errorResponse = new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
    return withCors(request, errorResponse, env);
  }
};

async function checkPublishGates(env: Env, brandId: string): Promise<{
  all_passed: boolean;
  gates: {
    owner_consent: boolean;
    content_approved: boolean;
    images_approved: boolean;
    compliance_reviewed: boolean;
    qa_passed: boolean;
  };
}> {
  const gates = {
    owner_consent: false,
    content_approved: false,
    images_approved: false,
    compliance_reviewed: false,
    qa_passed: false
  };

  // Check owner consent
  const ownerConsent = await env.DB.prepare(
    `SELECT consent_status FROM owners o
     JOIN brands b ON o.id = b.owner_id
     WHERE b.id = ?`
  ).bind(brandId).first();

  if (ownerConsent && ownerConsent.consent_status === 'approved') {
    gates.owner_consent = true;
  }

  // Check content approval
  const contentApproval = await env.DB.prepare(
    `SELECT COUNT(*) as count FROM approvals
     WHERE brand_id = ? AND action = 'approve_content'`
  ).bind(brandId).first();

  if (contentApproval && contentApproval.count > 0) {
    gates.content_approved = true;
  }

  // Check images approval
  const imagesApproval = await env.DB.prepare(
    `SELECT COUNT(*) as count FROM approvals
     WHERE brand_id = ? AND action = 'approve_images'`
  ).bind(brandId).first();

  if (imagesApproval && imagesApproval.count > 0) {
    gates.images_approved = true;
  }

  // Check compliance review AND compliance values
  const complianceApproval = await env.DB.prepare(
    `SELECT COUNT(*) as count FROM approvals
     WHERE brand_id = ? AND action = 'approve_compliance'`
  ).bind(brandId).first();

  if (complianceApproval && complianceApproval.count > 0) {
    gates.compliance_reviewed = true;
  }

  // C3: compliance-value gate — enforce actual values for lodging brands
  const brandCheck = await env.DB.prepare(
    `SELECT can_host_stay FROM brands WHERE id = ?`
  ).bind(brandId).first();

  if (brandCheck && brandCheck.can_host_stay === 1) {
    const complianceValues = await env.DB.prepare(
      `SELECT lodging_compliance, business_registration, pccc
       FROM compliance_checklists
       WHERE brand_id = ?`
    ).bind(brandId).first();

    if (complianceValues) {
      // Require actual values, not 'unknown'
      if (complianceValues.lodging_compliance === 'unknown' ||
          complianceValues.business_registration === 'unknown' ||
          complianceValues.pccc === 'unknown') {
        gates.compliance_reviewed = false;
      }
    } else {
      gates.compliance_reviewed = false;
    }
  }

  // Check QA passed (via agent_runs with type 'qa' and status 'completed')
  const qaCheck = await env.DB.prepare(
    `SELECT COUNT(*) as count FROM agent_runs
     WHERE brand_id = ? AND run_type = 'qa' AND status = 'completed'`
  ).bind(brandId).first();

  if (qaCheck && qaCheck.count > 0) {
    gates.qa_passed = true;
  }

  const allPassed = Object.values(gates).every(v => v === true);

  return {
    all_passed: allPassed,
    gates
  };
}
