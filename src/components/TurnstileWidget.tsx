
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { AlertCircle, RefreshCw, Wifi, WifiOff } from 'lucide-react';
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
    turnstileLoadPromise?: Promise<void>;
  }
}

type LoadingState = 'idle' | 'loading' | 'loaded' | 'error' | 'timeout' | 'network-error';
type ErrorType = 'script-load' | 'widget-render' | 'verification' | 'network' | 'timeout' | 'csp-blocked';

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
  const [loadingState, setLoadingState] = useState<LoadingState>('idle');
  const [errorType, setErrorType] = useState<ErrorType | null>(null);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [retryCount, setRetryCount] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout>();
  const maxRetries = 3;

  // Network status monitoring
  useEffect(() => {
    const handleOnline = () => {
      console.log('TurnstileWidget: Network back online');
      setIsOnline(true);
      if (loadingState === 'network-error') {
        handleRetry();
      }
    };
    
    const handleOffline = () => {
      console.log('TurnstileWidget: Network went offline');
      setIsOnline(false);
      setLoadingState('network-error');
      setErrorType('network');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [loadingState]);

  // CSP and Ad-blocker detection
  const detectBlockingIssues = useCallback(() => {
    // Check if script is blocked by CSP or ad-blockers
    const testScript = document.createElement('script');
    testScript.src = 'data:application/javascript,';
    testScript.onerror = () => {
      console.warn('TurnstileWidget: Potential CSP or ad-blocker detected');
      setErrorType('csp-blocked');
    };
    document.head.appendChild(testScript);
    document.head.removeChild(testScript);
  }, []);

  // Enhanced script loading with singleton pattern
  const loadTurnstileScript = useCallback((): Promise<void> => {
    if (window.turnstileLoadPromise) {
      console.log('TurnstileWidget: Using existing script load promise');
      return window.turnstileLoadPromise;
    }

    if (window.turnstile) {
      console.log('TurnstileWidget: Script already loaded');
      return Promise.resolve();
    }

    console.log('TurnstileWidget: Loading Turnstile script...');
    setLoadingState('loading');
    
    window.turnstileLoadPromise = new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
      script.async = true;
      script.defer = true;
      
      // Set timeout for script loading
      const loadTimeout = setTimeout(() => {
        console.error('TurnstileWidget: Script load timeout');
        setLoadingState('timeout');
        setErrorType('timeout');
        reject(new Error('Script load timeout'));
      }, 10000);

      script.onload = () => {
        clearTimeout(loadTimeout);
        console.log('TurnstileWidget: Script loaded successfully');
        setLoadingState('loaded');
        resolve();
      };

      script.onerror = (error) => {
        clearTimeout(loadTimeout);
        console.error('TurnstileWidget: Script load error:', error);
        setLoadingState('error');
        setErrorType('script-load');
        detectBlockingIssues();
        reject(error);
      };

      document.head.appendChild(script);
    });

    return window.turnstileLoadPromise;
  }, [detectBlockingIssues]);

  // Widget rendering with enhanced error handling
  const renderWidget = useCallback(() => {
    if (!containerRef.current || !window.turnstile || !siteKey || widgetId) {
      return;
    }

    try {
      console.log('TurnstileWidget: Rendering widget with site key:', siteKey);
      
      const id = window.turnstile.render(containerRef.current, {
        sitekey: siteKey,
        theme,
        size,
        callback: (token: string) => {
          console.log('TurnstileWidget: Verification successful');
          onVerify(token);
        },
        'error-callback': (error: any) => {
          console.error('TurnstileWidget: Verification error:', error);
          setErrorType('verification');
          if (onError) onError();
        },
        'expired-callback': () => {
          console.warn('TurnstileWidget: Token expired');
          if (onExpire) onExpire();
        },
        'timeout-callback': () => {
          console.warn('TurnstileWidget: Widget timeout');
          setErrorType('timeout');
          if (onError) onError();
        }
      });
      
      setWidgetId(id);
      console.log('TurnstileWidget: Widget rendered successfully with ID:', id);
    } catch (err) {
      console.error('TurnstileWidget: Error rendering widget:', err);
      setLoadingState('error');
      setErrorType('widget-render');
      if (onError) onError();
    }
  }, [siteKey, theme, size, onVerify, onError, onExpire, widgetId]);

  // Retry mechanism
  const handleRetry = useCallback(() => {
    if (retryCount >= maxRetries) {
      console.error('TurnstileWidget: Max retries reached');
      return;
    }

    console.log(`TurnstileWidget: Retry attempt ${retryCount + 1}/${maxRetries}`);
    setRetryCount(prev => prev + 1);
    setLoadingState('idle');
    setErrorType(null);
    
    // Clear existing widget
    if (widgetId && window.turnstile) {
      try {
        window.turnstile.remove(widgetId);
      } catch (err) {
        console.warn('TurnstileWidget: Error removing widget:', err);
      }
    }
    setWidgetId(null);
  }, [retryCount, widgetId]);

  // Main initialization effect
  useEffect(() => {
    if (!siteKey) {
      console.warn('TurnstileWidget: No site key provided');
      setLoadingState('error');
      setErrorType('script-load');
      return;
    }

    if (!isOnline) {
      setLoadingState('network-error');
      setErrorType('network');
      return;
    }

    const initializeWidget = async () => {
      try {
        await loadTurnstileScript();
        
        // Use Turnstile's ready callback if available
        if (window.turnstile?.ready) {
          window.turnstile.ready(() => {
            renderWidget();
          });
        } else {
          renderWidget();
        }
      } catch (error) {
        console.error('TurnstileWidget: Initialization failed:', error);
        setLoadingState('error');
      }
    };

    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set overall timeout
    timeoutRef.current = setTimeout(() => {
      if (loadingState === 'loading') {
        console.error('TurnstileWidget: Overall timeout reached');
        setLoadingState('timeout');
        setErrorType('timeout');
      }
    }, 15000);

    initializeWidget();

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      
      if (widgetId && window.turnstile) {
        try {
          window.turnstile.remove(widgetId);
        } catch (err) {
          console.warn('TurnstileWidget: Error removing widget on cleanup:', err);
        }
      }
    };
  }, [siteKey, isOnline, retryCount, loadTurnstileScript, renderWidget]);

  // Error message component
  const getErrorMessage = () => {
    switch (errorType) {
      case 'network':
        return 'No internet connection. Please check your network.';
      case 'timeout':
        return 'Loading timed out. Please try again.';
      case 'script-load':
        return 'Failed to load security verification. Please refresh the page.';
      case 'widget-render':
        return 'Failed to initialize security verification.';
      case 'verification':
        return 'Security verification failed. Please try again.';
      case 'csp-blocked':
        return 'Security verification blocked. Please disable ad-blockers.';
      default:
        return 'Security verification unavailable.';
    }
  };

  // Loading state
  if (loadingState === 'loading') {
    return (
      <div className="flex justify-center items-center min-h-[65px] space-x-2">
        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
        <span className="text-sm text-muted-foreground">Loading security verification...</span>
      </div>
    );
  }

  // Network error state
  if (loadingState === 'network-error') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[65px] p-4 border border-yellow-200 rounded-lg bg-yellow-50">
        <div className="flex items-center space-x-2 mb-2">
          <WifiOff className="h-4 w-4 text-yellow-600" />
          <span className="text-sm text-yellow-800">No Internet Connection</span>
        </div>
        <p className="text-xs text-yellow-700 text-center mb-3">
          Please check your internet connection and try again.
        </p>
        <Button
          onClick={handleRetry}
          size="sm"
          variant="outline"
          className="text-xs"
          disabled={!isOnline}
        >
          <Wifi className="h-3 w-3 mr-1" />
          Retry when online
        </Button>
      </div>
    );
  }

  // Error states with retry option
  if (loadingState === 'error' || loadingState === 'timeout') {
    const canRetry = retryCount < maxRetries;
    
    return (
      <div className="flex flex-col items-center justify-center min-h-[65px] p-4 border border-red-200 rounded-lg bg-red-50">
        <div className="flex items-center space-x-2 mb-2">
          <AlertCircle className="h-4 w-4 text-red-600" />
          <span className="text-sm text-red-800">Security Verification Error</span>
        </div>
        <p className="text-xs text-red-700 text-center mb-3">
          {getErrorMessage()}
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
