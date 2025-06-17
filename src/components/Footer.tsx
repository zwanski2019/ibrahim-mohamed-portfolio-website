
import { ArrowUp, MessageSquare } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { Helmet } from "react-helmet-async";

export default function Footer() {
  const { t } = useLanguage();
  
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <a href="#" className="text-xl font-bold text-gradient">
                ZWANSKI TECH
              </a>
              <p className="text-sm text-muted-foreground mt-2">
                {t('hero.subtitle')}
              </p>
              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-4">
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
              </div>
            </div>
            
            <div className="flex flex-col items-center md:items-end">
              <button
                onClick={handleScrollToTop}
                className="mb-4 p-3 rounded-full bg-muted/50 hover:bg-muted transition-colors"
                aria-label="Scroll to top"
              >
                <ArrowUp className="h-5 w-5" />
              </button>
              
              <p className="text-sm text-muted-foreground">
                &copy; {new Date().getFullYear()} Zwanski Tech. {t('footer.rights')}
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
