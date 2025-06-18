
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";

// Context Providers
import { ThemeProvider } from "@/context/ThemeContext";
import { LanguageProvider } from "@/context/LanguageContext";
import { CookiePreferencesProvider } from "@/context/CookiePreferencesContext";
import { AuthProvider } from "@/context/AuthContext";

// Components
import Index from "./pages/Index";
import Services from "./pages/Services";
import About from "./pages/About";
import ComputerModel from "./pages/ComputerModel";
import Chat from "./pages/Chat";
import Newsletter from "./pages/Newsletter";
import Academy from "./pages/Academy";
import Jobs from "./pages/Jobs";
import PostJob from "./pages/PostJob";
import Freelancers from "./pages/Freelancers";
import Auth from "./pages/Auth";
import Community from "./pages/Community";
import NotFound from "./pages/NotFound";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import Support from "./pages/Support";
import FAQ from "./pages/FAQ";
import Infrastructure from "./pages/Infrastructure";
import IMEICheck from "./pages/IMEICheck";
import RSS from "./pages/RSS";
import CookieConsent from "./components/CookieConsent";
import { LanguageDetectionNotice } from "./components/LanguageDetectionNotice";
import ScrollToTop from "./components/ScrollToTop";
import ScrollToTopButton from "./components/ScrollToTopButton";
import ChatWidget from "./components/ChatWidget";

// Styles
import "./App.css";
import "./styles/components.css";
import "./styles/utilities.css";
import "./styles/base.css";
import "./styles/animations.css";

const queryClient = new QueryClient();

function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <ThemeProvider>
            <LanguageProvider>
              <CookiePreferencesProvider>
                <AuthProvider>
                  <Toaster />
                  <BrowserRouter>
                    <ScrollToTop />
                    <Helmet>
                      <title>Zwanski Tech - Professional Web Development & IT Support Services</title>
                      <meta name="description" content="Zwanski Tech provides professional web development, IT support, and cybersecurity services in Tunis, Tunisia. Expert solutions for businesses and individuals." />
                    </Helmet>
                    <Routes>
                      <Route path="/" element={<Index />} />
                      <Route path="/services" element={<Services />} />
                      <Route path="/about" element={<About />} />
                      <Route path="/3d" element={<ComputerModel />} />
                      <Route path="/chat" element={<Chat />} />
                      <Route path="/newsletter" element={<Newsletter />} />
                      <Route path="/academy" element={<Academy />} />
                      <Route path="/jobs" element={<Jobs />} />
                      <Route path="/post-job" element={<PostJob />} />
                      <Route path="/freelancers" element={<Freelancers />} />
                      <Route path="/auth" element={<Auth />} />
                      <Route path="/community" element={<Community />} />
                      <Route path="/privacy" element={<PrivacyPolicy />} />
                      <Route path="/terms" element={<TermsOfService />} />
                      <Route path="/support" element={<Support />} />
                      <Route path="/faq" element={<FAQ />} />
                      <Route path="/infrastructure" element={<Infrastructure />} />
                      <Route path="/imei-check" element={<IMEICheck />} />
                      <Route path="/rss" element={<RSS />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                    <CookieConsent />
                    <LanguageDetectionNotice />
                    <ScrollToTopButton />
                    <ChatWidget />
                  </BrowserRouter>
                </AuthProvider>
              </CookiePreferencesProvider>
            </LanguageProvider>
          </ThemeProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
