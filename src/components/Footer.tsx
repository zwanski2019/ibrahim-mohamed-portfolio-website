
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
      
      <footer className="py-12 bg-background border-t border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Company Info */}
            <div className="md:col-span-2">
              <Link to="/" className="text-xl font-bold text-gradient">
                ZWANSKI TECH
              </Link>
              <p className="text-sm text-muted-foreground mt-2">
                {t('hero.subtitle')}
              </p>
              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-4 flex-wrap">
                  <Link 
                    to="/rss" 
                    className="text-xs text-muted-foreground hover:text-primary transition-colors"
                    title="Subscribe to RSS Feed"
                  >
                    RSS Feed
                  </Link>
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
                  <Link to="/support" className="text-muted-foreground hover:text-primary transition-colors">
                    Support
                  </Link>
                </li>
                <li>
                  <Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="text-muted-foreground hover:text-primary transition-colors">
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
                  to="/privacy" 
                  className="text-xs text-muted-foreground hover:text-primary transition-colors"
                >
                  Privacy
                </Link>
                <Link 
                  to="/terms" 
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
