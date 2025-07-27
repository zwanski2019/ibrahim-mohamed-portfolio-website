import { supabase } from '@/integrations/supabase/client';
import { TurnstileVerifyResponse } from './verifyTurnstile';

export async function logTurnstile(token: string, result: TurnstileVerifyResponse) {
  try {
    await supabase.from('turnstile_logs').insert({
      token,
      success: result.success,
      errors: result['error-codes'] || null,
      hostname: result.hostname || null,
      challenge_ts: result.challenge_ts || null
    });
  } catch (error) {
    console.warn('Failed to log Turnstile result', error);
  }
}
