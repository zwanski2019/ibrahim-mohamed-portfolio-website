
import { useState } from "react";
import { ExternalLink, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

export default function AffiliateProgram() {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const affiliateLink = "https://amzn.to/429a1kO";

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
    <div className="w-full bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-indigo-950/40 dark:to-blue-950/40 border-b border-border py-2">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-center justify-between">
          <div className="flex items-center space-x-2 mb-2 sm:mb-0">
            <span className="text-sm font-medium">Join our Affiliate Program:</span>
            <span className="text-xs px-2 py-0.5 bg-primary/10 rounded-full text-primary font-medium">ID: zwanskitech-20</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="relative flex items-center max-w-[180px] sm:max-w-xs">
              <input 
                type="text" 
                value={affiliateLink}
                readOnly
                className="w-full text-xs bg-background/50 border border-border rounded-l-md py-1 px-2 focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <Button 
                variant="outline" 
                size="sm" 
                className="rounded-l-none h-[28px] border-l-0"
                onClick={copyToClipboard}
              >
                {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
              </Button>
            </div>
            
            <Button 
              size="sm" 
              variant="secondary"
              className="h-[28px] text-xs"
              asChild
            >
              <a href={affiliateLink} target="_blank" rel="noopener noreferrer" className="flex items-center">
                Visit <ExternalLink className="ml-1 h-3 w-3" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
