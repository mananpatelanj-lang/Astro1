
import { useState } from 'react';

export default function PricingPage() {
  const [loading, setLoading] = useState(false);

  const handlePurchase = async () => {
    setLoading(true);
    // Simulate purchase - in a real app this would connect to a payment processor
    setTimeout(() => {
      setLoading(false);
      alert('Purchase completed! Redirecting to dashboard.');
      window.location.href = '/dashboard';
    }, 1000);
  };

  return (
    <div className="grid gap-6">
      <h1 className="text-2xl font-semibold">Pricing</h1>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="border rounded-xl p-4 bg-white hover:shadow-md transition-shadow">
          <h2 className="font-semibold text-lg mb-3">Free</h2>
          <ul className="list-disc ml-6 mt-2 text-sm space-y-1">
            <li>Sample dashboard (dummy data)</li>
            <li>First identity is locked</li>
            <li>Changing identity ends free access</li>
          </ul>
        </div>
        <div className="border rounded-xl p-4 bg-white hover:shadow-md transition-shadow">
          <h2 className="font-semibold text-lg mb-3">Pro Pack — ₹100</h2>
          <ul className="list-disc ml-6 mt-2 text-sm space-y-1">
            <li>+3 trials (create/lock up to 3 profiles)</li>
            <li>+3 email sends (shared across profiles)</li>
            <li>30‑day access; renew anytime</li>
          </ul>
          <button 
            onClick={handlePurchase}
            disabled={loading}
            className="mt-3 rounded-lg bg-black text-white px-4 py-2 hover:bg-gray-800 transition-colors disabled:opacity-50"
          >
            {loading ? 'Processing...' : 'Buy Pack'}
          </button>
        </div>
      </div>
    </div>
  );
}
