
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <section className="grid gap-12">
      {/* HERO */}
      <div className="relative overflow-hidden rounded-2xl border bg-white">
        <div className="absolute inset-0 opacity-70" aria-hidden>
          <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full blur-3xl bg-gradient-to-br from-indigo-300 via-fuchsia-300 to-emerald-200" />
          <div className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full blur-3xl bg-gradient-to-br from-emerald-200 via-sky-200 to-indigo-300" />
        </div>
        <div className="relative grid gap-6 p-8 md:p-12">
          <p className="text-sm font-medium text-emerald-700">Mahadasha & Antardasha aware</p>
          <h1 className="text-3xl md:text-5xl font-bold leading-tight">
            Personalized remedies grounded in your{' '}
            <span className="underline decoration-emerald-300">current planetary period</span>
          </h1>
          <p className="text-gray-600 max-w-3xl">
            Get simple, actionable guidance across four pillars — <b>Sound frequency</b>, <b>Food</b>, <b>Gemstone</b>, and <b>Hand Mudra</b> — mapped to your active <i>Mahadasha</i> and <i>Antardasha</i>.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link 
              to="/dashboard" 
              className="rounded-xl bg-black text-white px-5 py-3 text-sm md:text-base hover:bg-gray-800 transition-colors"
            >
              Try Free
            </Link>
            <Link 
              to="/pricing" 
              className="rounded-xl border px-5 py-3 text-sm md:text-base hover:bg-gray-50 transition-colors"
            >
              View Pricing
            </Link>
          </div>
          {/* Demo video placeholder */}
          <div className="mt-4 md:mt-8 aspect-video rounded-xl bg-gray-100 grid place-items-center text-gray-500 text-sm">
            60‑second demo video
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
            <Badge>🔊 Sound Frequency</Badge>
            <Badge>🥗 Food to Prefer</Badge>
            <Badge>💎 Gemstone</Badge>
            <Badge>🤲 Hand Mudra</Badge>
          </div>
        </div>
      </div>

      {/* HOW IT WORKS */}
      <div className="grid gap-6">
        <h2 className="text-xl md:text-2xl font-semibold">How it works</h2>
        <ol className="grid md:grid-cols-4 gap-4">
          <Step n={1} title="Enter birth details">
            Name, date & time of birth. Details are locked to keep results consistent.
          </Step>
          <Step n={2} title="Mahadasha analysis">
            We detect your current Mahadasha / Antardasha and map remedies accordingly.
          </Step>
          <Step n={3} title="Remedies across 4 pillars">
            Get sound (mantra/Hz), food guidance, gemstone suggestions, and hand mudra.
          </Step>
          <Step n={4} title="Email & Upgrade (₹100)">
            Email remedies to yourself. Need to check loved ones? Buy the ₹100 pack (3 profiles + 3 emails).
          </Step>
        </ol>
      </div>

      {/* PILLARS GRID */}
      <div className="grid gap-6">
        <h2 className="text-xl md:text-2xl font-semibold">The four remedy pillars</h2>
        <div className="grid md:grid-cols-4 gap-4">
          <Pillar icon="🔊" title="Sound frequency">
            Suggested mantra or frequency (e.g., 136.1 Hz) tuned for your planetary period.
          </Pillar>
          <Pillar icon="🥗" title="Food">
            Light, practical foods to favor and items to minimize during the current dasha.
          </Pillar>
          <Pillar icon="💎" title="Gemstone">
            If applicable, stone type and wearing guidance with metal and preferred day.
          </Pillar>
          <Pillar icon="🤲" title="Hand Mudra">
            Simple mudra with duration and time‑of‑day to practice.
          </Pillar>
        </div>
      </div>

      {/* SAMPLE OUTPUT */}
      <div className="rounded-2xl border bg-white p-6 grid gap-4">
        <h3 className="font-semibold">Sample output (for demo)</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="rounded-xl border p-4">
            <h4 className="font-medium mb-2">Active Period</h4>
            <ul className="text-sm text-gray-700 list-disc ml-5">
              <li><b>Mahadasha:</b> Venus (Shukra)</li>
              <li><b>Antardasha:</b> Mercury (Budh)</li>
              <li><b>Focus:</b> relationships, aesthetics, communication</li>
            </ul>
          </div>
          <div className="rounded-xl border p-4">
            <h4 className="font-medium mb-2">Remedy Highlights</h4>
            <div className="flex flex-wrap gap-2 text-sm">
              <Chip>🔊 136.1 Hz (Om)</Chip>
              <Chip>🥗 Ghee, cucumber, tulsi tea</Chip>
              <Chip>💎 Diamond/White Sapphire (Friday)</Chip>
              <Chip>🤲 Gyan Mudra • 15 mins</Chip>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link 
            to="/dashboard" 
            className="rounded-xl bg-black text-white px-5 py-3 text-sm md:text-base hover:bg-gray-800 transition-colors"
          >
            Generate my remedies
          </Link>
          <Link 
            to="/pricing" 
            className="rounded-xl border px-5 py-3 text-sm md:text-base hover:bg-gray-50 transition-colors"
          >
            See ₹100 pack
          </Link>
        </div>
      </div>

      {/* FAQ / DISCLAIMER SHORT */}
      <div className="rounded-2xl border bg-white p-6">
        <h3 className="font-semibold mb-2">Gentle reminder</h3>
        <p className="text-sm text-gray-600">
          These are general remedies. Please consult professional/knowledgeable astrologers/numerologists on how to use these remedies, keeping in mind factors unique to your birth chart.
        </p>
      </div>
    </section>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-white/70 backdrop-blur px-3 py-1 text-xs border">
      {children}
    </span>
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 px-2.5 py-1 text-xs">
      {children}
    </span>
  );
}

function Step({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <li className="rounded-xl border bg-white p-4">
      <div className="flex items-center gap-2 mb-1">
        <span className="h-6 w-6 grid place-items-center rounded-full bg-black text-white text-xs">{n}</span>
        <h3 className="font-medium">{title}</h3>
      </div>
      <p className="text-sm text-gray-600">{children}</p>
    </li>
  );
}

function Pillar({ icon, title, children }: { icon: string; title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border bg-white p-5">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-lg">{icon}</span>
        <h3 className="font-medium">{title}</h3>
      </div>
      <p className="text-sm text-gray-600">{children}</p>
    </div>
  );
}
