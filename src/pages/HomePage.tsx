import { Link, Navigate } from "react-router-dom";
import { useAuthModal } from "../hooks/useAuthModal";
import { useAuth } from "../auth/AuthContext";
import { useEffect } from "react";

export default function HomePage() {
  const { setOpen } = useAuthModal();
  const { user, loading } = useAuth();

  // Auto-redirect authenticated users to dashboard
  if (loading) return <div>Loading...</div>;
  if (user) return <Navigate to="/dashboard" replace />;

  return (
    <section className="grid gap-12">
      {/* HERO */}
      <div className="relative overflow-hidden rounded-2xl border bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
        <div className="absolute inset-0 opacity-80" aria-hidden="true">
          <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full blur-3xl bg-gradient-to-br from-violet-400 via-purple-400 to-pink-400" />
          <div className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full blur-3xl bg-gradient-to-br from-orange-400 via-red-400 to-pink-400" />
        </div>
        <div className="relative grid gap-6 p-8 md:p-12">
          <p className="text-sm font-medium text-purple-700 bg-purple-100/70 rounded-full px-3 py-1 inline-block w-fit">Mahadasha & Antardasha aware</p>
          <h1 className="text-3xl md:text-5xl font-bold leading-tight bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent">
            Personalized remedies grounded in your{' '}
            <span className="underline decoration-pink-400 decoration-4">current planetary period</span>
          </h1>
          <p className="text-gray-700 max-w-3xl text-lg">
            Get simple, actionable guidance across four pillars — <b className="text-purple-700">Sound frequency</b>, <b className="text-pink-700">Food</b>, <b className="text-orange-700">Gemstone</b>, and <b className="text-red-700">Hand Mudra</b> — mapped to your active <i>Mahadasha</i> and <i>Antardasha</i>.
          </p>
          <div className="flex flex-wrap gap-3">
            <button 
              onClick={() => setOpen(true)}
              className="rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 text-sm md:text-base hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Try Free ✨
            </button>
            <Link 
              to="/pricing" 
              className="rounded-xl border-2 border-purple-300 bg-white/80 backdrop-blur px-6 py-3 text-sm md:text-base hover:bg-purple-50 hover:border-purple-400 transition-all duration-300 text-purple-700 font-medium"
            >
              View Pricing
            </Link>
          </div>
          {/* Demo video placeholder */}
          <div className="mt-4 md:mt-8 aspect-video rounded-xl bg-gradient-to-br from-purple-100 to-pink-100 grid place-items-center text-purple-600 text-sm border-2 border-purple-200 shadow-inner">
            🎬 60‑second demo video
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
            <Badge color="purple">🔊 Sound Frequency</Badge>
            <Badge color="pink">🥗 Food to Prefer</Badge>
            <Badge color="orange">💎 Gemstone</Badge>
            <Badge color="red">🤲 Hand Mudra</Badge>
          </div>
        </div>
      </div>

      {/* HOW IT WORKS */}
      <div className="grid gap-6">
        <h2 className="text-xl md:text-2xl font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">How it works</h2>
        <ol className="grid md:grid-cols-4 gap-4">
          <Step n={1} title="Enter birth details" color="purple">
            Name, date & time of birth. Details are locked to keep results consistent.
          </Step>
          <Step n={2} title="Mahadasha analysis" color="pink">
            We detect your current Mahadasha / Antardasha and map remedies accordingly.
          </Step>
          <Step n={3} title="Remedies across 4 pillars" color="orange">
            Get sound (mantra/Hz), food guidance, gemstone suggestions, and hand mudra.
          </Step>
          <Step n={4} title="Email & Upgrade (₹100)" color="red">
            Email remedies to yourself. Need to check loved ones? Buy the ₹100 pack (3 profiles + 3 emails).
          </Step>
        </ol>
      </div>

      {/* PILLARS GRID */}
      <div className="grid gap-6">
        <h2 className="text-xl md:text-2xl font-semibold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">The four remedy pillars</h2>
        <div className="grid md:grid-cols-4 gap-4">
          <Pillar icon="🔊" title="Sound frequency" color="purple">
            Suggested mantra or frequency (e.g., 136.1 Hz) tuned for your planetary period.
          </Pillar>
          <Pillar icon="🥗" title="Food" color="pink">
            Light, practical foods to favor and items to minimize during the current dasha.
          </Pillar>
          <Pillar icon="💎" title="Gemstone" color="orange">
            If applicable, stone type and wearing guidance with metal and preferred day.
          </Pillar>
          <Pillar icon="🤲" title="Hand Mudra" color="red">
            Simple mudra with duration and time‑of‑day to practice.
          </Pillar>
        </div>
      </div>

      {/* SAMPLE OUTPUT */}
      <div className="rounded-2xl border-2 border-purple-200 bg-gradient-to-br from-white to-purple-50 p-6 grid gap-4 shadow-lg">
        <h3 className="font-semibold text-purple-800">Sample output (for demo)</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="rounded-xl border-2 border-pink-200 bg-gradient-to-br from-pink-50 to-purple-50 p-4">
            <h4 className="font-medium mb-2 text-pink-800">Active Period</h4>
            <ul className="text-sm text-gray-700 list-disc ml-5 space-y-1">
              <li><b className="text-purple-700">Mahadasha:</b> Venus (Shukra)</li>
              <li><b className="text-pink-700">Antardasha:</b> Mercury (Budh)</li>
              <li><b className="text-orange-700">Focus:</b> relationships, aesthetics, communication</li>
            </ul>
          </div>
          <div className="rounded-xl border-2 border-orange-200 bg-gradient-to-br from-orange-50 to-red-50 p-4">
            <h4 className="font-medium mb-2 text-orange-800">Remedy Highlights</h4>
            <div className="flex flex-wrap gap-2 text-sm">
              <Chip color="purple">🔊 136.1 Hz (Om)</Chip>
              <Chip color="pink">🥗 Ghee, cucumber, tulsi tea</Chip>
              <Chip color="orange">💎 Diamond/White Sapphire (Friday)</Chip>
              <Chip color="red">🤲 Gyan Mudra • 15 mins</Chip>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          <button 
            onClick={() => setOpen(true)}
            className="rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white px-5 py-3 text-sm md:text-base hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Generate my remedies ✨
          </button>
          <Link 
            to="/pricing" 
            className="rounded-xl border-2 border-orange-300 bg-white/80 px-5 py-3 text-sm md:text-base hover:bg-orange-50 hover:border-orange-400 transition-all duration-300 text-orange-700 font-medium"
          >
            See ₹100 pack
          </Link>
        </div>
      </div>

      {/* FAQ / DISCLAIMER SHORT */}
      <div className="rounded-2xl border-2 border-gray-200 bg-gradient-to-br from-white to-gray-50 p-6 shadow-md">
        <h3 className="font-semibold mb-2 text-gray-800">Gentle reminder</h3>
        <p className="text-sm text-gray-600">
          These are general remedies. Please consult professional/knowledgeable astrologers/numerologists on how to use these remedies, keeping in mind factors unique to your birth chart.
        </p>
      </div>
    </section>
  );
}

