import { supabase } from '@/integrations/supabase/client';

export interface TurnstileVerifyResponse {
  success: boolean;
  'error-codes'?: string[];
  challenge_ts?: string;
  hostname?: string;
}

export async function verifyTurnstile(token: string): Promise<TurnstileVerifyResponse> {
  try {
    // Use the secure edge function instead of exposing the secret
    const { data, error } = await supabase.functions.invoke('verify-turnstile', {
      body: { token }
    });

    if (error) {
      console.error('Edge function error:', error);
      throw new Error('Verification service unavailable');
    }

    return data as TurnstileVerifyResponse;
  } catch (error) {
    console.error('Turnstile verification error:', error);
    throw new Error('Verification failed - please try again');
  }
}
