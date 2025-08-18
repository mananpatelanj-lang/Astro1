import React, { useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import EmailMatrix from '../components/EmailMatrix';
import BirthDetailsForm, { BirthDetails } from '../components/BirthDetailsForm';
import AstrologyResults from '../components/AstrologyResults';

export default function DashboardPage() {
  const { user, buyPack } = useAuth();
  const [birthDetails, setBirthDetails] = useState<BirthDetails | null>(null);
  const [showResults, setShowResults] = useState(false);

  if (!user) return null; // protected by ProtectedRoute

  const isPro = user.plan === 'PRO';

  const handleBirthDetailsSubmit = (details: BirthDetails) => {
    setBirthDetails(details);
    setShowResults(true);
  };

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

      {/* Birth Details Form - Shown to both FREE and PRO users */}
      {!showResults ? (
        <BirthDetailsForm
          onSubmit={handleBirthDetailsSubmit}
          isPro={isPro}
          showResults={false}
        />
      ) : (
        <>
          {/* Birth Details Summary */}
          {birthDetails && (
            <div className="rounded-xl border p-4 bg-white hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-3">
                <h2 className="font-semibold">Profile Details</h2>
                <button
                  onClick={() => setShowResults(false)}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  Edit Details
                </button>
              </div>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div><strong>Name:</strong> {birthDetails.name}</div>
                <div><strong>Birth Date:</strong> {birthDetails.birthMonth} {birthDetails.birthDate}, {birthDetails.birthYear}</div>
                <div><strong>Birth Time:</strong> {birthDetails.birthHour}:{birthDetails.birthMinute} {birthDetails.birthPeriod}</div>
                <div><strong>Birth Place:</strong> {birthDetails.birthPlace}</div>
              </div>
            </div>
          )}

          {/* Astrology Results */}
          {birthDetails && (
            <AstrologyResults
              birthDetails={birthDetails}
              isPro={isPro}
            />
          )}
        </>
      )}

      {/* Email Matrix for PRO or Mahadasha info for FREE */}
      {isPro ? (
        <div className="rounded-xl border p-4 bg-white hover:shadow-md transition-shadow">
          <h2 className="font-semibold mb-2">3×3 Email Matrix</h2>
          <p className="text-xs text-gray-600 mb-3">
            Any three sends across any profiles fill these boxes. After all 3 are used, user must buy a new pack.
          </p>
          <EmailMatrix emailsUsed={0} />
        </div>
      ) : (
        <div className="rounded-xl border p-4 bg-white hover:shadow-md transition-shadow">
          <h2 className="font-semibold mb-3">Current Planetary Period</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="rounded-lg border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-white p-4">
              <h3 className="font-medium mb-2 text-purple-800">Active Mahadasha</h3>
              <div className="text-lg font-semibold text-purple-700">Venus (Shukra)</div>
              <div className="text-sm text-gray-600 mt-1">Focus: Relationships, creativity, aesthetics</div>
            </div>
            <div className="rounded-lg border-2 border-pink-200 bg-gradient-to-br from-pink-50 to-white p-4">
              <h3 className="font-medium mb-2 text-pink-800">Active Antardasha</h3>
              <div className="text-lg font-semibold text-pink-700">Mercury (Budh)</div>
              <div className="text-sm text-gray-600 mt-1">Focus: Communication, learning, business</div>
            </div>
          </div>
          <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <div className="text-sm text-blue-800 font-medium">✉️ Free Version</div>
            <div className="text-sm text-blue-700 mt-1">
              You can send 1 email with personalized remedies for your current planetary period.
            </div>
          </div>
          <div className="mt-3">
            <button
              onClick={buyPack}
              className="w-full rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 hover:from-purple-700 hover:to-pink-700 transition-all font-medium"
            >
              Upgrade to Pro for 3 profiles + 3 emails ✨
            </button>
          </div>
        </div>
      )}
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
