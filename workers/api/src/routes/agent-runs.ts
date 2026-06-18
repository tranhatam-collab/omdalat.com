import type { Env } from '../index';
import { generateId } from '../lib/id-gen';
import { logAudit } from '../lib/audit';
import { handleCorsPreflight, withCors } from '../lib/cors';

export const handleAgentRuns = async (
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

  try {
    const body = await request.json();
    const { brand_id, run_type, mode } = body;

    // Validate required fields
    if (!brand_id || !run_type) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: brand_id, run_type' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Validate run_type
    const validRunTypes = [
      'intake', 'maps_resolver', 'verification', 'brand_architect',
      'content', 'image_director', 'seo', 'compliance', 'cms_builder', 'qa'
    ];
    if (!validRunTypes.includes(run_type)) {
      return new Response(
        JSON.stringify({ error: `Invalid run_type. Must be one of: ${validRunTypes.join(', ')}` }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Validate mode
    const validModes = ['draft', 'preview', 'review'];
    const modeValue = mode || 'draft';
    if (!validModes.includes(modeValue)) {
      return new Response(
        JSON.stringify({ error: `Invalid mode. Must be one of: ${validModes.join(', ')}` }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Check if brand exists
    const brandCheck = await env.DB.prepare(
      `SELECT id, publication_status FROM brands WHERE id = ?`
    ).bind(brand_id).first();

    if (!brandCheck) {
      return new Response(
        JSON.stringify({ error: 'Brand not found' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const now = new Date().toISOString();

    // Create agent run record
    const agentRunId = generateId('agent');
    const agentRunResult = await env.DB.prepare(
      `INSERT INTO agent_runs (id, brand_id, run_type, mode, status, created_at)
       VALUES (?, ?, ?, ?, ?, ?)`
    ).bind(
      agentRunId,
      brand_id,
      run_type,
      modeValue,
      'pending',
      now
    ).run();

    if (!agentRunResult.success) {
      return new Response(
        JSON.stringify({ error: 'Failed to create agent run record' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Queue the agent run for async processing
    try {
      await env.AUTOMATION_QUEUE.send({
        type: 'agent_run',
        agent_run_id: agentRunId,
        brand_id,
        run_type,
        mode: modeValue
      });
    } catch (queueError) {
      console.error('Failed to queue agent run:', queueError);
      // Update status to failed
      await env.DB.prepare(
        `UPDATE agent_runs SET status = ?, output = ? WHERE id = ?`
      ).bind(
        'failed',
        JSON.stringify({ error: 'Failed to queue for processing' }),
        agentRunId
      ).run();

      return new Response(
        JSON.stringify({ error: 'Failed to queue agent run' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    await logAudit(env, null, 'agent.run.created', 'agent_run', agentRunId, {
      brand_id,
      run_type,
      mode: modeValue
    });

    const response = new Response(
      JSON.stringify({
        agent_run_id: agentRunId,
        brand_id,
        run_type,
        mode: modeValue,
        status: 'pending'
      }),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    );

    return withCors(request, response, env);
  } catch (error) {
    console.error('Agent run error:', error);
    await logAudit(env, null, 'agent.run.error', 'agent_run', null, {
      error: error instanceof Error ? error.message : 'Unknown error'
    });
    const errorResponse = new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
    return withCors(request, errorResponse, env);
  }
};
