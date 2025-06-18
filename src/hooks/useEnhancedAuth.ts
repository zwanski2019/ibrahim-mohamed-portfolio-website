
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User, Session } from '@supabase/supabase-js';
import { useToast } from '@/hooks/use-toast';

type UserRole = 'student' | 'instructor' | 'job_seeker' | 'employer' | 'freelancer' | 'admin';

interface EnhancedUser extends User {
  profile?: {
    id: string;
    full_name: string;
    avatar_url: string | null;
    user_roles: UserRole[];
    user_type: 'employer' | 'worker';
    onboarding_completed: boolean;
    profile_completion_percentage: number;
  };
}

export const useEnhancedAuth = () => {
  const [user, setUser] = useState<EnhancedUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) {
          console.error('Error getting session:', error);
        } else {
          setSession(session);
          if (session?.user) {
            await fetchUserProfile(session.user);
          }
        }
      } catch (error) {
        console.error('Session error:', error);
      } finally {
        setLoading(false);
      }
    };

    getInitialSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        if (session?.user) {
          setTimeout(() => fetchUserProfile(session.user), 0);
        } else {
          setUser(null);
        }
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserProfile = async (authUser: User) => {
    try {
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', authUser.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching profile:', error);
        return;
      }

      const enhancedUser: EnhancedUser = {
        ...authUser,
        profile: profile || null
      };

      setUser(enhancedUser);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const signUp = async (email: string, password: string, userData: {
    full_name: string;
    user_type: 'employer' | 'worker';
    user_roles: string[];
  }) => {
    try {
      const redirectUrl = `${window.location.origin}/`;
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            full_name: userData.full_name,
            user_type: userData.user_type,
            user_roles: userData.user_roles
          }
        }
      });

      if (error) {
        toast({
          title: "Sign Up Error",
          description: error.message,
          variant: "destructive",
        });
        return { error };
      }

      if (data.user && !data.session) {
        toast({
          title: "Check your email",
          description: "Please check your email for a verification link to complete your registration.",
        });
      }

      return { data, error: null };
    } catch (error) {
      console.error('Sign up error:', error);
      return { error: error as Error };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast({
          title: "Sign In Error",
          description: error.message,
          variant: "destructive",
        });
        return { error };
      }

      return { data, error: null };
    } catch (error) {
      console.error('Sign in error:', error);
      return { error: error as Error };
    }
  };

  const signInWithGoogle = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth?callback=true`
        }
      });

      if (error) {
        toast({
          title: "Google Sign In Error",
          description: error.message,
          variant: "destructive",
        });
        return { error };
      }

      return { data, error: null };
    } catch (error) {
      console.error('Google sign in error:', error);
      return { error: error as Error };
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        toast({
          title: "Sign Out Error",
          description: error.message,
          variant: "destructive",
        });
      }
      setUser(null);
      setSession(null);
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  const updateProfile = async (updates: Partial<{
    full_name: string;
    avatar_url: string;
    bio: string;
    location: string;
    user_roles: UserRole[];
    academy_level: string;
    learning_goals: string[];
    preferred_learning_style: string;
    hourly_rate_min: number;
    hourly_rate_max: number;
    service_categories: string[];
    company_name: string;
    industry: string;
  }>) => {
    if (!user?.id) return { error: new Error('No user logged in') };

    try {
      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id)
        .select()
        .single();

      if (error) {
        toast({
          title: "Update Error",
          description: error.message,
          variant: "destructive",
        });
        return { error };
      }

      // Refresh user data
      await fetchUserProfile(user);
      
      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated.",
      });

      return { data, error: null };
    } catch (error) {
      console.error('Profile update error:', error);
      return { error: error as Error };
    }
  };

  return {
    user,
    session,
    loading,
    signUp,
    signIn,
    signInWithGoogle,
    signOut,
    updateProfile,
    isAuthenticated: !!session,
    isOnboardingComplete: user?.profile?.onboarding_completed || false,
  };
};
