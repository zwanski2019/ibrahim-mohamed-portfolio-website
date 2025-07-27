import createDOMPurify from 'dompurify';
import { createRequire } from 'module';

// Initialize DOMPurify with either the browser window or jsdom for tests.
const require = createRequire(import.meta.url);
const windowRef: Window = typeof window === 'undefined'
  ? new (require('jsdom').JSDOM)('').window as unknown as Window
  : window;

const DOMPurify = createDOMPurify(windowRef);

/** Sanitize untrusted HTML strings before rendering. */
export function sanitizeHtml(html: string): string {
  return DOMPurify.sanitize(html);
}
