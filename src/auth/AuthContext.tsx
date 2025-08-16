
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

type Plan = 'FREE' | 'PRO';

export type User = { 
  email: string; 
  plan: Plan; 
  proExpiresAt?: string;
  provider?: 'google' | 'password';
} | null;

type AuthCtx = {
  user: User;
  signOut: () => void;
  signInWithGoogle: () => void;
  signInWithEmail: (email: string, pw: string) => Promise<void>;
  signUpWithEmail: (email: string, pw: string) => Promise<void>;
  buyPack: () => void;
};

const Ctx = createContext<AuthCtx | undefined>(undefined);

// Mock user storage for demo (replace with real backend later)
const USERS_KEY = 'auth.users';

function getUsers(): Record<string, { pw: string }> {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || '{}');
  } catch {
    return {};
  }
}

function setUsers(obj: Record<string, { pw: string }>) {
  localStorage.setItem(USERS_KEY, JSON.stringify(obj));
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(null);

  // Load from localStorage
  useEffect(() => {
    const raw = localStorage.getItem('auth.user');
    if (raw) setUser(JSON.parse(raw));
  }, []);

  // Persist to localStorage
  useEffect(() => {
    if (user) localStorage.setItem('auth.user', JSON.stringify(user));
    else localStorage.removeItem('auth.user');
  }, [user]);

  // Mock Google sign-in
  const signInWithGoogle = () => {
    const i = Math.floor(Math.random() * 999);
    setUser({ 
      email: `user${i}@gmail.com`, 
      plan: 'FREE', 
      provider: 'google' 
    });
  };

  // Email login
  const signInWithEmail = async (email: string, pw: string) => {
    const db = getUsers();
    if (!db[email] || db[email].pw !== pw) {
      throw new Error('Invalid email or password');
    }
    setUser({ 
      email, 
      plan: 'FREE', 
      provider: 'password' 
    });
  };

  // Email signup
  const signUpWithEmail = async (email: string, pw: string) => {
    const db = getUsers();
    if (db[email]) {
      throw new Error('Account already exists');
    }
    db[email] = { pw };
    setUsers(db);
    setUser({ 
      email, 
      plan: 'FREE', 
      provider: 'password' 
    });
  };

  const signOut = () => setUser(null);

  const buyPack = () => {
    if (!user) return;
    const expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
    setUser({ ...user, plan: 'PRO', proExpiresAt: expires });
  };

  const value = useMemo(() => ({ 
    user, 
    signOut, 
    signInWithGoogle, 
    signInWithEmail, 
    signUpWithEmail, 
    buyPack 
  }), [user]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAuth() {
  const v = useContext(Ctx);
  if (!v) throw new Error('useAuth must be used within AuthProvider');
  return v;
}
