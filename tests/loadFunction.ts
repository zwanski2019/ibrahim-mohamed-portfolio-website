import { build } from 'esbuild';
import { tmpdir } from 'os';
import { join, basename } from 'path';
import { pathToFileURL } from 'url';

const serverStub = new URL('./deno_server_stub.js', import.meta.url).pathname;

export async function loadFunction(entry: string) {
  const outfile = join(tmpdir(), basename(entry) + '.mjs');
  await build({
    entryPoints: [entry],
    bundle: true,
    format: 'esm',
    platform: 'node',
    outfile,
    plugins: [{
      name: 'replace-server',
      setup(build) {
        build.onResolve({ filter: /^https:\/\/deno.land\/.*\/server.ts$/ }, () => ({ path: serverStub }));
      },
    }],
  });
  await import(pathToFileURL(outfile).href + `?${Date.now()}`);
  return (globalThis as any).__lastHandler;
}
