import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

vi.mock('@/integrations/supabase/client', () => ({
  supabase: {
    functions: {
      invoke: vi.fn(),
    },
  },
}));

async function getSupabase() {
  const mod = await import('@/integrations/supabase/client');
  return mod.supabase;
}

const originalEnv = { ...process.env };

async function loadApi() {
  const mod = await import('@/services/bloggerApi');
  return mod.bloggerApi;
}

beforeEach(async () => {
  Object.assign(process.env, originalEnv);
  vi.resetModules();
  const supabase = await getSupabase();
  (supabase.functions.invoke as any).mockClear();
});

afterEach(() => {
  Object.assign(process.env, originalEnv);
});

describe('bloggerApi', () => {
  it('falls back to edge function when config missing', async () => {
    delete (process.env as any).VITE_BLOGGER_API_KEY;
    delete (process.env as any).VITE_BLOGGER_BLOG_ID;
    const api = await loadApi();
    const supabase = await getSupabase();
    (supabase.functions.invoke as any).mockResolvedValue({ data: { items: [] } });
    await api.getPosts();
    expect(supabase.functions.invoke).toHaveBeenCalledWith('blogger-proxy/posts', {
      body: { maxResults: 12 },
    });
  });

  it('uses direct fetch when config present', async () => {
    process.env.VITE_BLOGGER_API_KEY = 'x';
    process.env.VITE_BLOGGER_BLOG_ID = 'y';
    const fetchMock = vi.fn(async () => new Response('{"items":[]}', { status: 200 }));
    (globalThis as any).fetch = fetchMock;
    const api = await loadApi();
    const supabase = await getSupabase();
    await api.getPosts();
    expect(fetchMock).toHaveBeenCalled();
    expect(supabase.functions.invoke).not.toHaveBeenCalled();
  });
});
