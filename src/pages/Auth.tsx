
import React, { useState, useEffect } from 'react';
import { Navigate, useSearchParams } from 'react-router-dom';
import { useEnhancedAuth } from '@/hooks/useEnhancedAuth';
import EnhancedSignIn from '@/components/auth/EnhancedSignIn';
import RoleBasedSignUp from '@/components/auth/RoleBasedSignUp';
import OnboardingFlow from '@/components/auth/OnboardingFlow';

const Auth = () => {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const { isAuthenticated, user, loading } = useEnhancedAuth();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    // Handle OAuth callback
    const callback = searchParams.get('callback');
    if (callback) {
      // OAuth callback handled by useEnhancedAuth automatically
    }
  }, [searchParams]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (isAuthenticated && user?.profile?.onboarding_completed) {
    return <Navigate to="/" replace />;
  }

  if (isAuthenticated && !user?.profile?.onboarding_completed) {
    return <OnboardingFlow />;
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {mode === 'signin' ? (
          <EnhancedSignIn
            onSuccess={() => {}}
            onSwitchToSignUp={() => setMode('signup')}
          />
        ) : (
          <RoleBasedSignUp
            onSuccess={() => {}}
            onSwitchToSignIn={() => setMode('signin')}
          />
        )}
      </div>
    </div>
  );
};

export default Auth;
