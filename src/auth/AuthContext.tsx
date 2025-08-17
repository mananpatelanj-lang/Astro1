import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User as SupabaseUser, Session } from '@supabase/supabase-js';

type Plan = 'FREE' | 'PRO';

export type User = {
  email: string;
  plan: Plan;
  proExpiresAt?: string;
  provider?: 'google' | 'password';
} | null;

type AuthCtx = {
  user: User;
  loading: boolean;
  signOut: () => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (email: string, pw: string) => Promise<void>;
  signUpWithEmail: (email: string, pw: string) => Promise<void>;
  buyPack: () => Promise<void>;
};

const Ctx = createContext<AuthCtx | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setLoading(true);
        
        if (session?.user) {
          // Defer profile fetch to avoid deadlock
          setTimeout(async () => {
            const { data: profile } = await supabase
              .from('profiles')
              .select('*')
              .eq('user_id', session.user.id)
              .single();
            
            if (profile) {
              setUser({
                email: profile.email || session.user.email || '',
                plan: profile.plan as Plan,
                proExpiresAt: profile.pro_expires_at,
                provider: profile.provider as 'google' | 'password'
              });
            }
            setLoading(false);
          }, 0);
        } else {
          setUser(null);
          setLoading(false);
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session?.user) {
        // Defer profile fetch
        setTimeout(async () => {
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('user_id', session.user.id)
            .single();
          
          if (profile) {
            setUser({
              email: profile.email || session.user.email || '',
              plan: profile.plan as Plan,
              proExpiresAt: profile.pro_expires_at,
              provider: profile.provider as 'google' | 'password'
            });
          }
          setLoading(false);
        }, 0);
      } else {
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
          skipBrowserRedirect: true
        }
      });

      if (error) {
        console.error('Google sign-in error:', error);
        throw new Error(error.message || 'Google sign-in failed. Please check your OAuth configuration.');
      }
    } catch (err: any) {
      console.error('OAuth error:', err);
      throw new Error(err.message || 'Authentication failed');
    }
  };

  const signInWithEmail = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    if (error) {
      console.error('Email sign-in error:', error);
      if (error.message === 'Email not confirmed') {
        throw new Error('Please check your email and click the confirmation link before signing in.');
      }
      throw new Error(error.message || 'Email sign-in failed. Please check your credentials.');
    }
  };

  const signUpWithEmail = async (email: string, password: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/`
      }
    });
    if (error) {
      console.error('Email sign-up error:', error);
      if (error.message.includes('you can only request this after')) {
        throw new Error('Too many sign-up attempts. Please wait a minute before trying again.');
      }
      throw new Error(error.message || 'Email sign-up failed. Please check your email format and password strength.');
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const buyPack = async () => {
    if (!user || !session?.user) return;
    const expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
    
    const { error } = await supabase
      .from('profiles')
      .update({ 
        plan: 'PRO', 
        pro_expires_at: expires 
      })
      .eq('user_id', session.user.id);
    
    if (!error) {
      setUser({ ...user, plan: 'PRO', proExpiresAt: expires });
    }
  };

  const value = useMemo(() => ({
    user,
    loading,
    signOut,
    signInWithGoogle,
    signInWithEmail,
    signUpWithEmail,
    buyPack
  }), [user, loading]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAuth() {
  const v = useContext(Ctx);
  if (!v) throw new Error('useAuth must be used within AuthProvider');
  return v;
}
