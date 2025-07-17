
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

// Lazy load components for better performance with error handling
import { lazy, Suspense } from "react";
import ErrorBoundary from "@/components/ErrorBoundary";

// Enhanced Index import with retry logic
const Index = lazy(() => 
  import("./pages/Index").catch((error) => {
    if (process.env.NODE_ENV === 'development') {
      console.error('Failed to load Index component:', error);
    }
    // Return a robust fallback component on import failure
    return {
      default: () => (
        <div className="min-h-screen flex items-center justify-center bg-background">
          <div className="text-center p-8 max-w-md mx-auto">
            <h1 className="text-3xl font-bold mb-4 text-foreground">Zwanski Tech</h1>
            <p className="text-muted-foreground mb-6">Professional IT Services & Digital Education Platform</p>
            <div className="space-y-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
              <button 
                onClick={() => window.location.reload()} 
                className="px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
              >
                Reload Page
              </button>
            </div>
          </div>
        </div>
      )
    };
  })
);
const Services = lazy(() => import("./pages/Services"));
const About = lazy(() => import("./pages/About"));
const Chat = lazy(() => import("./pages/Chat"));
const Profile = lazy(() => import("./pages/Profile"));
const NotFound = lazy(() => import("./pages/NotFound"));
const ComputerModel = lazy(() => import("./pages/ComputerModel"));
const Newsletter = lazy(() => import("./pages/Newsletter"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));
const FAQ = lazy(() => import("./pages/FAQ"));
const Support = lazy(() => import("./pages/Support"));
const Auth = lazy(() => import("./pages/Auth"));
const Settings = lazy(() => import("./pages/Settings"));
const Academy = lazy(() => import("./pages/Academy"));
const Freelancers = lazy(() => import("./pages/Freelancers"));
const Jobs = lazy(() => import("./pages/Jobs"));
const PostJob = lazy(() => import("./pages/PostJob"));
const JobDetail = lazy(() => import("./pages/JobDetail"));
const IMEICheck = lazy(() => import("./pages/IMEICheck"));
const Infrastructure = lazy(() => import("./pages/Infrastructure"));
const Tools = lazy(() => import("./pages/Tools"));
const Blog = lazy(() => import("./pages/Blog"));
const RSS = lazy(() => import("./pages/RSS"));
const Search = lazy(() => import("./pages/Search"));

// Admin pages - separate chunk
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const AdminJobs = lazy(() => import("./pages/admin/AdminJobs"));
const AdminUsers = lazy(() => import("./pages/admin/AdminUsers"));
const AdminMessages = lazy(() => import("./pages/admin/AdminMessages"));
const AdminPosts = lazy(() => import("./pages/admin/AdminPosts"));
const AdminSettings = lazy(() => import("./pages/admin/AdminSettings"));
import { LanguageDetectionNotice } from "./components/LanguageDetectionNotice";
import ScrollToTop from "./components/ScrollToTop";
import ScrollToTopButton from "./components/ScrollToTopButton";
import ChatWidget from "./components/ChatWidget";
import { AccessibilityEnhancer } from "./components/AccessibilityEnhancer";
import { usePerformanceMonitoring, useMemoryMonitoring } from "./hooks/usePerformanceMonitoring";

// Styles
import "./App.css";
import "./styles/components.css";
import "./styles/utilities.css";
import "./styles/base.css";
import "./styles/animations.css";

const queryClient = new QueryClient(); // Force refresh for Tools import

