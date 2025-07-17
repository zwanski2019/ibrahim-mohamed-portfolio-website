import React, { useEffect, useRef, useState } from 'react';

interface TurnstileWidgetProps {
  onVerify: (token: string) => void;
  onError?: () => void;
  onExpire?: () => void;
  theme?: 'light' | 'dark' | 'auto';
  size?: 'normal' | 'compact';
}

declare global {
  interface Window {
    turnstile?: {
      render: (container: string | HTMLElement, options: any) => string;
      remove: (widgetId: string) => void;
      reset: (widgetId: string) => void;
    };
  }
}

const TurnstileWidget: React.FC<TurnstileWidgetProps> = ({
  onVerify,
  onError,
  onExpire,
  theme = 'auto',
  size = 'normal'
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [widgetId, setWidgetId] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Load Turnstile script
    const script = document.createElement('script');
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
    script.async = true;
    script.defer = true;
    
    script.onload = () => {
      setIsLoaded(true);
    };

    document.head.appendChild(script);

    return () => {
      // Cleanup
      if (widgetId && window.turnstile) {
        window.turnstile.remove(widgetId);
      }
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  useEffect(() => {
    if (isLoaded && containerRef.current && window.turnstile) {
      const id = window.turnstile.render(containerRef.current, {
        sitekey: '0x4AAAAAAAiC4uPFgUCJvz4K', // Cloudflare Turnstile site key
        theme,
        size,
        callback: onVerify,
        'error-callback': onError,
        'expired-callback': onExpire,
      });
      setWidgetId(id);
    }
  }, [isLoaded, onVerify, onError, onExpire, theme, size]);

  return (
    <div 
      ref={containerRef} 
      className="flex justify-center items-center min-h-[65px]"
      aria-label="Cloudflare Turnstile verification"
    />
  );
};

export default TurnstileWidget;