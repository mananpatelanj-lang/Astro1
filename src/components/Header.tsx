
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="border-b bg-white">
      <nav className="mx-auto max-w-5xl flex items-center justify-between p-4">
        <Link to="/" className="font-semibold text-xl">
          AstroApp
        </Link>
        <div className="space-x-4">
          <Link to="/pricing" className="hover:text-gray-700">
            Pricing
          </Link>
          <Link 
            to="/dashboard" 
            className="inline-block rounded-lg bg-black text-white px-3 py-1 hover:bg-gray-800 transition-colors"
          >
            Dashboard
          </Link>
        </div>
      </nav>
    </header>
  );
}
