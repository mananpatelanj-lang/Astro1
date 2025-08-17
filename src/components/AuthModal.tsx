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
              className="rounded-lg bg-red-600 text-white px-4 py-3 hover:bg-red-700 transition-colors font-medium flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Sign in with Gmail
            </button>
            <div className="relative my-2">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-white px-2 text-gray-500">or</span>
              </div>
            </div>
            <button
              onClick={() => setTab('email')}
              className="rounded-lg border-2 border-gray-200 px-4 py-3 hover:bg-gray-50 transition-colors font-medium"
            >
              Sign in with Email
            </button>
            <button
              onClick={() => setTab('signup')}
              className="rounded-lg border-2 border-gray-200 px-4 py-3 hover:bg-gray-50 transition-colors font-medium"
            >
              Sign up with Email
            </button>
          </div>
        )}

        {tab !== 'root' && (
          <div className="grid gap-3 text-sm">
            {err && (
              <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg border border-red-200">
                {err}
              </div>
            )}
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
              placeholder={tab === 'signup' ? 'Password (min 6 characters)' : 'Password'}
              className="border-2 border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
            />
            <button
              onClick={tab === 'email' ? handleEmailLogin : handleEmailSignup}
              disabled={!email || !pw || (tab === 'signup' && pw.length < 6)}
              className="rounded-lg bg-black text-white px-4 py-3 hover:bg-gray-800 transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
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

        {tab === 'signup' && (
          <div className="mt-2 text-xs text-gray-600 bg-blue-50 p-3 rounded-lg">
            <p className="font-medium">✓ Check your email after signing up</p>
            <p>We'll send you a confirmation link to verify your account.</p>
          </div>
        )}
      </div>
    </div>
  );
}
