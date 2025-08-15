
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import PricingPage from './pages/PricingPage';
import './App.css';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen bg-gray-50 text-gray-900">
          <Header />
          <main className="mx-auto max-w-5xl p-6">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/pricing" element={<PricingPage />} />
            </Routes>
          </main>
          <footer className="mx-auto max-w-5xl p-6 text-xs text-gray-500 border-t mt-10">
            These are general remedies. Please consult professional/knowledgeable astrologers/numerologists on how to use these remedies, keeping in mind factors unique to your birth chart.
          </footer>
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
