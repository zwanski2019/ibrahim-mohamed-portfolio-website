
import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

// Company logo data with name and icon/image
const companyLogos = [
  {
    id: "elspace",
    name: "El Space Tunis",
    icon: "🏢",
  },
  {
    id: "tinosoft",
    name: "Tino-soft",
    icon: "🖥️",
  },
  {
    id: "upeople",
    name: "University of the People",
    icon: "🎓",
  },
  {
    id: "orange",
    name: "Orange Digital Center",
    icon: "📱",
  },
  {
    id: "isc2",
    name: "ISC2",
    icon: "🔒",
  },
  {
    id: "carnegie",
    name: "Carnegie Mellon University",
    icon: "🏛️",
  },
];

const CompanyLogos = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Create intersection observer for animation trigger
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            container.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(container);

    return () => {
      if (container) observer.unobserve(container);
    };
  }, []);

  return (
    <div className="py-12 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl overflow-hidden">
      <h3 className="text-center text-xl font-bold mb-8">{t('companies.title')}</h3>
      
      <div 
        ref={containerRef}
        className="relative opacity-0 transition-opacity duration-1000 animate-on-scroll"
      >
        <div className="flex overflow-hidden">
          <motion.div
            className="flex space-x-12 px-4"
            animate={{
              x: [0, -1500],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 30,
                ease: "linear",
              },
            }}
          >
            {/* First set of logos */}
            {companyLogos.map((logo) => (
              <div 
                key={logo.id} 
                className="flex flex-col items-center justify-center w-40 h-40 bg-card rounded-xl shadow-md border border-border p-4 hover:scale-105 transition-transform"
              >
                <div className="text-4xl mb-2">{logo.icon}</div>
                <p className="text-sm font-medium text-center">{logo.name}</p>
              </div>
            ))}
            
            {/* Duplicate set for seamless loop */}
            {companyLogos.map((logo) => (
              <div 
                key={`duplicate-${logo.id}`}
                className="flex flex-col items-center justify-center w-40 h-40 bg-card rounded-xl shadow-md border border-border p-4 hover:scale-105 transition-transform"
              >
                <div className="text-4xl mb-2">{logo.icon}</div>
                <p className="text-sm font-medium text-center">{logo.name}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CompanyLogos;
