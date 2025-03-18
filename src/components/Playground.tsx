
import { Gamepad2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

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
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10 animate-on-scroll" style={{ animationDelay: "0.3s" }}>
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
        
        {/* New 3D Computer Model Showcase */}
        <div className="bg-card rounded-lg border border-border p-6 shadow-md hover:shadow-lg transition-all mb-8 animate-on-scroll" style={{ animationDelay: "0.4s" }}>
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-3">Interactive 3D Computer Model</h3>
              <p className="text-muted-foreground mb-4">
                Explore my interactive 3D computer model created with Three.js and React Three Fiber. 
                This showcase demonstrates my skills in 3D web development and interactive design.
              </p>
              <Link to="/3d-computer">
                <Button className="group">
                  View 3D Model
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Button>
              </Link>
            </div>
            <div className="w-full md:w-1/3 aspect-video bg-background/50 rounded-lg overflow-hidden relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <svg className="w-16 h-16 text-primary/30 animate-pulse" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 16V8.00002C21 6.34317 19.6569 5.00002 18 5.00002H6C4.34315 5.00002 3 6.34317 3 8.00002V16C3 17.6569 4.34315 19 6 19H18C19.6569 19 21 17.6569 21 16Z" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M3 8L7 5M21 8L17 5" stroke="currentColor" strokeWidth="1.5" />
                  <rect x="8" y="14" width="8" height="2" rx="0.5" fill="currentColor" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
