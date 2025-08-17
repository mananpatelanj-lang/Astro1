import React, { useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import { useAuthModal } from '../hooks/useAuthModal';

export default function AuthModal() {
  const { open, setOpen } = useAuthModal();
  const { signInWithGoogle, signInWithGitHub, signInWithDiscord, signInWithEmail, signUpWithEmail } = useAuth();
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

  const handleGitHubSignIn = async () => {
    try {
      await signInWithGitHub();
      close();
    } catch (e: any) {
      setErr(e.message || 'GitHub sign in failed');
    }
  };

  const handleDiscordSignIn = async () => {
    try {
      await signInWithDiscord();
      close();
    } catch (e: any) {
      setErr(e.message || 'Discord sign in failed');
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
              Continue with Google
            </button>
            <button
              onClick={handleGitHubSignIn}
              className="rounded-lg bg-gray-900 text-white px-4 py-3 hover:bg-gray-800 transition-colors font-medium flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              Continue with GitHub
            </button>
            <button
              onClick={handleDiscordSignIn}
              className="rounded-lg bg-indigo-600 text-white px-4 py-3 hover:bg-indigo-700 transition-colors font-medium flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.0190 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9460 2.4189-2.1568 2.4189Z"/>
              </svg>
              Continue with Discord
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