function App() {
  // Performance monitoring hooks
  usePerformanceMonitoring();
  useMemoryMonitoring();

  const LoadingSpinner = () => (
    <div className="min-h-screen flex items-center justify-center bg-background" role="status" aria-label="Loading">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-sm text-muted-foreground">Loading Zwanski Tech...</p>
        <span className="sr-only">Loading application</span>
      </div>
    </div>
  );

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <ThemeProvider>
            <LanguageProvider>
              <CookiePreferencesProvider>
                <AuthProvider>
                  <BrowserRouter>
                    <ErrorBoundary>
                      <ScrollToTop />
                      <Helmet>
                        <title>Zwanski Tech - Professional IT Services & Digital Education Platform</title>
                        <meta name="description" content="Expert IT services in Tunisia: computer repair, cybersecurity, web development, and digital education. Professional solutions for businesses and individuals." />
                      </Helmet>
                      <Suspense fallback={<LoadingSpinner />}>
                        <div className="app-content-ready homepage-content">
                          <ErrorBoundary fallback={
                            <div className="min-h-screen flex items-center justify-center bg-background">
                              <div className="text-center p-8">
                                <h1 className="text-2xl font-bold mb-4">Zwanski Tech</h1>
                                <p className="text-muted-foreground mb-4">Professional IT Services & Digital Education</p>
                                <button 
                                  onClick={() => window.location.reload()} 
                                  className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90"
                                >
                                  Retry
                                </button>
                              </div>
                            </div>
                          }>
                            <Routes>
                          <Route path="/" element={
                            <ErrorBoundary fallback={
                              <div className="min-h-screen flex items-center justify-center bg-background">
                                <div className="text-center p-8">
                                  <h1 className="text-2xl font-bold mb-4">Welcome to Zwanski Tech</h1>
                                  <p className="text-muted-foreground">Professional IT Services & Digital Education Platform</p>
                                </div>
                              </div>
                            }>
                              <Index />
                            </ErrorBoundary>
                          } />
                          <Route path="/services" element={<Services />} />
                          <Route path="/about" element={<About />} />
                          <Route path="/computer-model" element={<ComputerModel />} />
                          <Route path="/3d" element={<ComputerModel />} />
                          <Route path="/chat" element={<Chat />} />
                          <Route path="/newsletter" element={<Newsletter />} />
                          <Route path="/academy" element={<Academy />} />
                          <Route path="/jobs" element={<Jobs />} />
                          <Route path="/jobs/:id" element={<JobDetail />} />
                          <Route path="/post-job" element={<PostJob />} />
                          <Route path="/freelancers" element={<Freelancers />} />
                          <Route path="/auth" element={<Auth />} />
                          <Route path="/blog" element={<Blog />} />
                          
                          {/* Admin Routes */}
                          <Route path="/admin" element={<AdminDashboard />} />
                          <Route path="/admin/users" element={<AdminUsers />} />
                          <Route path="/admin/posts" element={<AdminPosts />} />
                          <Route path="/admin/jobs" element={<AdminJobs />} />
                          <Route path="/admin/messages" element={<AdminMessages />} />
                          <Route path="/admin/settings" element={<AdminSettings />} />
                          
                          {/* User Profile Routes */}
                          <Route path="/profile" element={<Profile />} />
                          <Route path="/settings" element={<Settings />} />
                          
                          {/* Privacy and Terms Routes */}
                          <Route path="/privacy" element={<PrivacyPolicy />} />
                          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                          <Route path="/terms" element={<TermsOfService />} />
                          <Route path="/terms-of-service" element={<TermsOfService />} />
                          
                          <Route path="/support" element={<Support />} />
                          <Route path="/faq" element={<FAQ />} />
                          <Route path="/infrastructure" element={<Infrastructure />} />
                          <Route path="/imei-check" element={<IMEICheck />} />
                          <Route path="/tools" element={<Tools />} />
                          <Route path="/search" element={<Search />} />
                          <Route path="/rss" element={<RSS />} />
                          <Route path="/feed" element={<RSS />} />
                          <Route path="*" element={<NotFound />} />
                            </Routes>
                          </ErrorBoundary>
                        </div>
                      </Suspense>
                      
                      <AccessibilityEnhancer />
                      <LanguageDetectionNotice />
                      <ScrollToTopButton />
                      <ChatWidget />
                      <Toaster />
                    </ErrorBoundary>
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
