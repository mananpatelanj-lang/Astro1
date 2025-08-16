
import { useAuth } from '../auth/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function PricingPage() {
  const { user, signIn, buyPack } = useAuth();
  const navigate = useNavigate();

  const handleTryFree = () => {
    if (!user) signIn();
    navigate('/dashboard');
  };

  const handleBuyPack = () => {
    if (!user) signIn();
    buyPack();
    navigate('/dashboard');
  };

  return (
    <div className="grid gap-6">
      <h1 className="text-2xl font-semibold">Pricing</h1>
      <div className="grid md:grid-cols-2 gap-4">
        {/* Free */}
        <div className="border rounded-xl p-4 bg-white hover:shadow-md transition-shadow">
          <h2 className="font-semibold text-lg mb-3">Free</h2>
          <ul className="list-disc ml-6 mt-2 text-sm space-y-1">
            <li>Sample dashboard (dummy data)</li>
            <li>First identity is locked</li>
            <li>Changing identity ends free access</li>
          </ul>
          <button 
            onClick={handleTryFree}
            className="mt-3 rounded-lg border px-4 py-2 hover:bg-gray-50 transition-colors font-medium"
          >
            Try Free
          </button>
        </div>

        {/* Pro */}
        <div className="border rounded-xl p-4 bg-white hover:shadow-md transition-shadow">
          <h2 className="font-semibold text-lg mb-3">Pro Pack</h2>
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-gray-400 line-through text-lg">₹250</span>
            <span className="text-2xl font-bold text-emerald-700">₹100</span>
            <span className="text-sm text-gray-500">(first 1000 users only)</span>
          </div>
          <p className="text-red-600 text-sm font-semibold mb-3">🚨 Hurry! Grab your remedies now</p>
          <ul className="list-disc ml-6 mt-2 text-sm space-y-1">
            <li>+3 trials (create/lock up to 3 profiles)</li>
            <li>+3 email sends (shared across profiles)</li>
            <li>30‑day access; renew anytime</li>
          </ul>
          <button 
            onClick={handleBuyPack}
            className="mt-3 rounded-lg bg-black text-white px-4 py-2 hover:bg-gray-800 transition-colors font-medium w-full"
          >
            Buy Now — ₹100
          </button>
        </div>
      </div>
    </div>
  );
}
