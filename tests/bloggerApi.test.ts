import { describe, it, expect, vi } from 'vitest';

async function importApi(vars: Record<string, string | undefined>) {
  for (const key of Object.keys(vars)) {
    if (vars[key] === undefined) delete process.env[key];
    else process.env[key] = vars[key] as string;
  }
  vi.resetModules();
  return await import('../src/services/bloggerApi.ts');
}

describe('bloggerApi', () => {
  it('uses edge function when config missing', async () => {
    const fetchMock = vi.fn(async () => new Response('{"items":[]}', { status: 200 }));
    (globalThis as any).fetch = fetchMock;
    const { bloggerApi } = await importApi({ VITE_BLOGGER_API_KEY: '', VITE_BLOGGER_BLOG_ID: '' });
    await bloggerApi.getPosts();
    expect(fetchMock.mock.calls[0][0]).toContain('/blogger-proxy/posts');
  });

  it('uses Blogger API when config present', async () => {
    const fetchMock = vi.fn(async () => new Response('{"items":[]}', { status: 200 }));
    (globalThis as any).fetch = fetchMock;
    const { bloggerApi } = await importApi({ VITE_BLOGGER_API_KEY: 'k', VITE_BLOGGER_BLOG_ID: 'b' });
    await bloggerApi.getPosts();
    expect(fetchMock.mock.calls[0][0]).toContain('googleapis.com');
  });
});
