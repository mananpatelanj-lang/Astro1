
import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b bg-white">
      <nav className="mx-auto max-w-5xl flex items-center justify-between p-4">
        <Link href="/" className="font-semibold text-xl">
          AstroApp
        </Link>
        <div className="space-x-4">
          <Link href="/pricing" className="hover:text-gray-700">
            Pricing
          </Link>
          <Link 
            href="/dashboard" 
            className="inline-block rounded-lg bg-black text-white px-3 py-1 hover:bg-gray-800 transition-colors"
          >
            Dashboard
          </Link>
        </div>
      </nav>
    </header>
  );
}
