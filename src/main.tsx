
import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import './index.css';
import { AuthProvider } from './auth/AuthContext';
import { AuthModalProvider } from './hooks/useAuthModal';
import AuthModal from './components/AuthModal';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import PricingPage from './pages/PricingPage';
import DashboardPage from './pages/DashboardPage';
import ProtectedRoute from './router/ProtectedRoute';

function Layout() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Header />
      <main className="mx-auto max-w-5xl p-6">
        <Outlet />
      </main>
      <AuthModal />
      <footer className="mx-auto max-w-5xl p-6 text-xs text-gray-500 border-t mt-10">
        These are general remedies. Please consult professional/knowledgeable astrologers/numerologists on how to use these remedies, keeping in mind factors unique to your birth chart.
      </footer>
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'pricing', element: <PricingPage /> },
      { 
        path: 'dashboard', 
        element: (
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        ) 
      },
    ]
  }
]);

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <AuthModalProvider>
        <RouterProvider router={router} />
      </AuthModalProvider>
    </AuthProvider>
  </React.StrictMode>
);
