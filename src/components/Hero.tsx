
import { ArrowRight, ExternalLink, Github, Mail, MapPin, Phone } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";

export default function Hero() {
  const { t } = useLanguage();
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.3
      } 
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  return (
    <section 
      id="about" 
      className="relative pt-32 pb-20 overflow-hidden"
      aria-label="About Mohamed Ibrahim"
    >
      {/* SEO-optimized heading with better semantic structure */}
      <h1 className="sr-only">Mohamed Ibrahim (Zwanski) - Web Developer from Tunisia</h1>
      
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-radial from-primary/5 to-transparent -z-10"></div>
      <div className="absolute top-20 right-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse-slow -z-10"></div>
      <div className="absolute bottom-10 left-10 w-48 h-48 bg-secondary/10 rounded-full blur-3xl animate-pulse-slow -z-10"></div>
      
      <div className="container mx-auto px-4">
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <div className="order-2 lg:order-1">
            <div className="max-w-2xl">
              <motion.h2 
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
                variants={itemVariants}
              >
                <span>{t('hero.title')} </span>
                <span className="text-gradient">Mohamed Ibrahim (Zwanski)</span>
              </motion.h2>
              
              <motion.div 
                className="flex flex-wrap gap-2 mb-6"
                variants={itemVariants}
              >
                <Badge variant="outline" className="bg-primary/10 text-primary-foreground border-primary/20 text-sm py-1">
                  Web Developer
                </Badge>
                <Badge variant="outline" className="bg-secondary/10 text-secondary-foreground border-secondary/20 text-sm py-1">
                  UI/UX Designer
                </Badge>
                <Badge variant="outline" className="bg-accent/10 text-accent-foreground border-accent/20 text-sm py-1">
                  Full-Stack Engineer
                </Badge>
              </motion.div>
              
              <motion.h3 
                className="text-xl md:text-2xl font-semibold text-muted-foreground mb-6"
                variants={itemVariants}
              >
                {t('hero.subtitle')}
              </motion.h3>
              
              <motion.p 
                className="text-lg text-muted-foreground mb-8"
                variants={itemVariants}
              >
                {t('hero.description')}
              </motion.p>
              
              <motion.div 
                className="flex flex-wrap gap-4 mb-8"
                variants={itemVariants}
              >
                <a href="mailto:mohaaibb4@proton.me" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                  <Mail className="h-4 w-4" />
                  mohaaibb4@proton.me
                </a>
                
                <a href="tel:+21694934141" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                  <Phone className="h-4 w-4" />
                  +216 94934141
                </a>
                
                <span className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  Tunis, Tunisia
                </span>
              </motion.div>
              
              <motion.div 
                className="flex flex-wrap gap-4"
                variants={itemVariants}
              >
                <Button 
                  variant="default" 
                  size="lg"
                  className="shadow-lg hover:shadow-xl transition-all hover:scale-105"
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  {t('hero.viewWork')}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                
                <Button 
                  variant="outline" 
                  size="lg"
                  className="hover:bg-muted/50 transition-all"
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  {t('hero.contactMe')}
                </Button>
              </motion.div>
              
              <motion.div 
                className="flex gap-4 mt-8"
                variants={itemVariants}
              >
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
              </motion.div>
            </div>
          </div>
          
          <div className="order-1 lg:order-2 flex justify-center">
            <motion.div 
              className="relative w-72 h-72 md:w-96 md:h-96 perspective-2000"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {/* 3D profile card with improved design */}
              <Card className="w-full h-full overflow-hidden rounded-xl shadow-3d card-transform-3d bg-card relative">
                <div className="absolute inset-0 bg-card-gradient"></div>
                <div className="h-1/2 bg-gradient-to-r from-primary/80 to-primary/40"></div>
                <CardContent className="absolute inset-0 flex flex-col items-center justify-center p-6">
                  <Avatar className="w-28 h-28 md:w-36 md:h-36 border-4 border-background mb-4 shadow-lg">
                    <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-2xl md:text-4xl text-white font-bold">
                      MZ
                    </AvatarFallback>
                  </Avatar>
                  
                  <h3 className="text-xl md:text-2xl font-bold text-center">Mohamed Ibrahim</h3>
                  <p className="text-md text-muted-foreground text-center mt-1">Web Developer</p>
                  
                  <Separator className="my-4 w-full opacity-30" />
                  
                  <div className="grid grid-cols-2 gap-6 text-center w-full">
                    <div className="flex flex-col">
                      <p className="text-sm text-muted-foreground">Languages</p>
                      <p className="font-medium text-lg">5</p>
                    </div>
                    <div className="flex flex-col">
                      <p className="text-sm text-muted-foreground">Projects</p>
                      <p className="font-medium text-lg">10+</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Decorative elements */}
              <motion.div 
                className="absolute top-[-20px] right-[-20px] w-20 h-20 rounded-full bg-accent/20 backdrop-blur-md"
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              ></motion.div>
              <motion.div 
                className="absolute bottom-[-10px] left-[-30px] w-24 h-24 rounded-full bg-primary/20 backdrop-blur-md"
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              ></motion.div>
              <motion.div 
                className="absolute bottom-[50px] right-[-40px] w-16 h-16 rounded-full bg-secondary/20 backdrop-blur-md"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              ></motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
