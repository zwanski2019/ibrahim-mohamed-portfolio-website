
import { useState } from "react";
import { ShoppingCart, ExternalLink, X } from "lucide-react";

export default function AffiliateProgram() {
  const [showAffiliate, setShowAffiliate] = useState(true);

  if (!showAffiliate) return null;

  return (
    <div className="w-full bg-primary/10 border-b border-primary/20">
      <div className="container mx-auto py-2 px-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <ShoppingCart size={16} className="text-primary shrink-0" />
            <p className="text-sm font-medium text-center sm:text-left">
              Support our platform through our partners
            </p>
          </div>
          
          <div className="flex items-center gap-3 flex-wrap justify-center">
            <a 
              href="https://amzn.to/3YourAmazonAffiliateLink" 
              target="_blank" 
              rel="noopener noreferrer sponsored"
              className="text-xs sm:text-sm px-3 py-1 bg-primary/20 text-primary rounded-md hover:bg-primary/30 transition-colors border border-primary/30 flex items-center gap-1"
            >
              Shop Amazon <ExternalLink size={12} />
            </a>
            
            <a 
              href="https://kwork.com?ref=15601385" 
              target="_blank" 
              rel="noopener noreferrer sponsored"
              className="text-xs sm:text-sm px-3 py-1 bg-primary/20 text-primary rounded-md hover:bg-primary/30 transition-colors border border-primary/30 flex items-center gap-1"
            >
              Find Services on Kwork <ExternalLink size={12} />
            </a>
            
            <button 
              onClick={() => setShowAffiliate(false)} 
              className="text-xs text-muted-foreground hover:text-foreground ml-1"
              aria-label="Close affiliate banner"
            >
              <X size={12} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
