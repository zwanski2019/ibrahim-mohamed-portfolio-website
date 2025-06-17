
import { useEffect } from 'react';
import { Heart } from 'lucide-react';

interface AdScriptProps {
  className?: string;
  id?: string;
  label?: string;
}

const AdScript = ({ className = "", id, label = "Advertisement - Supporting free education" }: AdScriptProps) => {
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
    <div className={`w-full my-8 ${className}`}>
      {/* Ad Label */}
      <div className="flex items-center justify-center gap-2 mb-3 opacity-70">
        <Heart className="h-3 w-3 text-red-400" />
        <span className="text-xs text-muted-foreground font-medium">
          {label}
        </span>
      </div>
      
      {/* Ad Container */}
      <div 
        id={id || 'ad-container'} 
        className="flex justify-center"
        aria-label="Advertisement"
      />
    </div>
  );
};

export default AdScript;
