
import { ArrowRight, ExternalLink, Github, Mail, MapPin, Phone } from "lucide-react";

export default function Hero() {
  return (
    <section id="about" className="relative pt-32 pb-20 overflow-hidden">
      {/* Gradient background effect */}
      <div className="absolute inset-0 bg-gradient-radial from-primary/5 to-transparent -z-10"></div>
      
      {/* Floating orbs for 3D effect */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse-slow -z-10"></div>
      <div className="absolute bottom-10 left-10 w-48 h-48 bg-secondary/10 rounded-full blur-3xl animate-pulse-slow -z-10"></div>
      
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in">
                <span>Hi, I'm </span>
                <span className="text-gradient">Ibrahim Mohamed</span>
              </h1>
              
              <h2 className="text-xl md:text-2xl font-semibold text-muted-foreground mb-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
                Web Developer & IT Support Specialist
              </h2>
              
              <p className="text-lg text-muted-foreground mb-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
                I build responsive websites, develop web applications, and provide comprehensive IT support. 
                With expertise in WordPress, PHP, and various web technologies, I create efficient digital solutions for businesses.
              </p>
              
              <div className="flex flex-wrap gap-4 mb-8 animate-fade-in" style={{ animationDelay: "0.3s" }}>
                <a href="mailto:mohaaibb4@proton.me" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
                  <Mail className="h-4 w-4" />
                  mohaaibb4@proton.me
                </a>
                
                <a href="tel:+21694934141" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
                  <Phone className="h-4 w-4" />
                  +216 94934141
                </a>
                
                <span className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  Tunis, Tunisia
                </span>
              </div>
              
              <div className="flex flex-wrap gap-4 animate-fade-in" style={{ animationDelay: "0.4s" }}>
                <a 
                  href="#projects" 
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium shadow-lg hover:shadow-xl transition-all hover:scale-105"
                >
                  View My Work
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
                
                <a 
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-border bg-background text-foreground font-medium hover:bg-muted/50 transition-all"
                >
                  Contact Me
                </a>
              </div>
              
              <div className="flex gap-4 mt-8 animate-fade-in" style={{ animationDelay: "0.5s" }}>
                <a 
                  href="https://github.com/zwanski2019" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 rounded-full hover:bg-muted transition-colors"
                  aria-label="GitHub Profile"
                >
                  <Github className="h-5 w-5" />
                </a>
                
                <a 
                  href="https://zwanski2019.github.io/zwanski-store/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 rounded-full hover:bg-muted transition-colors"
                  aria-label="Portfolio Website"
                >
                  <ExternalLink className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
          
          <div className="order-1 lg:order-2 flex justify-center">
            <div className="relative w-60 h-60 md:w-80 md:h-80">
              {/* 3D profile card */}
              <div className="absolute inset-0 card-transform-3d rounded-2xl overflow-hidden shadow-3d bg-card">
                <div className="absolute inset-0 bg-card-gradient"></div>
                <div className="h-1/2 bg-primary"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                  <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-muted overflow-hidden border-4 border-background mb-4">
                    <div className="w-full h-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-xl md:text-3xl text-white font-bold">
                      IM
                    </div>
                  </div>
                  
                  <h3 className="text-lg md:text-xl font-bold text-center">Ibrahim Mohamed</h3>
                  <p className="text-sm text-muted-foreground text-center mt-1">Web Developer</p>
                  
                  <div className="mt-4 pt-4 border-t border-border w-full">
                    <div className="grid grid-cols-2 gap-2 text-center">
                      <div>
                        <p className="text-xs text-muted-foreground">Languages</p>
                        <p className="font-medium text-sm">5</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Projects</p>
                        <p className="font-medium text-sm">10+</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Decorative elements for 3D effect */}
              <div className="absolute top-[-20px] right-[-20px] w-16 h-16 rounded-full bg-accent/20 backdrop-blur-md animate-float" style={{ animationDelay: "0.5s" }}></div>
              <div className="absolute bottom-[-10px] left-[-30px] w-20 h-20 rounded-full bg-primary/20 backdrop-blur-md animate-float" style={{ animationDelay: "0.3s" }}></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
