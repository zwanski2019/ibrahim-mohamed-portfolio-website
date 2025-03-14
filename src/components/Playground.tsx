
import { Gamepad2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function Playground() {
  const { t } = useLanguage();
  
  return (
    <section id="playground" className="py-20 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background to-background/50 -z-10"></div>
      <div className="absolute top-40 right-20 w-72 h-72 bg-primary/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-20 left-10 w-64 h-64 bg-secondary/5 rounded-full blur-3xl -z-10"></div>
      
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center mb-12 animate-on-scroll">
          <div className="flex items-center gap-2 mb-4">
            <Gamepad2 className="h-6 w-6 text-primary" />
            <h2 className="text-3xl md:text-4xl font-bold">{t('playground.title')}</h2>
          </div>
          <p className="text-muted-foreground text-center max-w-2xl">
            {t('playground.subtitle')}
          </p>
        </div>
        
        <div className="flex justify-center mb-12 animate-on-scroll" style={{ animationDelay: "0.2s" }}>
          <div className="bg-card p-6 rounded-lg shadow-md border border-border hover:shadow-lg transition-all">
            <h3 className="text-xl font-bold mb-4">{t('playground.featured')}</h3>
            <div className="flex justify-center">
              <a 
                href="https://aiagentsdirectory.com/agent/shorts-ninja-ai" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:opacity-90 transition-opacity"
              >
                <img 
                  src="https://aiagentsdirectory.com/featured-badge.svg" 
                  alt="Featured on AI Agents Directory" 
                  width="200" 
                  height="50" 
                  className="transform hover:scale-105 transition-transform"
                />
              </a>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-on-scroll" style={{ animationDelay: "0.3s" }}>
          <div className="bg-card rounded-lg p-6 border border-border shadow-sm hover:shadow-md transition-all">
            <h3 className="font-bold mb-2">{t('playground.item1.title')}</h3>
            <p className="text-muted-foreground">{t('playground.item1.description')}</p>
          </div>
          
          <div className="bg-card rounded-lg p-6 border border-border shadow-sm hover:shadow-md transition-all">
            <h3 className="font-bold mb-2">{t('playground.item2.title')}</h3>
            <p className="text-muted-foreground">{t('playground.item2.description')}</p>
          </div>
          
          <div className="bg-card rounded-lg p-6 border border-border shadow-sm hover:shadow-md transition-all">
            <h3 className="font-bold mb-2">{t('playground.item3.title')}</h3>
            <p className="text-muted-foreground">{t('playground.item3.description')}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
