
import React, { useState, useEffect } from 'react';
import { AppProvider } from './store/AppContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import FindEvents from './pages/FindEvents';
import CreateEvent from './pages/CreateEvent';
import EventDetails from './pages/EventDetails';
import Articles from './pages/Articles';
import HelpCenter from './pages/HelpCenter';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import AdminDashboard from './pages/AdminDashboard';

const App: React.FC = () => {
  const [currentHash, setCurrentHash] = useState(window.location.hash || '#/');

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash || '#/');
      window.scrollTo(0, 0);
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const renderPage = () => {
    const hash = currentHash.replace('#', '');
    
    if (hash === '/' || hash === '') return <Home />;
    if (hash === '/find-events') return <FindEvents />;
    if (hash === '/create-event') return <CreateEvent />;
    if (hash === '/articles') return <Articles />;
    if (hash === '/help') return <HelpCenter />;
    if (hash === '/login') return <Login />;
    if (hash === '/signup') return <SignUp />;
    if (hash === '/admin') return <AdminDashboard />;
    if (hash.startsWith('/event/')) return <EventDetails />;

    // Fallback simple routing for event details if not perfect match
    const eventMatch = hash.match(/\/event\/(.+)/);
    if (eventMatch) return <EventDetails />;

    return <Home />;
  };

  return (
    <AppProvider>
      <div className="min-h-screen flex flex-col selection:bg-emerald-200 selection:text-emerald-900">
        <Navbar />
        <main className="flex-1">
          {renderPage()}
        </main>
        <Footer />
      </div>
    </AppProvider>
  );
};

export default App;
