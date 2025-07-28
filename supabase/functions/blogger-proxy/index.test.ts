import { describe, it, expect, beforeAll, vi } from 'vitest';
import { loadFunction } from '../../../tests/loadFunction';

let handler: (req: Request) => Promise<Response>;

beforeAll(async () => {
  (globalThis as any).Deno = { env: { get: (k: string) => process.env[k] } };
  handler = await loadFunction('supabase/functions/blogger-proxy/index.ts');
});

describe('blogger-proxy', () => {
  it('returns config error when secrets missing', async () => {
    delete process.env.BLOGGER_API_KEY;
    delete process.env.BLOGGER_BLOG_ID;
    const req = new Request('http://localhost/posts', { method: 'POST', body: '{}' });
    const res = await handler(req);
    expect(res.status).toBe(500);
    const json = await res.json();
    expect(json.error).toContain('Server configuration error');
  });

  it('proxies list posts', async () => {
    process.env.BLOGGER_API_KEY = 'a';
    process.env.BLOGGER_BLOG_ID = 'b';
    const fetchMock = vi.fn(async () => new Response('{"items":[]}', { status: 200 }));
    (globalThis as any).fetch = fetchMock;
    const req = new Request('http://localhost/posts', { method: 'POST', body: '{}' });
    const res = await handler(req);
    expect(res.status).toBe(200);
    const url = fetchMock.mock.calls[0][0] as string;
    expect(url).toContain('/blogs/b/posts?');
    const json = await res.json();
    expect(json.items).toBeDefined();
  });
});
