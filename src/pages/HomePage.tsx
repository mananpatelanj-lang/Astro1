
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <section className="grid gap-6">
      <h1 className="text-3xl font-bold">
        Understand your chart. Simple pricing. No confusion.
      </h1>
      <p className="text-lg text-gray-600">
        Watch the 60‑second demo, then try the dashboard. Home is the same for free & paid users.
      </p>
      <div className="flex gap-3">
        <Link 
          to="/dashboard" 
          className="rounded-lg bg-black text-white px-4 py-2 hover:bg-gray-800 transition-colors"
        >
          Try Free
        </Link>
        <Link 
          to="/pricing" 
          className="rounded-lg border border-gray-300 px-4 py-2 hover:bg-gray-50 transition-colors"
        >
          View Pricing
        </Link>
      </div>
      <div className="aspect-video bg-gray-200 grid place-items-center rounded-xl">
        <p className="text-gray-500">Your video placeholder</p>
      </div>
    </section>
  );
}
