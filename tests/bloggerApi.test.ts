import { describe, it, expect, vi } from 'vitest';

async function importApi(vars: Record<string, string | undefined>) {
  // Set or delete env vars based on test case
  for (const key of Object.keys(vars)) {
    if (vars[key] === undefined) delete process.env[key];
    else process.env[key] = vars[key]!;
  }
  vi.resetModules();
  const mod = await import('../src/services/bloggerApi.ts');
  return mod.bloggerApi;
}

describe('bloggerApi', () => {
  it('falls back to proxy endpoint when config missing', async () => {
    const bloggerApi = await importApi({
      VITE_BLOGGER_API_KEY: undefined,
      VITE_BLOGGER_BLOG_ID: undefined,
    });

    const fetchMock = vi.fn(async (url: string) =>
      new Response(JSON.stringify({ items: [] }), { status: 200 })
    );
    (globalThis as any).fetch = fetchMock;

    await bloggerApi.getPosts();
    expect(fetchMock).toHaveBeenCalled();
    const calledUrl = fetchMock.mock.calls[0][0] as string;
    expect(calledUrl).toContain('/functions/v1/blogger-proxy/posts');
  });

  it('uses direct Blogger API when config present', async () => {
    const bloggerApi = await importApi({
      VITE_BLOGGER_API_KEY: 'my-key',
      VITE_BLOGGER_BLOG_ID: 'my-blog',
    });

    const fetchMock = vi.fn(async (url: string) =>
      new Response(JSON.stringify({ items: [] }), { status: 200 })
    );
    (globalThis as any).fetch = fetchMock;

    await bloggerApi.getPosts();
    expect(fetchMock).toHaveBeenCalled();
    const calledUrl = fetchMock.mock.calls[0][0] as string;
    expect(calledUrl).toContain('https://www.googleapis.com/blogger/v3');
  });
});
