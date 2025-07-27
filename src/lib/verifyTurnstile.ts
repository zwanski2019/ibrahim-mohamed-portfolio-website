export interface TurnstileVerifyResponse {
  success: boolean;
  'error-codes'?: string[];
  challenge_ts?: string;
  hostname?: string;
}

export async function verifyTurnstile(token: string): Promise<TurnstileVerifyResponse> {
  const secret = import.meta.env.VITE_CF_TURNSTILE_SECRET;
  if (!secret) {
    throw new Error('CF_TURNSTILE_SECRET not set');
  }

  const formData = new FormData();
  formData.append('secret', secret);
  formData.append('response', token);

  const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    body: formData
  });

  if (!res.ok) {
    throw new Error(`Verification request failed: ${res.status}`);
  }

  return res.json() as Promise<TurnstileVerifyResponse>;
}
