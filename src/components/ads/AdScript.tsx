
import { useEffect } from 'react';

interface AdScriptProps {
  className?: string;
  id?: string;
}

const AdScript = ({ className = "", id }: AdScriptProps) => {
  useEffect(() => {
    // Create script element
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = '//pl26942427.profitableratecpm.com/74/fa/a0/74faa096382433110ec637a806a9d2e0.js';
    script.async = true;
    
    // Find the container and append script
    const container = document.getElementById(id || 'ad-container');
    if (container) {
      container.appendChild(script);
    }
    
    // Cleanup function
    return () => {
      if (container && container.contains(script)) {
        container.removeChild(script);
      }
    };
  }, [id]);

  return (
    <div 
      id={id || 'ad-container'} 
      className={`w-full flex justify-center my-8 ${className}`}
      aria-label="Advertisement"
    />
  );
};

export default AdScript;
