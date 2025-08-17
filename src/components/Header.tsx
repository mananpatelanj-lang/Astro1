
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { useAuthModal } from '../hooks/useAuthModal';

function initials(email?: string) {
  if (!email) return 'U';
  const name = email.split('@')[0] || 'u';
  const parts = name.replace(/[^a-zA-Z0-9]+/g, ' ').trim().split(' ');
  const a = (parts[0]?.[0] || 'U').toUpperCase();
  const b = (parts[1]?.[0] || '').toUpperCase();
  return (a + b).slice(0, 2);
}

export default function Header() {
  const { user, signOut } = useAuth();
  const { setOpen } = useAuthModal();
  const [open, setDropdown] = useState(false);

  return (
    <header className="border-b bg-white">
      <nav className="mx-auto max-w-5xl flex items-center justify-between p-4">
        <Link to="/" className="font-semibold text-xl">
          AstroApp
        </Link>
        <div className="flex items-center gap-4">
          <Link to="/pricing" className="hover:text-gray-700">
            Pricing
          </Link>
          {!user ? (
            <button 
              onClick={() => setOpen(true)}
              className="inline-block rounded-lg bg-black text-white px-3 py-1 hover:bg-gray-800 transition-colors"
            >
              Sign in
            </button>
          ) : (
            <div className="relative">
              <button 
                onClick={() => setDropdown(v => !v)} 
                className="h-8 w-8 rounded-full bg-black text-white grid place-items-center text-xs hover:bg-gray-800 transition-colors"
              >
                {initials(user.email)}
              </button>
              {open && (
                <div className="absolute right-0 mt-2 w-40 rounded-lg border bg-white shadow-lg z-10">
                  <div className="px-3 py-2 text-xs text-gray-500 border-b">{user.email}</div>
                  <Link 
                    to="/dashboard" 
                    className="block px-3 py-2 text-sm hover:bg-gray-50"
                    onClick={() => setDropdown(false)}
                  >
                    Dashboard
                  </Link>
                  <button 
                    onClick={async () => { 
                      setDropdown(false); 
                      await signOut(); 
                    }} 
                    className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50"
                  >
                    Log out
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
