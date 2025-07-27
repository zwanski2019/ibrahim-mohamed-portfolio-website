import { supabase } from '@/integrations/supabase/client';
import { TurnstileVerifyResponse } from './verifyTurnstile';

export async function logTurnstile(token: string, result: TurnstileVerifyResponse) {
  try {
    // Log security event instead of direct turnstile log (handled by edge function)
    await supabase.from('security_events').insert({
      event_type: 'turnstile_client_verification',
      event_data: {
        success: result.success,
        errors: result['error-codes'] || [],
        hostname: result.hostname,
        token_prefix: token.substring(0, 8) + '...' // Only log prefix for privacy
      }
    });
  } catch (error) {
    console.warn('Failed to log Turnstile result', error);
  }
}
