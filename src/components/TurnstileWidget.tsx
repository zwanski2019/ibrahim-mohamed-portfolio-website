
import React, { useEffect, useRef, useState } from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
  const widgetIdRef = useRef<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [scriptLoaded, setScriptLoaded] = useState(false);

  // Load Turnstile script dynamically if not present
  useEffect(() => {
    const loadScript = () => {
      // Check if script already exists
      if (document.querySelector('script[src*="challenges.cloudflare.com/turnstile"]')) {
        setScriptLoaded(true);
        return;
      }

      // Create and load script
      const script = document.createElement('script');
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
      script.async = true;
      script.defer = true;
      
      script.onload = () => {
        console.log('Turnstile script loaded successfully');
        setScriptLoaded(true);
      };
      
      script.onerror = () => {
        console.error('Failed to load Turnstile script');
        setHasError(true);
        setErrorMessage('Failed to load security verification');
        setIsLoading(false);
      };
      
      document.head.appendChild(script);
    };

    loadScript();
  }, []);

  // Render widget when script is loaded
  useEffect(() => {
    if (!scriptLoaded || !siteKey || !containerRef.current) return;

    let attempts = 0;
    const maxAttempts = 30;

    const renderWidget = () => {
      attempts++;
      
      if (window.turnstile && containerRef.current) {
        // Clean up any existing widget
        if (widgetIdRef.current) {
          try {
            window.turnstile.remove(widgetIdRef.current);
          } catch (err) {
            console.warn('Error removing previous widget:', err);
          }
          widgetIdRef.current = null;
        }

        try {
          const widgetId = window.turnstile.render(containerRef.current, {
            sitekey: siteKey,
            theme: theme,
            size: size,
            action: 'login',
            'response-field': false,
            'response-field-name': 'cf-turnstile-response',
            callback: (token: string) => {
              console.log('Turnstile verification successful');
              setIsLoading(false);
              setHasError(false);
              onVerify(token);
            },
            'error-callback': (error: any) => {
              console.error('Turnstile verification error:', error);
              setHasError(true);
              setErrorMessage('Security verification failed');
              setIsLoading(false);
              onError?.();
            },
            'expired-callback': () => {
              console.warn('Turnstile token expired');
              onExpire?.();
            },
            'timeout-callback': () => {
              console.warn('Turnstile verification timeout');
              setHasError(true);
              setErrorMessage('Verification timed out');
              setIsLoading(false);
              onError?.();
            }
          });

          widgetIdRef.current = widgetId;
          setIsLoading(false);
          setHasError(false);
          console.log('Turnstile widget rendered with ID:', widgetId);
        } catch (err) {
          console.error('Error rendering Turnstile widget:', err);
          setHasError(true);
          setErrorMessage('Failed to render security verification');
          setIsLoading(false);
        }
      } else if (attempts < maxAttempts) {
        console.log(`Waiting for Turnstile API... attempt ${attempts}/${maxAttempts}`);
        setTimeout(renderWidget, 200);
      } else {
        console.error('Turnstile API not available after maximum attempts');
        setHasError(true);
        setErrorMessage('Security verification unavailable');
        setIsLoading(false);
      }
    };

    setIsLoading(true);
    setHasError(false);
    renderWidget();

    // Cleanup function
    return () => {
      if (widgetIdRef.current && window.turnstile) {
        try {
          window.turnstile.remove(widgetIdRef.current);
          console.log('Turnstile widget cleaned up');
        } catch (err) {
          console.warn('Error cleaning up Turnstile widget:', err);
        }
        widgetIdRef.current = null;
      }
    };
  }, [scriptLoaded, siteKey, theme, size, onVerify, onError, onExpire]);

  const handleRetry = () => {
    setHasError(false);
    setIsLoading(true);
    setErrorMessage('');
    
    // Trigger re-render by changing key state
    setTimeout(() => {
      if (containerRef.current && window.turnstile) {
        // Clean up and re-render
        if (widgetIdRef.current) {
          try {
            window.turnstile.remove(widgetIdRef.current);
          } catch (err) {
            console.warn('Error removing widget during retry:', err);
          }
          widgetIdRef.current = null;
        }
        
        // Force re-render
        setScriptLoaded(false);
        setTimeout(() => setScriptLoaded(true), 100);
      }
    }, 100);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[78px] p-4">
        <div className="flex items-center space-x-2">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
          <span className="text-sm text-muted-foreground">Loading security verification...</span>
        </div>
      </div>
    );
  }

  if (hasError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[78px] p-4 border border-destructive/20 rounded-lg bg-destructive/5">
        <div className="flex items-center space-x-2 mb-2">
          <AlertCircle className="h-4 w-4 text-destructive" />
          <span className="text-sm font-medium text-destructive">Security Verification Error</span>
        </div>
        <p className="text-xs text-muted-foreground text-center mb-3">
          {errorMessage || 'Security verification unavailable'}
        </p>
        <Button
          onClick={handleRetry}
          size="sm"
          variant="outline"
          className="text-xs"
        >
          <RefreshCw className="h-3 w-3 mr-1" />
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-[78px] w-full">
      <div 
        id="turnstile-container"
        ref={containerRef} 
        className="cf-turnstile w-full max-w-sm"
        aria-label="Cloudflare Turnstile security verification"
      />
    </div>
  );
};

export default TurnstileWidget;
