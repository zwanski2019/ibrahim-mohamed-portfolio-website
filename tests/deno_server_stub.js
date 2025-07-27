export function serve(fn) {
  globalThis.__lastHandler = fn;
}
