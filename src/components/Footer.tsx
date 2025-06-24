
import { MessageSquare, Heart } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <>
      <Helmet>
        <link 
          rel="alternate" 
          type="application/rss+xml" 
          title="Zwanski Tech RSS Feed" 
          href="/rss" 
        />
        <link 
          rel="alternate" 
          type="application/rss+xml" 
          title="Zwanski Tech Feed" 
          href="/feed" 
        />
      </Helmet>
      
      <footer className="py-12 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 border-t border-purple-500/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(147,51,234,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.1),transparent_50%)]" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Company Info */}
            <div className="md:col-span-2">
              <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                ZWANSKI TECH
              </Link>
              <p className="text-sm text-slate-300 mt-3 max-w-md">
                {t('hero.subtitle')}
              </p>
              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-4 flex-wrap">
                  <Link 
                    to="/rss" 
                    className="text-xs text-slate-400 hover:text-purple-300 transition-colors px-3 py-1 bg-purple-500/10 rounded-full border border-purple-500/20 hover:border-purple-400/30"
                    title="Subscribe to RSS Feed"
                  >
                    RSS Feed
                  </Link>
                  <a 
                    href="https://t.me/zwanski_tech" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-xs text-blue-300 hover:text-blue-200 transition-colors font-medium px-3 py-1 bg-blue-500/10 rounded-full border border-blue-500/20 hover:border-blue-400/30"
                    title="Join our Telegram for instant news"
                  >
                    <MessageSquare className="h-3 w-3" />
                    Join Telegram for instant news
                  </a>
                </div>
              </div>
            </div>

            {/* Company Links */}
            <div>
              <h3 className="font-semibold mb-4 text-purple-300">Company</h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link to="/about" className="text-slate-400 hover:text-purple-300 transition-colors block py-1">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/services" className="text-slate-400 hover:text-purple-300 transition-colors block py-1">
                    Services
                  </Link>
                </li>
                <li>
                  <Link to="/academy" className="text-slate-400 hover:text-purple-300 transition-colors block py-1">
                    Academy
                  </Link>
                </li>
                <li>
                  <Link to="/jobs" className="text-slate-400 hover:text-purple-300 transition-colors block py-1">
                    Job Marketplace
                  </Link>
                </li>
                <li>
                  <Link to="/infrastructure" className="text-slate-400 hover:text-purple-300 transition-colors block py-1">
                    Infrastructure
                  </Link>
                </li>
              </ul>
            </div>

            {/* Support & Legal */}
            <div>
              <h3 className="font-semibold mb-4 text-blue-300">Support & Legal</h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link to="/faq" className="text-slate-400 hover:text-blue-300 transition-colors block py-1">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link to="/support" className="text-slate-400 hover:text-blue-300 transition-colors block py-1">
                    Support
                  </Link>
                </li>
                <li>
                  <Link to="/privacy" className="text-slate-400 hover:text-blue-300 transition-colors block py-1">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="text-slate-400 hover:text-blue-300 transition-colors block py-1">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-purple-500/20">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm text-slate-400">
                &copy; {new Date().getFullYear()} Zwanski Tech. {t('footer.rights')}
              </p>
              <div className="flex items-center gap-6 mt-4 md:mt-0">
                <Link 
                  to="/privacy" 
                  className="text-xs text-slate-400 hover:text-purple-300 transition-colors"
                >
                  Privacy
                </Link>
                <Link 
                  to="/terms" 
                  className="text-xs text-slate-400 hover:text-purple-300 transition-colors"
                >
                  Terms
                </Link>
                <Link 
                  to="/faq" 
                  className="text-xs text-slate-400 hover:text-purple-300 transition-colors"
                >
                  FAQ
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