function Badge({ children, color }: { children: React.ReactNode; color: string }) {
  const colorClasses = {
    purple: "bg-purple-100/90 text-purple-700 border-purple-200 shadow-purple-100",
    pink: "bg-pink-100/90 text-pink-700 border-pink-200 shadow-pink-100",
    orange: "bg-orange-100/90 text-orange-700 border-orange-200 shadow-orange-100",
    red: "bg-red-100/90 text-red-700 border-red-200 shadow-red-100"
  };
  
  return (
    <span className={`inline-flex items-center gap-2 rounded-full backdrop-blur px-3 py-2 text-xs border-2 shadow-lg hover:shadow-xl transition-all duration-300 font-medium ${colorClasses[color as keyof typeof colorClasses]}`}>
      {children}
    </span>
  );
}

function Chip({ children, color }: { children: React.ReactNode; color: string }) {
  const colorClasses = {
    purple: "bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100",
    pink: "bg-pink-50 text-pink-700 border-pink-200 hover:bg-pink-100",
    orange: "bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-100",
    red: "bg-red-50 text-red-700 border-red-200 hover:bg-red-100"
  };
  
  return (
    <span className={`inline-flex items-center rounded-full border-2 px-3 py-1 text-xs font-medium transition-all duration-300 hover:shadow-md cursor-pointer ${colorClasses[color as keyof typeof colorClasses]}`}>
      {children}
    </span>
  );
}

function Step({ n, title, children, color }: { n: number; title: string; children: React.ReactNode; color: string }) {
  const colorClasses = {
    purple: "bg-purple-600 shadow-purple-200",
    pink: "bg-pink-600 shadow-pink-200",
    orange: "bg-orange-600 shadow-orange-200",
    red: "bg-red-600 shadow-red-200"
  };
  
  return (
    <li className="rounded-xl border-2 border-gray-200 bg-white p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className="flex items-center gap-3 mb-3">
        <span className={`h-8 w-8 grid place-items-center rounded-full text-white text-sm font-bold shadow-lg ${colorClasses[color as keyof typeof colorClasses]}`}>
          {n}
        </span>
        <h3 className="font-semibold text-gray-800">{title}</h3>
      </div>
      <p className="text-sm text-gray-600 leading-relaxed">{children}</p>
    </li>
  );
}

function Pillar({ icon, title, children, color }: { icon: string; title: string; children: React.ReactNode; color: string }) {
  const colorClasses = {
    purple: "border-purple-200 bg-gradient-to-br from-purple-50 to-white hover:from-purple-100 hover:to-purple-50",
    pink: "border-pink-200 bg-gradient-to-br from-pink-50 to-white hover:from-pink-100 hover:to-pink-50",
    orange: "border-orange-200 bg-gradient-to-br from-orange-50 to-white hover:from-orange-100 hover:to-orange-50",
    red: "border-red-200 bg-gradient-to-br from-red-50 to-white hover:from-red-100 hover:to-red-50"
  };
  
  return (
    <div className={`rounded-xl border-2 p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${colorClasses[color as keyof typeof colorClasses]}`}>
      <div className="flex items-center gap-3 mb-3">
        <span className="text-2xl drop-shadow-sm">{icon}</span>
        <h3 className="font-semibold text-gray-800">{title}</h3>
      </div>
      <p className="text-sm text-gray-600 leading-relaxed">{children}</p>
    </div>
  );
}
