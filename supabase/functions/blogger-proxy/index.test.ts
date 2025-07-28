import { describe, it, expect, beforeAll, vi } from 'vitest';
import { loadFunction } from '../../../tests/loadFunction';

let handler: (req: Request) => Promise<Response>;

beforeAll(async () => {
  // Mock Deno.env.get to read from process.env
  (globalThis as any).Deno = { env: { get: (k: string) => process.env[k] } };
  handler = await loadFunction('supabase/functions/blogger-proxy/index.ts');
});

describe('blogger-proxy', () => {
  it('returns config error when secrets are missing', async () => {
    // Ensure secrets are undefined
    delete process.env.BLOGGER_API_KEY;
    delete process.env.BLOGGER_BLOG_ID;

    const req = new Request('http://localhost/posts', {
      method: 'POST',
      body: JSON.stringify({}),
      headers: { 'Content-Type': 'application/json' },
    });

    const res = await handler(req);
    expect(res.status).toBe(500);

    const json = await res.json();
    expect(json.error).toContain('Server configuration error');
  });

  it('proxies list posts when config is present', async () => {
    // Set up valid secrets
    process.env.BLOGGER_API_KEY = 'test-key';
    process.env.BLOGGER_BLOG_ID = 'test-blog';

    // Mock fetch to simulate Blogger API response
    const fetchMock = vi.fn(async () =>
      new Response('{"items":[{"id":"1","title":"Test"}]}', { status: 200 })
    );
    (globalThis as any).fetch = fetchMock;

    const req = new Request('http://localhost/posts', {
      method: 'POST',
      body: JSON.stringify({ maxResults: 5 }),
      headers: { 'Content-Type': 'application/json' },
    });

    const res = await handler(req);
    expect(res.status).toBe(200);

    // Ensure our proxy invoked the external endpoint with the blog ID
    const calledUrl = fetchMock.mock.calls[0][0] as string;
    expect(calledUrl).toContain(`/blogs/test-blog/posts?`);
    expect(fetchMock).toHaveBeenCalled();

    const json = await res.json();
    expect(json.items).toBeInstanceOf(Array);
    expect(json.items[0].id).toBe('1');
  });
});
