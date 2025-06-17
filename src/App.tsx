
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@/context/ThemeContext";
import { AuthProvider } from "@/context/AuthContext";
import { LanguageProvider } from "@/context/LanguageContext";
import { CookiePreferencesProvider } from "@/context/CookiePreferencesContext";
import { Toaster } from "@/components/ui/toaster"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Index from "./pages/Index";
import Services from "./pages/Services";
import Jobs from "./pages/Jobs";
import Freelancers from "./pages/Freelancers";
import Academy from "./pages/Academy";
import Chat from "./pages/Chat";
import Newsletter from "./pages/Newsletter";
import ComputerModel from "./pages/ComputerModel";
import RSS from "./pages/RSS";
import NotFound from "./pages/NotFound";
import PostJob from "./pages/PostJob";

const queryClient = new QueryClient();

function App() {
  return (
    <Router>
      <ThemeProvider>
        <CookiePreferencesProvider>
          <LanguageProvider>
            <AuthProvider>
              <QueryClientProvider client={queryClient}>
                <div className="min-h-screen bg-background text-foreground">
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/services" element={<Services />} />
                    <Route path="/jobs" element={<Jobs />} />
                    <Route path="/freelancers" element={<Freelancers />} />
                    <Route path="/post-job" element={<PostJob />} />
                    <Route path="/academy" element={<Academy />} />
                    <Route path="/chat" element={<Chat />} />
                    <Route path="/newsletter" element={<Newsletter />} />
                    <Route path="/computer-model" element={<ComputerModel />} />
                    <Route path="/rss" element={<RSS />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                  <Toaster />
                </div>
              </QueryClientProvider>
            </AuthProvider>
          </LanguageProvider>
        </CookiePreferencesProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
