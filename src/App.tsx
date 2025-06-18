import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Index from './pages/Index';
import About from './pages/About';
import Contact from './components/Contact';
import Academy from './pages/Academy';
import Jobs from './pages/Jobs';
import Services from './pages/Services';
import Freelancers from './pages/Freelancers';
import PostJob from './pages/PostJob';
import CookieConsent from './components/CookieConsent';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import ChatWidget from './components/ChatWidget';
import Auth from './pages/Auth';
import NotFound from './pages/NotFound';
import Support from './pages/Support';
import Community from './pages/Community';
import Profile from './pages/Profile';
import { AuthProvider } from '@/context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-background">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/academy" element={<Academy />} />
              <Route path="/jobs" element={<Jobs />} />
              <Route path="/services" element={<Services />} />
              <Route path="/freelancers" element={<Freelancers />} />
              <Route path="/post-job" element={<PostJob />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/support" element={<Support />} />
              <Route path="/community" element={<Community />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
          <CookieConsent />
          <ChatWidget />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
