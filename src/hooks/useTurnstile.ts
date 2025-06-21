
import { useState, useRef } from 'react';
import { TurnstileInstance } from '@marsidev/react-turnstile';
import { useToast } from '@/hooks/use-toast';

export const useTurnstile = () => {
  const [token, setToken] = useState<string | null>(null);
  const [isVerified, setIsVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const turnstileRef = useRef<TurnstileInstance>(null);
  const { toast } = useToast();

  const handleVerify = (verificationToken: string) => {
    setToken(verificationToken);
    setIsVerified(true);
    setIsLoading(false);
  };

  const handleError = (error: string) => {
    console.error('Turnstile error:', error);
    setToken(null);
    setIsVerified(false);
    setIsLoading(false);
    toast({
      title: "Verification failed",
      description: "Please try again or refresh the page.",
      variant: "destructive",
    });
  };

  const handleExpire = () => {
    setToken(null);
    setIsVerified(false);
    setIsLoading(false);
    toast({
      title: "Verification expired",
      description: "Please complete the verification again.",
      variant: "destructive",
    });
  };

  const reset = () => {
    if (turnstileRef.current) {
      turnstileRef.current.reset();
    }
    setToken(null);
    setIsVerified(false);
    setIsLoading(false);
  };

  const refresh = () => {
    setIsLoading(true);
    reset();
  };

  return {
    token,
    isVerified,
    isLoading,
    turnstileRef,
    handleVerify,
    handleError,
    handleExpire,
    reset,
    refresh,
  };
};
