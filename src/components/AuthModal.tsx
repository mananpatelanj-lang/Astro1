
import React, { useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import { useAuthModal } from '../hooks/useAuthModal';

export default function AuthModal() {
  const { open, setOpen } = useAuthModal();
  const { signInWithGoogle, signInWithEmail, signUpWithEmail } = useAuth();
  const [tab, setTab] = useState<'root' | 'email' | 'signup'>('root');
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [err, setErr] = useState('');

  if (!open) return null;

  const close = () => {
    setErr('');
    setTab('root');
    setEmail('');
    setPw('');
    setOpen(false);
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      close();
    } catch (e: any) {
      setErr(e.message || 'Google sign in failed');
    }
  };

  const handleEmailLogin = async () => {
    try {
      await signInWithEmail(email, pw);
      close();
    } catch (e: any) {
      setErr(e.message || 'Login failed');
    }
  };

  const handleEmailSignup = async () => {
    try {
      await signUpWithEmail(email, pw);
      close();
    } catch (e: any) {
      setErr(e.message || 'Sign up failed');
    }
  };

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4">
      <div className="w-full max-w-sm rounded-2xl bg-white shadow-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-lg">Welcome</h3>
          <button 
            onClick={close} 
            className="text-gray-500 hover:text-gray-700 text-xl"
          >
            ✕
          </button>
        </div>

        {tab === 'root' && (
          <div className="grid gap-3 text-sm">
            <button 
              onClick={handleGoogleSignIn}
              className="rounded-lg bg-black text-white px-4 py-3 hover:bg-gray-800 transition-colors font-medium"
            >
              Continue with Google
            </button>
            <button 
              onClick={() => setTab('email')}
              className="rounded-lg border-2 border-gray-200 px-4 py-3 hover:bg-gray-50 transition-colors font-medium"
            >
              Continue with Email
            </button>
            <button 
              onClick={() => setTab('signup')}
              className="rounded-lg border-2 border-gray-200 px-4 py-3 hover:bg-gray-50 transition-colors font-medium"
            >
              Sign up
            </button>
          </div>
        )}

        {tab !== 'root' && (
          <div className="grid gap-3 text-sm">
            <input 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              placeholder="Email" 
              type="email"
              className="border-2 border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
            />
            <input 
              value={pw} 
              onChange={e => setPw(e.target.value)} 
              type="password" 
              placeholder="Password" 
              className="border-2 border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
            />
            {err && (
              <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">
                {err}
              </div>
            )}
            <button 
              onClick={tab === 'email' ? handleEmailLogin : handleEmailSignup}
              className="rounded-lg bg-black text-white px-4 py-3 hover:bg-gray-800 transition-colors font-medium"
            >
              {tab === 'email' ? 'Login' : 'Create account'}
            </button>
            <button 
              onClick={() => setTab('root')}
              className="text-gray-500 hover:text-gray-700 text-sm"
            >
              ← Back
            </button>
          </div>
        )}

        <p className="mt-4 text-xs text-gray-500 text-center">
          By continuing you agree to our Terms & Privacy Policy.
        </p>
      </div>
    </div>
  );
}
