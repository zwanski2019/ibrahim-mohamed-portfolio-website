import { describe, it, expect, beforeAll, vi } from 'vitest';
import { loadFunction } from '../../../tests/loadFunction';

let handler: (req: Request) => Promise<Response>;

beforeAll(async () => {
  (globalThis as any).Deno = { env: { get: (k: string) => process.env[k] } };
  handler = await loadFunction('supabase/functions/blogger-proxy/index.ts');
});

describe('blogger-proxy', () => {
  it('forwards list posts request', async () => {
    process.env.BLOGGER_API_KEY = 'x';
    process.env.BLOGGER_BLOG_ID = '1';
    const fetchMock = vi.fn(async () => new Response('{"items":[]}', { status: 200 }));
    (globalThis as any).fetch = fetchMock;

    const res = await handler(new Request('http://localhost/posts'));
    expect(res.status).toBe(200);
    expect(fetchMock).toHaveBeenCalled();
  });
});
