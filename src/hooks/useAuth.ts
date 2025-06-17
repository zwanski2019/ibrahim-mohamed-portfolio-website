
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User } from '@supabase/supabase-js';

interface AuthUser extends User {
  user_type?: 'employer' | 'worker';
  full_name?: string;
}

export const useAuth = () => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) {
          console.error('Error getting session:', error);
        } else if (session?.user) {
          // Get user profile data
          const { data: profile } = await supabase
            .from('profiles')
            .select('user_type, full_name')
            .eq('id', session.user.id)
            .single();
          
          setUser({
            ...session.user,
            user_type: profile?.user_type,
            full_name: profile?.full_name
          });
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
        if (session?.user) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('user_type, full_name')
            .eq('id', session.user.id)
            .single();
          
          setUser({
            ...session.user,
            user_type: profile?.user_type,
            full_name: profile?.full_name
          });
        } else {
          setUser(null);
        }
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return { user, loading, signOut };
};
