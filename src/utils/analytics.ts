export function anonymizeEmail(email: string): string {
  if (!email) return '';
  const [localPart, domain] = email.split('@');
  if (!localPart || !domain) return '';
  return `${localPart[0]}***@${domain}`;
}

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent(eventName: string, params: Record<string, unknown> = {}): void {
  const payload = { ...params } as Record<string, unknown> & { email?: string };
  if (payload.email) {
    payload.email = anonymizeEmail(payload.email);
  }
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', eventName, payload);
  }
}

