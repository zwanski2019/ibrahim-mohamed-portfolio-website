
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface IMEIResult {
  result: string;
  error?: string;
}

export const useIMEIChecker = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const checkIMEI = async (imei: string, service: string = 'basic') => {
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const { data, error: functionError } = await supabase.functions.invoke('check-imei', {
        body: { imei, service }
      });

      if (functionError) {
        throw new Error(functionError.message);
      }

      if (data.error) {
        setError(data.error);
      } else {
        setResult(data.result);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setResult(null);
    setError(null);
    setIsLoading(false);
  };

  return {
    checkIMEI,
    isLoading,
    result,
    error,
    reset
  };
};
