import { useState } from 'react';

interface GravatarProfile {
  entry?: unknown[];
  [key: string]: unknown;
}

export const useGravatar = () => {
  const [profile, setProfile] = useState<GravatarProfile | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchProfile = async (email: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`https://ceihcnfngpmrtqunhaey.functions.supabase.co/gravatar?email=${encodeURIComponent(email)}`);
      if (!response.ok) {
        throw new Error('Failed to fetch Gravatar profile');
      }
      const data = await response.json();
      setProfile(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setProfile(null);
    setError(null);
    setIsLoading(false);
  };

  return { profile, error, isLoading, fetchProfile, reset };
};
