import createDOMPurify from 'dompurify';

// Initialize DOMPurify with the available Window implementation.
// When running in Node (tests), fall back to jsdom. This avoids using
// Node's `module` API which breaks browser builds.
let windowRef: Window;

if (typeof window === 'undefined') {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { JSDOM } = require('jsdom');
  windowRef = new JSDOM('').window as unknown as Window;
} else {
  windowRef = window;
}

const DOMPurify = createDOMPurify(windowRef);

/** Sanitize untrusted HTML strings before rendering. */
export function sanitizeHtml(html: string): string {
  return DOMPurify.sanitize(html);
}
