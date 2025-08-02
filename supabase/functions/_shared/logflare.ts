const LOGFLARE_API_KEY = Deno.env.get('LOGFLARE_API_KEY');
const LOGFLARE_SOURCE_ID = Deno.env.get('LOGFLARE_SOURCE_ID');

interface LogPayload {
  message: string;
  level?: 'info' | 'error' | 'warn' | 'debug';
  [key: string]: unknown;
}

export async function logflare(payload: LogPayload) {
  if (!LOGFLARE_API_KEY || !LOGFLARE_SOURCE_ID) {
    return;
  }

  try {
    await fetch('https://api.logflare.app/logs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': LOGFLARE_API_KEY,
      },
      body: JSON.stringify({
        source: LOGFLARE_SOURCE_ID,
        log: payload,
        level: payload.level ?? 'info',
      }),
    });
  } catch (_error) {
    // Swallow errors from logging to avoid breaking main function
  }
}
