
import React, { useEffect, useRef, useState } from 'react';

interface TurnstileWidgetProps {
  siteKey: string;
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
  siteKey,
  onVerify,
  onError,
  onExpire,
  theme = 'auto',
  size = 'normal'
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [widgetId, setWidgetId] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!siteKey) {
      setError('Site key is required');
      return;
    }

    // Load Turnstile script
    const script = document.createElement('script');
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
    script.async = true;
    script.defer = true;
    
    script.onload = () => {
      console.log('Turnstile script loaded successfully');
      setIsLoaded(true);
    };

    script.onerror = () => {
      console.error('Failed to load Turnstile script');
      setError('Failed to load CAPTCHA');
      if (onError) onError();
    };

    document.head.appendChild(script);

    return () => {
      // Cleanup
      if (widgetId && window.turnstile) {
        try {
          window.turnstile.remove(widgetId);
        } catch (err) {
          console.warn('Error removing Turnstile widget:', err);
        }
      }
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [siteKey]);

  useEffect(() => {
    if (isLoaded && containerRef.current && window.turnstile && siteKey && !widgetId) {
      try {
        console.log('Rendering Turnstile widget with site key:', siteKey);
        const id = window.turnstile.render(containerRef.current, {
          sitekey: siteKey,
          theme,
          size,
          callback: (token: string) => {
            console.log('Turnstile verification successful');
            onVerify(token);
          },
          'error-callback': () => {
            console.error('Turnstile verification error');
            setError('CAPTCHA verification failed');
            if (onError) onError();
          },
          'expired-callback': () => {
            console.warn('Turnstile token expired');
            if (onExpire) onExpire();
          },
        });
        setWidgetId(id);
        console.log('Turnstile widget rendered with ID:', id);
      } catch (err) {
        console.error('Error rendering Turnstile widget:', err);
        setError('Failed to initialize CAPTCHA');
        if (onError) onError();
      }
    }
  }, [isLoaded, siteKey, onVerify, onError, onExpire, theme, size, widgetId]);

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[65px] text-red-500 text-sm">
        {error}
      </div>
    );
  }

  if (!siteKey) {
    return (
      <div className="flex justify-center items-center min-h-[65px] text-gray-500 text-sm">
        Loading CAPTCHA...
      </div>
    );
  }

  return (
    <div 
      ref={containerRef} 
      className="flex justify-center items-center min-h-[65px]"
      aria-label="Cloudflare Turnstile verification"
    />
  );
};

export default TurnstileWidget;
