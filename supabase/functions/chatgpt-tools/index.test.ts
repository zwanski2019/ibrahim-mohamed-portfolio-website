import { describe, it, expect, beforeAll, vi } from 'vitest';
import { loadFunction } from '../../../tests/loadFunction';

let handler: (req: Request) => Promise<Response>;

beforeAll(async () => {
  (globalThis as any).Deno = { env: { get: (k: string) => process.env[k] } };
  handler = await loadFunction('supabase/functions/chatgpt-tools/index.ts');
});

describe('chatgpt-tools', () => {
  it('includes cv system prompt', async () => {
    process.env.OPENAI_API_KEY = 'x';
    const fetchMock = vi.fn(async () =>
      new Response(JSON.stringify({ choices: [{ message: { content: 'ok' } }] }))
    );
    (globalThis as any).fetch = fetchMock;

    const req = new Request('http://localhost', {
      method: 'POST',
      body: JSON.stringify({ prompt: 'hello', tool: 'cv' }),
      headers: { 'Content-Type': 'application/json' },
    });
    const res = await handler(req);
    const body = JSON.parse(fetchMock.mock.calls[0][1].body);
    expect(body.messages[0].content).toContain('professional CV');
    const json = await res.json();
    expect(json.result).toBe('ok');
  });

  it('includes seo system prompt', async () => {
    process.env.OPENAI_API_KEY = 'x';
    const fetchMock = vi.fn(async () =>
      new Response(JSON.stringify({ choices: [{ message: { content: 'ok' } }] }))
    );
    (globalThis as any).fetch = fetchMock;

    const req = new Request('http://localhost', {
      method: 'POST',
      body: JSON.stringify({ prompt: 'hello', tool: 'seo' }),
      headers: { 'Content-Type': 'application/json' },
    });
    const res = await handler(req);
    const body = JSON.parse(fetchMock.mock.calls[0][1].body);
    expect(body.messages[0].content).toContain('SEO expert');
    const json = await res.json();
    expect(json.result).toBe('ok');
  });
});
