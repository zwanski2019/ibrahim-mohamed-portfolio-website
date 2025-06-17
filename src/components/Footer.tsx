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
      
      <footer className="py-12 bg-card border-t border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Company Info */}
            <div className="md:col-span-2">
              <a href="/" className="text-xl font-bold text-gradient">
                ZWANSKI TECH
              </a>
              <p className="text-sm text-muted-foreground mt-2">
                {t('hero.subtitle')}
              </p>
              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-4 flex-wrap">
                  <a 
                    href="/rss" 
                    className="text-xs text-muted-foreground hover:text-primary transition-colors"
                    title="Subscribe to RSS Feed"
                  >
                    RSS Feed
                  </a>
                  <a 
                    href="https://t.me/zwanski_tech" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 transition-colors font-medium"
                    title="Join our Telegram for instant news"
                  >
                    <MessageSquare className="h-3 w-3" />
                    Join Telegram for instant news
                  </a>
                </div>
                
                {/* Support Section */}
                <div className="mt-4 p-3 bg-gradient-to-r from-red-50/50 to-pink-50/50 dark:from-red-950/20 dark:to-pink-950/20 rounded-lg border border-red-200/30">
                  <div className="flex items-center gap-2 mb-1">
                    <Heart className="h-4 w-4 text-red-500" />
                    <span className="text-sm font-medium text-red-600 dark:text-red-400">
                      Supporting Free Education
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">
                    We use ads to keep our courses and tools completely free.
                  </p>
                  <Link 
                    to="/support" 
                    className="text-xs text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-medium transition-colors"
                  >
                    Learn how you can help →
                  </Link>
                </div>
              </div>
            </div>

            {/* Company Links */}
            <div>
              <h3 className="font-semibold mb-3">Company</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/services" className="text-muted-foreground hover:text-primary transition-colors">
                    Services
                  </Link>
                </li>
                <li>
                  <Link to="/academy" className="text-muted-foreground hover:text-primary transition-colors">
                    Academy
                  </Link>
                </li>
                <li>
                  <Link to="/jobs" className="text-muted-foreground hover:text-primary transition-colors">
                    Job Marketplace
                  </Link>
                </li>
                <li>
                  <Link to="/infrastructure" className="text-muted-foreground hover:text-primary transition-colors">
                    Infrastructure
                  </Link>
                </li>
              </ul>
            </div>

            {/* Support & Legal */}
            <div>
              <h3 className="font-semibold mb-3">Support & Legal</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/faq" className="text-muted-foreground hover:text-primary transition-colors">
                    FAQ
                  </Link>
                </li>
                <li>
                  <a href="mailto:support@zwanski.org" className="text-muted-foreground hover:text-primary transition-colors">
                    Contact Support
                  </a>
                </li>
                <li>
                  <Link to="/privacy-policy" className="text-muted-foreground hover:text-primary transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/terms-of-service" className="text-muted-foreground hover:text-primary transition-colors">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-border">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm text-muted-foreground">
                &copy; {new Date().getFullYear()} Zwanski Tech. {t('footer.rights')}
              </p>
              <div className="flex items-center gap-4 mt-4 md:mt-0">
                <Link 
                  to="/privacy-policy" 
                  className="text-xs text-muted-foreground hover:text-primary transition-colors"
                >
                  Privacy
                </Link>
                <Link 
                  to="/terms-of-service" 
                  className="text-xs text-muted-foreground hover:text-primary transition-colors"
                >
                  Terms
                </Link>
                <Link 
                  to="/faq" 
                  className="text-xs text-muted-foreground hover:text-primary transition-colors"
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
