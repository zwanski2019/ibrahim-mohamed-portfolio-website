import { describe, it, expect, beforeAll, vi } from 'vitest';
import { loadFunction } from '../../../tests/loadFunction';

let handler: (req: Request) => Promise<Response>;

beforeAll(async () => {
  (globalThis as any).Deno = { env: { get: (k: string) => process.env[k] } };
  handler = await loadFunction('supabase/functions/check-imei/index.ts');
});

describe('check-imei', () => {
  it('returns error when external API fails', async () => {
    process.env.IMEI_API_KEY = 'test';
    const fetchMock = vi.fn(async () => new Response('err', { status: 500 }));
    (globalThis as any).fetch = fetchMock;

    const req = new Request('http://localhost', {
      method: 'POST',
      body: JSON.stringify({ imei: '123456789012345', service: 'basic' }),
      headers: { 'Content-Type': 'application/json' },
    });
    const res = await handler(req);
    expect(res.status).toBe(502);
    const data = await res.json();
    expect(data.error).toContain('unavailable');
  });
});
