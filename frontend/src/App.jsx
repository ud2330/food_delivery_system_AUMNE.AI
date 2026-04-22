import React from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import ThemeToggle from './components/ThemeToggle';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';
import { RefreshCw } from 'lucide-react';

function AppContent() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50 dark:bg-slate-950">
        <RefreshCw className="animate-spin w-8 h-8 text-primary-400" />
      </div>
    );
  }

  return (
    <>
      <ThemeToggle />
      {user ? <Dashboard /> : <Auth isLogin={true} />}
    </>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
