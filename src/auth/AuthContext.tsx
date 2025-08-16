
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

type Plan = 'FREE' | 'PRO';

type User = { 
  email: string; 
  plan: Plan; 
  proExpiresAt?: string 
} | null;

type AuthCtx = {
  user: User;
  signIn: (email?: string) => void;
  signOut: () => void;
  buyPack: () => void; // sets PRO (dev stub)
};

const Ctx = createContext<AuthCtx | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(null);

  // load from localStorage
  useEffect(() => {
    const raw = localStorage.getItem('auth.user');
    if (raw) setUser(JSON.parse(raw));
  }, []);

  // persist
  useEffect(() => {
    if (user) localStorage.setItem('auth.user', JSON.stringify(user));
    else localStorage.removeItem('auth.user');
  }, [user]);

  const signIn = (email?: string) => {
    const em = email || `user${Math.floor(Math.random() * 999)}@demo.local`;
    setUser({ email: em, plan: 'FREE' });
  };

  const signOut = () => setUser(null);

  const buyPack = () => {
    if (!user) return; // require sign-in first
    const expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
    setUser({ ...user, plan: 'PRO', proExpiresAt: expires });
  };

  const value = useMemo(() => ({ user, signIn, signOut, buyPack }), [user]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAuth() {
  const v = useContext(Ctx);
  if (!v) throw new Error('useAuth must be used within AuthProvider');
  return v;
}
