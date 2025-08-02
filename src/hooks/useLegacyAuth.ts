
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User } from '@supabase/supabase-js';
import { trackEvent } from '@/utils/analytics';

interface ChatUser {
  id: string;
  username: string;
  avatar: string;
}

interface AuthUser extends User {
  user_type?: 'employer' | 'worker' | 'admin';
  full_name?: string;
  username?: string;
  avatar?: string;
}

export const useAuth = () => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [chatUser, setChatUser] = useState<ChatUser | null>(null);

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
          
          const enhancedUser = {
            ...session.user,
            user_type: profile?.user_type,
            full_name: profile?.full_name,
            username: profile?.full_name || session.user.email?.split('@')[0] || 'User',
            avatar: ''
          };

          setUser(enhancedUser);

          trackEvent('profile_fetch', { user_id: session.user.id, email: session.user.email });

          // Set chat user for compatibility
          setChatUser({
            id: session.user.id,
            username: profile?.full_name || session.user.email?.split('@')[0] || 'User',
            avatar: ''
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
          
          const enhancedUser = {
            ...session.user,
            user_type: profile?.user_type,
            full_name: profile?.full_name,
            username: profile?.full_name || session.user.email?.split('@')[0] || 'User',
            avatar: ''
          };

          setUser(enhancedUser);

          trackEvent('profile_fetch', { user_id: session.user.id, email: session.user.email });

          // Set chat user for compatibility
          setChatUser({
            id: session.user.id,
            username: profile?.full_name || session.user.email?.split('@')[0] || 'User',
            avatar: ''
          });
        } else {
          setUser(null);
          setChatUser(null);
        }
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setChatUser(null);
  };

  // Legacy methods for chat compatibility
  const login = (username: string) => {
    if (user) {
      setChatUser({
        id: user.id,
        username: username,
        avatar: ''
      });
    }
  };

  const logout = () => {
    setChatUser(null);
  };

  return { 
    user: chatUser || user, 
    loading, 
    signOut,
    // Legacy compatibility
    login,
    logout,
    isAuthenticated: !!user
  };
};
