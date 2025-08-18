import React from 'react';
import { BirthDetails } from './BirthDetailsForm';

interface AstrologyResultsProps {
  birthDetails: BirthDetails;
  isPro: boolean;
}

export default function AstrologyResults({ birthDetails, isPro }: AstrologyResultsProps) {
  return (
    <div className="space-y-6">
      {/* Mahadasha and Antardasha - Shown to both FREE and PRO */}
      <div className="rounded-xl border p-4 bg-white hover:shadow-md transition-shadow">
        <h2 className="font-semibold mb-3">Current Planetary Period</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="rounded-lg border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-white p-4">
            <h3 className="font-medium mb-2 text-purple-800">Active Mahadasha</h3>
            <div className="text-lg font-semibold text-purple-700">Venus (Shukra)</div>
            <div className="text-sm text-gray-600 mt-1">
              <strong>Period:</strong> 2020 - 2040 (20 years)
            </div>
            <div className="text-sm text-gray-600 mt-1">
              <strong>Focus:</strong> Relationships, creativity, aesthetics, luxury
            </div>
          </div>
          <div className="rounded-lg border-2 border-pink-200 bg-gradient-to-br from-pink-50 to-white p-4">
            <h3 className="font-medium mb-2 text-pink-800">Active Antardasha</h3>
            <div className="text-lg font-semibold text-pink-700">Mercury (Budh)</div>
            <div className="text-sm text-gray-600 mt-1">
              <strong>Period:</strong> Jan 2025 - May 2027 (2.3 years)
            </div>
            <div className="text-sm text-gray-600 mt-1">
              <strong>Focus:</strong> Communication, learning, business, intellect
            </div>
          </div>
        </div>
        
        {!isPro && (
          <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <div className="text-sm text-blue-800 font-medium">✉️ Free Analysis Complete</div>
            <div className="text-sm text-blue-700 mt-1">
              You can send this basic analysis to your email. For detailed remedies (sound, food, gemstone, hand mudra), upgrade to Pro.
            </div>
          </div>
        )}
      </div>

      {/* Detailed Remedies - Only shown to PRO users */}
      {isPro && (
        <>
          {/* Four Remedy Pillars */}
          <div className="rounded-xl border p-4 bg-white hover:shadow-md transition-shadow">
            <h2 className="font-semibold mb-3">Personalized Remedies</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Sound Frequency */}
              <div className="rounded-lg border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-white p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">🔊</span>
                  <h3 className="font-medium text-purple-800">Sound Frequency</h3>
                </div>
                <div className="text-sm space-y-1">
                  <div><strong>Mantra:</strong> Om Shukraya Namaha</div>
                  <div><strong>Frequency:</strong> 136.1 Hz</div>
                  <div><strong>Duration:</strong> 21 minutes daily</div>
                  <div><strong>Best Time:</strong> Friday morning</div>
                </div>
              </div>

              {/* Food Guidance */}
              <div className="rounded-lg border-2 border-pink-200 bg-gradient-to-br from-pink-50 to-white p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">🥗</span>
                  <h3 className="font-medium text-pink-800">Food Guidance</h3>
                </div>
                <div className="text-sm space-y-1">
                  <div><strong>Favor:</strong> Ghee, cucumber, coconut water</div>
                  <div><strong>Include:</strong> White rice, milk, sugar</div>
                  <div><strong>Minimize:</strong> Spicy foods, alcohol</div>
                  <div><strong>Special:</strong> Tulsi tea daily</div>
                </div>
              </div>

              {/* Gemstone */}
              <div className="rounded-lg border-2 border-orange-200 bg-gradient-to-br from-orange-50 to-white p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">💎</span>
                  <h3 className="font-medium text-orange-800">Gemstone</h3>
                </div>
                <div className="text-sm space-y-1">
                  <div><strong>Stone:</strong> Diamond / White Sapphire</div>
                  <div><strong>Metal:</strong> Silver or Platinum</div>
                  <div><strong>Finger:</strong> Ring finger (right hand)</div>
                  <div><strong>Day to wear:</strong> Friday</div>
                </div>
              </div>

              {/* Hand Mudra */}
              <div className="rounded-lg border-2 border-red-200 bg-gradient-to-br from-red-50 to-white p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">🤲</span>
                  <h3 className="font-medium text-red-800">Hand Mudra</h3>
                </div>
                <div className="text-sm space-y-1">
                  <div><strong>Mudra:</strong> Gyan Mudra</div>
                  <div><strong>Method:</strong> Touch thumb to index finger</div>
                  <div><strong>Duration:</strong> 15 minutes</div>
                  <div><strong>Best Time:</strong> During meditation</div>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Pro Information */}
          <div className="rounded-xl border p-4 bg-white hover:shadow-md transition-shadow">
            <h3 className="font-semibold mb-3 text-green-800">Pro Benefits Unlocked ✨</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-medium text-gray-800 mb-2">Current Analysis Includes:</h4>
                <ul className="space-y-1 text-gray-600">
                  <li>✓ Detailed Mahadasha/Antardasha periods</li>
                  <li>✓ Personalized sound frequencies & mantras</li>
                  <li>✓ Customized food recommendations</li>
                  <li>✓ Gemstone guidance with wearing instructions</li>
                  <li>✓ Hand mudra techniques</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-gray-800 mb-2">Profile Status:</h4>
                <ul className="space-y-1 text-gray-600">
                  <li>✓ Profile locked and saved</li>
                  <li>✓ Email remedies available</li>
                  <li>✓ Can create 2 more profiles</li>
                  <li>✓ Access to detailed planetary analysis</li>
                </ul>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Email Action */}
      <div className="rounded-xl border p-4 bg-white hover:shadow-md transition-shadow">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h3 className="font-semibold">
              {isPro ? 'Send Complete Remedies' : 'Send Basic Analysis'}
            </h3>
            <p className="text-sm text-gray-600">
              {isPro 
                ? 'Email the complete remedies including all four pillars to yourself or loved ones.'
                : 'Email your Mahadasha and Antardasha analysis. Upgrade for complete remedies.'
              }
            </p>
          </div>
          <div className="flex gap-2">
            <button className={`px-6 py-2 rounded-lg font-medium transition-all ${
              isPro 
                ? 'bg-green-600 text-white hover:bg-green-700' 
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}>
              {isPro ? 'Email Complete Report' : 'Email Basic Analysis'}
            </button>
            {!isPro && (
              <button className="px-6 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 transition-all font-medium">
                Upgrade to Pro
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
