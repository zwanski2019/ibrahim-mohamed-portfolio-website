
import { useState } from "react";
import { ExternalLink, Copy, Check, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

export default function AffiliateProgram() {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const affiliateLink = "https://amzn.to/429a1kO";
  const storeId = "zwanskitech-20";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(affiliateLink);
    setCopied(true);
    toast({
      title: "Link copied to clipboard!",
      description: "You can now paste it anywhere you want.",
      duration: 3000,
    });
    
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full bg-gradient-to-r from-[#232f3e] to-[#131921] text-white py-1.5">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-center justify-between">
          <div className="flex flex-col items-start space-y-1">
            <div className="flex items-center space-x-2">
              <ShoppingCart className="h-4 w-4 text-[#f90]" />
              <span className="text-sm font-medium">Support us by shopping with our Amazon Affiliate Link</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm">Shop on Amazon</span>
              <span className="text-xs px-2 py-0.5 bg-[#f90]/20 rounded-full text-[#f90] font-medium">Store ID: {storeId}</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 mt-2 sm:mt-0">
            <div className="relative flex items-center max-w-[180px] sm:max-w-xs">
              <input 
                type="text" 
                value={affiliateLink}
                readOnly
                className="w-full text-xs bg-white/10 border border-white/20 text-white rounded-l-md py-1 px-2 focus:outline-none focus:ring-1 focus:ring-[#f90]"
              />
              <Button 
                variant="outline" 
                size="sm" 
                className="rounded-l-none h-[28px] border-l-0 bg-white/10 border-white/20 hover:bg-white/20 text-white"
                onClick={copyToClipboard}
              >
                {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
              </Button>
            </div>
            
            <Button 
              size="sm" 
              className="h-[28px] text-xs bg-[#f90] hover:bg-[#f90]/80 text-black"
              asChild
            >
              <a href={affiliateLink} target="_blank" rel="noopener noreferrer" className="flex items-center">
                Shop Now <ExternalLink className="ml-1 h-3 w-3" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
