import React from 'react';
import { useAuth } from '../auth/AuthContext';
import EmailMatrix from '../components/EmailMatrix';

export default function DashboardPage() {
  const { user, buyPack } = useAuth();
  
  if (!user) return null; // protected by ProtectedRoute

  const isPro = user.plan === 'PRO';

  return (
    <div className="grid gap-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <div className="text-sm text-gray-600 text-center md:text-right">
          {isPro ? (
            <>
              <span className="inline-block bg-green-100 text-green-800 px-2 py-1 rounded-full font-medium">
                Pro Active
              </span>
              {user.proExpiresAt && (
                <span className="mt-1 md:mt-0 block">
                  Expires: {new Date(user.proExpiresAt).toLocaleDateString()}
                </span>
              )}
            </>
          ) : (
            <span className="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded-full font-medium">
              Free Account
            </span>
          )}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-3 gap-4">
        <Stat
          title="Trials left"
          value={isPro ? '3' : '—'}
          cta={!isPro ? 'Upgrade to Pro' : undefined}
          onCtaClick={!isPro ? buyPack : undefined}
        />
        <Stat
          title="Email sends left"
          value={isPro ? '3' : '1'}
          cta={!isPro ? 'Upgrade to Pro' : undefined}
          onCtaClick={!isPro ? buyPack : undefined}
        />
        <Stat
          title="Profiles"
          value={isPro ? '0 / 3' : '1 (locked)'}
        />
      </div>

      {/* Profile Creation or Demo Message */}
      {isPro ? (
        <div className="rounded-xl border p-4 bg-white hover:shadow-md transition-shadow">
          <h2 className="font-semibold mb-3">Create/Lock Profile</h2>
          <div className="grid md:grid-cols-5 gap-2">
            <input
              placeholder="Full name"
              className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
            />
            <input
              type="date"
              placeholder="Date of birth"
              className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
            />
            <input
              type="time"
              placeholder="Time of birth"
              className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
            />
            <input
              placeholder="Place"
              className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
            />
            <button className="rounded bg-black text-white px-3 py-2 hover:bg-gray-800 transition-colors font-medium">
              Lock (uses 1 trial)
            </button>
          </div>
        </div>
      ) : (
        <div className="rounded-xl border p-4 bg-white hover:shadow-md transition-shadow">
          <div className="text-sm text-gray-600 mb-3">
            <strong>Demo Mode:</strong> This is a sample dashboard with dummy data. 
            Changing your identity ends free access. 
          </div>
          <button 
            onClick={buyPack}
            className="rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 hover:from-purple-700 hover:to-pink-700 transition-all font-medium"
          >
            Upgrade to Pro for full remedies ✨
          </button>
        </div>
      )}

      {/* Sample Profile Table (for demo) */}
      {!isPro && (
        <div className="rounded-xl border p-4 bg-white overflow-x-auto hover:shadow-md transition-shadow">
          <h2 className="font-semibold mb-3">Sample Profile (Demo)</h2>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b">
                <th className="pb-2">Label</th>
                <th className="pb-2">Identity</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="py-3 font-medium">Demo Profile</td>
                <td className="py-3">John Doe • 1990-01-01 • 08:00 • New York</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {/* Email Matrix */}
      <div className="rounded-xl border p-4 bg-white hover:shadow-md transition-shadow">
        <h2 className="font-semibold mb-2">3×3 Email Matrix</h2>
        <p className="text-xs text-gray-600 mb-3">
          Any three sends across any profiles fill these boxes. After all 3 are used, user must buy a new pack.
        </p>
        <EmailMatrix emailsUsed={isPro ? 0 : 0} />
      </div>
    </div>
  );
}

function Stat({ 
  title, 
  value, 
  cta, 
  onCtaClick 
}: { 
  title: string; 
  value: string; 
  cta?: string;
  onCtaClick?: () => void;
}) {
  return (
    <div className="rounded-xl border p-4 bg-white hover:shadow-md transition-shadow">
      <div className="text-sm text-gray-600">{title}</div>
      <div className="text-3xl font-bold mt-1">{value}</div>
      {cta && onCtaClick && (
        <button
          onClick={onCtaClick}
          className="mt-3 w-full rounded-lg bg-black text-white px-4 py-2 hover:bg-gray-800 transition-colors text-sm"
        >
          {cta}
        </button>
      )}
    </div>
  );
}
