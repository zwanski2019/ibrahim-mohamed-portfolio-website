import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { LanguageProvider } from "@/context/LanguageContext";
import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { LanguageDetectionNotice } from "@/components/LanguageDetectionNotice";
import ScrollToTop from "@/components/ScrollToTop";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import Index from "./pages/Index";
import Services from "./pages/Services";
import Jobs from "./pages/Jobs";
import PostJob from "./pages/PostJob";
import Freelancers from "./pages/Freelancers";
import Academy from "./pages/Academy";
import Chat from "./pages/Chat";
import Newsletter from "./pages/Newsletter";
import IMEICheck from "./pages/IMEICheck";
import ComputerModel from "./pages/ComputerModel";
import RSS from "./pages/RSS";
import NotFound from "./pages/NotFound";
import CookieConsent from "./components/CookieConsent";
import Support from "./pages/Support";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import FAQ from "./pages/FAQ";
import About from "./pages/About";
import Infrastructure from "./pages/Infrastructure";

const queryClient = new QueryClient();

function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <LanguageProvider>
            <ThemeProvider>
              <TooltipProvider>
                <Toaster />
                <Sonner />
                <BrowserRouter>
                  <ScrollToTop />
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/services" element={<Services />} />
                    <Route path="/jobs" element={<Jobs />} />
                    <Route path="/post-job" element={<PostJob />} />
                    <Route path="/freelancers" element={<Freelancers />} />
                    <Route path="/academy" element={<Academy />} />
                    <Route path="/chat" element={<Chat />} />
                    <Route path="/newsletter" element={<Newsletter />} />
                    <Route path="/imei-check" element={<IMEICheck />} />
                    <Route path="/computer-model" element={<ComputerModel />} />
                    <Route path="/infrastructure" element={<Infrastructure />} />
                    <Route path="/support" element={<Support />} />
                    <Route path="/faq" element={<FAQ />} />
                    <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                    <Route path="/terms-of-service" element={<TermsOfService />} />
                    <Route path="/rss" element={<RSS />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </BrowserRouter>
                
                {/* Global Scroll to Top Button */}
                <ScrollToTopButton />
                
                <LanguageDetectionNotice />
                <CookieConsent />
              </TooltipProvider>
            </ThemeProvider>
          </LanguageProvider>
        </AuthProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
