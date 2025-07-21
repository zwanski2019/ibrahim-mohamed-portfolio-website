
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
      ready?: (callback: () => void) => void;
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
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [widgetId, setWidgetId] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = 3;

  // Load Turnstile script and render widget
  useEffect(() => {
    console.log('TurnstileWidget: useEffect triggered with siteKey:', siteKey);
    
    if (!siteKey) {
      console.error('TurnstileWidget: No site key provided');
      setHasError(true);
      setErrorMessage('No site key provided');
      setIsLoading(false);
      return;
    }

    const loadScript = () => {
      return new Promise<void>((resolve, reject) => {
        // Check if script is already loaded
        if (window.turnstile) {
          console.log('TurnstileWidget: Script already loaded');
          resolve();
          return;
        }

        // Check if script is already being loaded
        const existingScript = document.querySelector('script[src*="turnstile"]');
        if (existingScript) {
          console.log('TurnstileWidget: Script already loading');
          existingScript.addEventListener('load', () => resolve());
          existingScript.addEventListener('error', reject);
          return;
        }

        console.log('TurnstileWidget: Loading Turnstile script...');
        const script = document.createElement('script');
        script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
        script.async = true;
        script.defer = true;

        script.onload = () => {
          console.log('TurnstileWidget: Script loaded successfully');
          resolve();
        };

        script.onerror = (error) => {
          console.error('TurnstileWidget: Script load error:', error);
          reject(new Error('Failed to load Turnstile script'));
        };

        document.head.appendChild(script);
      });
    };

    const renderWidget = () => {
      if (!containerRef.current || !window.turnstile) {
        console.error('TurnstileWidget: Container or turnstile not available');
        return;
      }

      try {
        console.log('TurnstileWidget: Rendering widget with site key:', siteKey);
        
        const id = window.turnstile.render(containerRef.current, {
          sitekey: siteKey,
          theme,
          size,
          callback: (token: string) => {
            console.log('TurnstileWidget: Verification successful, token received');
            onVerify(token);
          },
          'error-callback': (error: any) => {
            console.error('TurnstileWidget: Verification error:', error);
            setHasError(true);
            setErrorMessage('Verification failed');
            if (onError) onError();
          },
          'expired-callback': () => {
            console.warn('TurnstileWidget: Token expired');
            if (onExpire) onExpire();
          },
          'timeout-callback': () => {
            console.warn('TurnstileWidget: Widget timeout');
            setHasError(true);
            setErrorMessage('Verification timed out');
            if (onError) onError();
          }
        });
        
        setWidgetId(id);
        setIsLoading(false);
        setHasError(false);
        console.log('TurnstileWidget: Widget rendered successfully with ID:', id);
      } catch (err) {
        console.error('TurnstileWidget: Error rendering widget:', err);
        setHasError(true);
        setErrorMessage('Failed to render verification');
        setIsLoading(false);
        if (onError) onError();
      }
    };

    const initializeWidget = async () => {
      try {
        setIsLoading(true);
        setHasError(false);
        
        await loadScript();
        
        // Use a small delay to ensure the script is fully initialized
        setTimeout(() => {
          if (window.turnstile?.ready) {
            window.turnstile.ready(() => {
              renderWidget();
            });
          } else {
            renderWidget();
          }
        }, 100);
        
      } catch (error) {
        console.error('TurnstileWidget: Initialization failed:', error);
        setHasError(true);
        setErrorMessage('Failed to load security verification');
        setIsLoading(false);
      }
    };

    initializeWidget();

    return () => {
      if (widgetId && window.turnstile) {
        try {
          window.turnstile.remove(widgetId);
          console.log('TurnstileWidget: Widget cleaned up');
        } catch (err) {
          console.warn('TurnstileWidget: Error removing widget:', err);
        }
      }
    };
  }, [siteKey, theme, size, onVerify, onError, onExpire, retryCount]);

  const handleRetry = () => {
    if (retryCount < maxRetries) {
      setRetryCount(prev => prev + 1);
      setHasError(false);
      setIsLoading(true);
      if (widgetId && window.turnstile) {
        try {
          window.turnstile.remove(widgetId);
        } catch (err) {
          console.warn('TurnstileWidget: Error removing widget during retry:', err);
        }
      }
      setWidgetId(null);
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[65px] space-x-2">
        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
        <span className="text-sm text-muted-foreground">Loading security verification...</span>
      </div>
    );
  }

  // Error state
  if (hasError) {
    const canRetry = retryCount < maxRetries;
    
    return (
      <div className="flex flex-col items-center justify-center min-h-[65px] p-4 border border-red-200 rounded-lg bg-red-50">
        <div className="flex items-center space-x-2 mb-2">
          <AlertCircle className="h-4 w-4 text-red-600" />
          <span className="text-sm text-red-800">Security Verification Error</span>
        </div>
        <p className="text-xs text-red-700 text-center mb-3">
          {errorMessage || 'Security verification unavailable. Try Again'}
        </p>
        {canRetry ? (
          <Button
            onClick={handleRetry}
            size="sm"
            variant="outline"
            className="text-xs"
          >
            <RefreshCw className="h-3 w-3 mr-1" />
            Try Again ({maxRetries - retryCount} left)
          </Button>
        ) : (
          <div className="text-xs text-red-600 text-center">
            <p>Maximum retries reached.</p>
            <p className="mt-1">Please refresh the page or contact support.</p>
          </div>
        )}
      </div>
    );
  }

  // Success state - render the widget container
  return (
    <div className="flex justify-center items-center min-h-[65px]">
      <div 
        ref={containerRef} 
        className="w-full flex justify-center"
        aria-label="Cloudflare Turnstile verification"
      />
    </div>
  );
};

export default TurnstileWidget;
