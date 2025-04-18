
import { useState } from "react";
import { ShoppingCart, ExternalLink } from "lucide-react";

export default function AffiliateProgram() {
  const [showAffiliate, setShowAffiliate] = useState(true);

  if (!showAffiliate) return null;

  return (
    <div className="w-full bg-zwansave-500/10 border-b border-zwansave-500/20">
      <div className="container mx-auto py-2 px-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <ShoppingCart size={16} className="text-zwansave-500 shrink-0" />
            <p className="text-sm font-medium text-center sm:text-left">Support us with our affiliate partners</p>
          </div>
          
          <div className="flex items-center gap-3 flex-wrap justify-center">
            <a 
              href="https://amzn.to/429a1kO" 
              target="_blank" 
              rel="noopener noreferrer sponsored"
              className="text-xs sm:text-sm px-3 py-1 bg-zwansave-500/20 text-zwansave-500 rounded-md hover:bg-zwansave-500/30 transition-colors border border-zwansave-500/30 flex items-center gap-1"
            >
              Shop on Amazon <ExternalLink size={12} />
            </a>
            
            <a 
              href="https://kwork.com?ref=15601385" 
              target="_blank" 
              rel="noopener noreferrer sponsored"
              className="text-xs sm:text-sm px-3 py-1 bg-green-500/20 text-green-500 rounded-md hover:bg-green-500/30 transition-colors border border-green-500/30 flex items-center gap-1"
            >
              Find Freelancers on Kwork <ExternalLink size={12} />
            </a>
            
            <button 
              onClick={() => setShowAffiliate(false)} 
              className="text-xs text-muted-foreground hover:text-foreground ml-1"
              aria-label="Close affiliate banner"
            >
              ✕
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

