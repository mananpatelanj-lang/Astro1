
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <section className="grid gap-12">
      {/* HERO */}
      <div className="relative overflow-hidden rounded-2xl border bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
        <div className="absolute inset-0 opacity-80" aria-hidden>
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
            <Link 
              to="/dashboard" 
              className="rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 text-sm md:text-base hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Try Free ✨
            </Link>
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
          <Link 
            to="/dashboard" 
            className="rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white px-5 py-3 text-sm md:text-base hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Generate my remedies ✨
          </Link>
          <Link 
            to="/pricing" 
            className="rounded-xl border-2 border-orange-300 bg-white/80 px-5 py-3 text-sm md:text-base hover:bg-orange-50 hover:border-orange-400 transition-all duration-300 text-orange-700 font-medium"
          >
