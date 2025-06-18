import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import Projects from './pages/Projects';
import Services from './pages/Services';
import Courses from './pages/Courses';
import Marketplace from './pages/Marketplace';
import CookieConsent from './components/CookieConsent';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import ChatWidget from './components/ChatWidget';
import Auth from './pages/Auth';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import Pricing from './pages/Pricing';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import Support from './pages/Support';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';
import CourseDetails from './pages/CourseDetails';
import ProjectDetails from './pages/ProjectDetails';
import BlogPostDetails from './pages/BlogPostDetails';
import { AuthProvider } from '@/context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-background">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/services" element={<Services />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/marketplace" element={<Marketplace />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/support" element={<Support />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/course/:courseId" element={<CourseDetails />} />
              <Route path="/project/:projectId" element={<ProjectDetails />} />
              <Route path="/blog/:postId" element={<BlogPostDetails />} />
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
