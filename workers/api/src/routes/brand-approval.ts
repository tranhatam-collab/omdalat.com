import type { Env } from '../index';
import { generateId } from '../lib/id-gen';
import { logAudit } from '../lib/audit';
import { handleCorsPreflight, withCors } from '../lib/cors';
import { requireAuth, requireSuper } from '../lib/auth';
import { validateBrandCopy } from '../lib/overclaim-validator';

export const handleBrandApproval = async (
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
    // Expected path: /api/omdalat/brands/:id/approve
    const brandId = pathParts[3]; // Index 3 is the brand ID

    if (!brandId) {
      return new Response(
        JSON.stringify({ error: 'Brand ID required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const body = await request.json();
    const { action, approved_by, notes } = body;

    // Validate required fields
    if (!action || !approved_by) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: action, approved_by' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Validate action
    const validActions = ['approve_content', 'approve_images', 'approve_compliance', 'approve_publish'];
    if (!validActions.includes(action)) {
      return new Response(
        JSON.stringify({ error: `Invalid action. Must be one of: ${validActions.join(', ')}` }),
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

    // Special validation for approve_publish
    if (action === 'approve_publish') {
      // Check all required gates before allowing publish approval
      const gates = await checkPublishGates(env, brandId);

      if (!gates.all_passed) {
        return new Response(
          JSON.stringify({
            error: 'Cannot approve publish - required gates not met',
            gates
          }),
          { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
      }
    }

    const now = new Date().toISOString();

    // Create approval record
    const approvalId = generateId('approval');
    const approvalResult = await env.DB.prepare(
      `INSERT INTO approvals (id, brand_id, action, approved_by, notes, created_at)
       VALUES (?, ?, ?, ?, ?, ?)`
    ).bind(
      approvalId,
      brandId,
      action,
      approved_by,
      notes || null,
      now
    ).run();

    if (!approvalResult.success) {
      return new Response(
        JSON.stringify({ error: 'Failed to create approval record' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // If approve_publish, update brand publication_status
    if (action === 'approve_publish') {
      await env.DB.prepare(
        `UPDATE brands SET publication_status = 'published', updated_at = ? WHERE id = ?`
      ).bind(now, brandId).run();
    }

    await logAudit(env, approved_by, 'brand.approval.created', 'approval', approvalId, {
      brand_id: brandId,
      action,
      notes
    });

    const response = new Response(
      JSON.stringify({
        approval_id: approvalId,
        brand_id: brandId,
        action,
        approved_by,
        status: 'approved'
      }),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    );

    return withCors(request, response, env);
  } catch (error) {
    console.error('Brand approval error:', error);
    await logAudit(env, null, 'brand.approval.error', 'approval', null, {
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
    copy_clean: boolean;
  };
}> {
  const gates = {
    owner_consent: false,
    content_approved: false,
    images_approved: false,
    compliance_reviewed: false,
    qa_passed: false,
    copy_clean: false
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

  // Check content approval AND overclaim validation
  const contentApproval = await env.DB.prepare(
    `SELECT COUNT(*) as count FROM approvals
     WHERE brand_id = ? AND action = 'approve_content'`
  ).bind(brandId).first();

  if (contentApproval && contentApproval.count > 0) {
    gates.content_approved = true;
    
    // H3: overclaim validator — check published content blocks for forbidden terms
    const contentBlocksResult = await env.DB.prepare(
      `SELECT payload FROM content_blocks
       WHERE brand_id = ? AND status = 'published'`
    ).bind(brandId).all();
    
    const contentBlocks = contentBlocksResult.results || [];
    for (const block of contentBlocks) {
      const payload = typeof block.payload === 'string' ? block.payload : JSON.stringify(block.payload);
      const validation = validateBrandCopy(payload, 'L3'); // L3 brand microsites
      if (!validation.valid) {
        gates.content_approved = false;
        break; // Stop on first violation
      }
    }
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
      // For stay brands: only allow verified, approved, or not_applicable
      // Block both 'unknown' (not checked) and 'pending' (in progress but not done)
      const ok = new Set(['verified', 'approved', 'not_applicable']);
      if (!ok.has(complianceValues.lodging_compliance) ||
          !ok.has(complianceValues.business_registration) ||
          !ok.has(complianceValues.pccc)) {
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

  // Set copy_clean gate based on content_approved (overclaim validator result)
  gates.copy_clean = gates.content_approved;

  const allPassed = Object.values(gates).every(v => v === true);

  return {
    all_passed: allPassed,
    gates
  };
}
