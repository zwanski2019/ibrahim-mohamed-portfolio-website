
import { ArrowUp } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();
  
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="py-12 bg-card border-t border-border">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <a href="#" className="text-xl font-bold text-gradient">
              ZWANSKI
            </a>
            <p className="text-sm text-muted-foreground mt-2">
              {t('hero.subtitle')}
            </p>
            
            <div className="mt-4 border-t border-border pt-4">
              <h3 className="text-sm font-medium mb-2">Text Link to this Page</h3>
              <div className="text-sm text-muted-foreground">
                <p className="mb-1">Store ID: <span className="font-mono">zwanskitech-20</span></p>
                <p className="mb-1">Tracking ID: <span className="font-mono">zwanskitech-20</span></p>
                <p className="mb-2">
                  <a 
                    href="https://amzn.to/429a1kO" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    https://amzn.to/429a1kO
                  </a>
                </p>
                <p><span className="text-xs">Short Link</span></p>
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
              &copy; {new Date().getFullYear()} Zwanski. {t('footer.rights')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
