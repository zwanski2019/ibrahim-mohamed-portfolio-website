
import { ArrowUp, MessageSquare, Heart } from "lucide-react";
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
          <div className="flex flex-col md:flex-row justify-between items-start">
            <div className="mb-6 md:mb-0">
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
                  <a 
                    href="/support" 
                    className="text-xs text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-medium transition-colors"
                  >
                    Learn how you can help →
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
