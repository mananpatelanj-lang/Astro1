
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import EmailMatrix from '@/components/EmailMatrix';

type Me = {
  email: string;
  state: 'FREE_ACTIVE' | 'FREE_REVOKED' | 'PRO_ACTIVE' | 'PRO_EXPIRED';
  proExpiresAt?: string;
  quotas: {
    trialTotal: number;
    trialUsed: number;
    emailTotal: number;
    emailUsed: number;
  };
  identities: {
    id: string;
    label: string;
    fullName: string;
    dob: string;
    tob: string;
    place?: string;
  }[];
};

export default function DashboardPage() {
  const [me, setMe] = useState<Me | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/me')
      .then(r => r.json())
      .then(setMe)
      .catch(e => setError(String(e)))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading…</p>;
  if (error) return <p className="text-red-600">{error}</p>;
  if (!me) return (
    <p>
      No session. <Link href="/api/auth/mock" className="text-blue-600 underline">Sign in</Link>
    </p>
  );

  const trialsLeft = me.quotas.trialTotal - me.quotas.trialUsed;
  const emailsLeft = me.quotas.emailTotal - me.quotas.emailUsed;

  return (
    <div className="grid gap-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <div className="text-sm text-gray-600 text-center md:text-right">
          <span className="inline-block bg-green-100 text-green-800 px-2 py-1 rounded-full font-medium">
            {me.state === 'PRO_ACTIVE' ? 'Pro Active' : 'Free Account'}
          </span>
          {me.proExpiresAt && (
            <span className="mt-1 md:mt-0 block">
              Expires: {new Date(me.proExpiresAt).toLocaleDateString()}
            </span>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="rounded-xl border p-4 bg-white hover:shadow-md transition-shadow">
          <div className="text-sm text-gray-600">Trials left</div>
          <div className="text-3xl font-bold mt-1">{trialsLeft}</div>
          <form action="/api/purchase/order" method="post">
            <button className="mt-3 w-full rounded-lg bg-black text-white px-4 py-2 hover:bg-gray-800 transition-colors">
              Buy Pack (₹100)
            </button>
          </form>
        </div>
        <div className="rounded-xl border p-4 bg-white hover:shadow-md transition-shadow">
          <div className="text-sm text-gray-600">Email sends left</div>
          <div className="text-3xl font-bold mt-1">{emailsLeft}</div>
          <form action="/api/purchase/order" method="post">
            <button className="mt-3 w-full rounded-lg bg-black text-white px-4 py-2 hover:bg-gray-800 transition-colors">
              Buy Pack (₹100)
            </button>
          </form>
        </div>
        <div className="rounded-xl border p-4 bg-white hover:shadow-md transition-shadow">
          <div className="text-sm text-gray-600">Profiles</div>
          <div className="text-3xl font-bold mt-1">{me.identities.length} / 3</div>
          <div className="mt-3 text-sm text-gray-600">
            {trialsLeft > 0 ? 'Create new profile' : 'Max profiles reached'}
          </div>
        </div>
      </div>

      <div className="rounded-xl border p-4 bg-white hover:shadow-md transition-shadow">
        <h2 className="font-semibold mb-3">Create/Lock Profile</h2>
        <form action="/api/identity/submit" method="post" className="grid md:grid-cols-5 gap-2">
          <input
            name="fullName"
            placeholder="Full name"
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
            required
          />
          <input
            name="dob"
            type="date"
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
            required
          />
          <input
            name="tob"
            type="time"
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
            required
          />
          <input
            name="place"
            placeholder="Place"
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
          />
          <button
            type="submit"
            className="rounded bg-black text-white px-3 py-2 hover:bg-gray-800 transition-colors font-medium"
          >
            Lock (uses 1 trial)
          </button>
        </form>
      </div>

      <div className="rounded-xl border p-4 bg-white overflow-x-auto hover:shadow-md transition-shadow">
        <h2 className="font-semibold mb-3">Profiles</h2>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left border-b">
              <th className="pb-2">Label</th>
              <th className="pb-2">Identity</th>
            </tr>
          </thead>
          <tbody>
            {me.identities.map(p => (
              <tr key={p.id} className="border-t">
                <td className="py-3 font-medium">{p.label}</td>
                <td className="py-3">
                  {p.fullName} • {p.dob} • {p.tob}{p.place ? ` • ${p.place}` : ''}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="rounded-xl border p-4 bg-white hover:shadow-md transition-shadow">
        <h2 className="font-semibold mb-2">3×3 Email Matrix</h2>
        <p className="text-xs text-gray-600 mb-3">
          Any three sends across any profiles fill these boxes. After all 3 are used, user must buy a new pack.
        </p>
        <EmailMatrix emailsUsed={me.quotas.emailUsed} />
      </div>
    </div>
  );
}
