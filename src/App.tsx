import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { ThemeProvider } from "@/components/theme-provider"
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import { AuthProvider } from './contexts/AuthContext';
import { CookieConsentProvider } from './contexts/CookieConsentContext';

import Index from "./pages/Index";
import About from "./pages/About";
import Auth from "./pages/Auth";
import Chat from "./pages/Chat";
import Community from "./pages/Community";
import Academy from "./pages/Academy";
import Jobs from "./pages/Jobs";
import PostJob from "./pages/PostJob";
import Freelancers from "./pages/Freelancers";
import Services from "./pages/Services";
import ComputerModel from "./pages/ComputerModel";
import IMEICheck from "./pages/IMEICheck";
import FAQ from "./pages/FAQ";
import Support from "./pages/Support";
import Infrastructure from "./pages/Infrastructure";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import Newsletter from "./pages/Newsletter";
import RSS from "./pages/RSS";
import NotFound from "./pages/NotFound";

import LanguageDetectionNotice from './components/LanguageDetectionNotice';
import CookieConsent from './components/CookieConsent';
import ScrollToTopButton from './components/ScrollToTopButton';

import Forum from "./pages/Forum";
import ForumCategory from "./pages/ForumCategory";
import ForumThread from "./pages/ForumThread";
import CreateForumThread from "./pages/CreateForumThread";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <ThemeProvider>
          <CookieConsentProvider>
            <AuthProvider>
              <BrowserRouter>
                <div className="App">
                  <LanguageDetectionNotice />
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/auth" element={<Auth />} />
                    <Route path="/chat" element={<Chat />} />
                    <Route path="/community" element={<Community />} />
                    <Route path="/academy" element={<Academy />} />
                    <Route path="/jobs" element={<Jobs />} />
                    <Route path="/post-job" element={<PostJob />} />
                    <Route path="/freelancers" element={<Freelancers />} />
                    <Route path="/services" element={<Services />} />
                    <Route path="/computer-model" element={<ComputerModel />} />
                    <Route path="/imei-check" element={<IMEICheck />} />
                    <Route path="/faq" element={<FAQ />} />
                    <Route path="/support" element={<Support />} />
                    <Route path="/infrastructure" element={<Infrastructure />} />
                    <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                    <Route path="/terms-of-service" element={<TermsOfService />} />
                    <Route path="/newsletter" element={<Newsletter />} />
                    <Route path="/rss" element={<RSS />} />
                    
                    {/* Forum Routes */}
                    <Route path="/forum" element={<Forum />} />
                    <Route path="/forum/category/:slug" element={<ForumCategory />} />
                    <Route path="/forum/thread/:slug" element={<ForumThread />} />
                    <Route path="/forum/new-thread" element={<CreateForumThread />} />
                    
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                  <Toaster />
                  <CookieConsent />
                  <ScrollToTopButton />
                </div>
              </BrowserRouter>
            </AuthProvider>
          </CookieConsentProvider>
        </ThemeProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
