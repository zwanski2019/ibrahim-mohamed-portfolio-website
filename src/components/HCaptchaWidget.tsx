import React, { useEffect, useRef, useState } from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HCaptchaWidgetProps {
  siteKey: string;
  onVerify: (token: string) => void;
  onError?: () => void;
  onExpire?: () => void;
  theme?: 'light' | 'dark' | 'auto';
  size?: 'normal' | 'compact';
}

declare global {
  interface Window {
    hcaptcha?: {
      render: (container: string | HTMLElement, options: any) => string;
      remove: (widgetId: string) => void;
      reset: (widgetId: string) => void;
    };
  }
}

const HCaptchaWidget: React.FC<HCaptchaWidgetProps> = ({
  siteKey,
  onVerify,
  onError,
  onExpire,
  theme = 'dark',
  size = 'normal'
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const widgetIdRef = useRef<string | null>(null);
  const containerIdRef = useRef<string>(`hcaptcha-container-${Math.random().toString(36).substr(2, 9)}`);

  useEffect(() => {
    console.log('🔧 HCaptchaWidget: Initializing with siteKey:', siteKey);
    
    // Reset state
    setIsLoading(true);
    setHasError(false);
    setErrorMessage('');
    
    // Clean up any existing widget first
  if (widgetIdRef.current && window.hcaptcha) {
      try {
        console.log('🧹 Cleaning up existing widget:', widgetIdRef.current);
        window.hcaptcha.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      } catch (err) {
        console.warn('⚠️ Error removing existing widget:', err);
      }
    }

    const ensureScriptAndRender = () => {
      // Check if script exists, if not create it
      if (!document.querySelector('script[src*="hcaptcha.com/1/api.js"]')) {
        console.log('📡 Loading hCaptcha script...');
        const script = document.createElement('script');
        script.src = 'https://js.hcaptcha.com/1/api.js?render=explicit';
        script.async = true;
        script.defer = true;
        (script as HTMLScriptElement).fetchPriority = 'low';
        
        script.onload = () => {
          console.log('✅ hCaptcha script loaded successfully');
          attemptRender();
        };
        
        script.onerror = () => {
          console.error('❌ Failed to load hCaptcha script');
          setHasError(true);
          setErrorMessage('Failed to load security verification script');
          setIsLoading(false);
        };
        
        document.head.appendChild(script);
      } else {
        console.log('✅ hCaptcha script already present');
        attemptRender();
      }
    };

    const attemptRender = () => {
      let attempts = 0;
      const maxAttempts = 30; // Reduced from 50 to 30
      
      const tryRender = () => {
        attempts++;
        console.log(`🎯 Render attempt ${attempts}/${maxAttempts}`);
        
        const container = document.getElementById(containerIdRef.current);
        if (!container) {
          console.error('❌ Container not found:', containerIdRef.current);
          if (attempts < 10) {
            // Retry a few times for container to be ready
            setTimeout(tryRender, 100);
            return;
          } else {
            setHasError(true);
            setErrorMessage('Widget container not found');
            setIsLoading(false);
            return;
          }
        }
        
        if (window.hcaptcha) {
          console.log('🚀 hCaptcha API available, rendering widget...');

          try {
            const widgetId = window.hcaptcha.render(container, {
              sitekey: siteKey,
              theme: theme,
              size: size,
              callback: (token: string) => {
                console.log('✅ hCaptcha verification successful, token received:', token.substring(0, 20) + '...');
                setIsLoading(false);
                setHasError(false);
                onVerify(token);
              },
              'error-callback': (error: any) => {
                console.error('❌ hCaptcha verification error:', error);
                setHasError(true);
                setErrorMessage('Verification failed');
                setIsLoading(false);
                onError?.();
              },
              'expired-callback': () => {
                console.warn('⚠️ hCaptcha token expired');
                onExpire?.();
              },
              'timeout-callback': () => {
                console.warn('⏰ hCaptcha verification timeout');
                setHasError(true);
                setErrorMessage('Verification timed out');
                setIsLoading(false);
                onError?.();
              }
            });
            
            widgetIdRef.current = widgetId;
            setIsLoading(false);
            setHasError(false);
            console.log('🎉 hCaptcha widget rendered successfully with ID:', widgetId);
            
          } catch (err) {
            console.error('❌ Error rendering hCaptcha widget:', err);
            setHasError(true);
            setErrorMessage('Failed to render widget');
            setIsLoading(false);
          }
        } else if (attempts < maxAttempts) {
          console.log(`⏳ hCaptcha API not ready, retrying in 300ms... (${attempts}/${maxAttempts})`);
          setTimeout(tryRender, 300);
        } else {
          console.error('❌ hCaptcha API not available after maximum attempts');
          setHasError(true);
          setErrorMessage('Security verification not available');
          setIsLoading(false);
        }
      };
      
      // Small delay to ensure DOM is ready
      setTimeout(tryRender, 200);
    };

    ensureScriptAndRender();

    // Cleanup function
    return () => {
      if (widgetIdRef.current && window.hcaptcha) {
        try {
          console.log('🧹 Cleaning up widget on unmount:', widgetIdRef.current);
          window.hcaptcha.remove(widgetIdRef.current);
          widgetIdRef.current = null;
        } catch (err) {
          console.warn('⚠️ Error cleaning up widget:', err);
        }
      }
    };
  }, [siteKey, theme, size]);

  const handleRetry = () => {
    console.log('🔄 Retrying hCaptcha widget...');
    setHasError(false);
    setIsLoading(true);
    setErrorMessage('');
    
    // Generate new container ID to avoid conflicts
    containerIdRef.current = `hcaptcha-container-${Math.random().toString(36).substr(2, 9)}`;
    
    // Clean up existing widget and re-initialize
    setTimeout(() => {
      if (widgetIdRef.current && window.hcaptcha) {
        try {
          window.hcaptcha.remove(widgetIdRef.current);
          widgetIdRef.current = null;
        } catch (err) {
          console.warn('⚠️ Error removing widget during retry:', err);
        }
      }
      
      // Re-run the hCaptcha render logic to re-initialize the widget
      const ensureScriptAndRender = () => {
        const attemptRender = () => {
          let attempts = 0;
          const maxAttempts = 50;
          
          const tryRender = () => {
            attempts++;
            console.log(`🎯 Retry render attempt ${attempts}/${maxAttempts}`);
            
            if (window.hcaptcha) {
              console.log('🚀 hCaptcha API available, rendering widget...');
              
              const container = document.getElementById(containerIdRef.current);
              if (!container) {
                console.error('❌ Container not found:', containerIdRef.current);
                setHasError(true);
                setErrorMessage('Widget container not found');
                setIsLoading(false);
                return;
              }

              try {
                const widgetId = window.hcaptcha.render(container, {
                  sitekey: siteKey,
                  theme: theme,
                  size: size,
                  callback: (token: string) => {
                    console.log('✅ hCaptcha verification successful, token received:', token.substring(0, 20) + '...');
                    setIsLoading(false);
                    setHasError(false);
                    onVerify(token);
                  },
                  'error-callback': (error: any) => {
                    console.error('❌ hCaptcha verification error:', error);
                    setHasError(true);
                    setErrorMessage('Verification failed');
                    setIsLoading(false);
                    onError?.();
                  },
                  'expired-callback': () => {
                    console.warn('⚠️ hCaptcha token expired');
                    onExpire?.();
                  },
                  'timeout-callback': () => {
                    console.warn('⏰ hCaptcha verification timeout');
                    setHasError(true);
                    setErrorMessage('Verification timed out');
                    setIsLoading(false);
                    onError?.();
                  }
                });
                
                widgetIdRef.current = widgetId;
                setIsLoading(false);
                setHasError(false);
                console.log('🎉 hCaptcha widget re-rendered successfully with ID:', widgetId);
                
              } catch (err) {
                console.error('❌ Error rendering hCaptcha widget:', err);
                setHasError(true);
                setErrorMessage('Failed to render widget');
                setIsLoading(false);
              }
            } else if (attempts < maxAttempts) {
              console.log(`⏳ hCaptcha API not ready, retrying in 200ms... (${attempts}/${maxAttempts})`);
              setTimeout(tryRender, 200);
            } else {
              console.error('❌ hCaptcha API not available after maximum attempts');
              setHasError(true);
              setErrorMessage('Security verification not available');
              setIsLoading(false);
            }
          };
          
          setTimeout(tryRender, 100);
        };

        attemptRender();
      };

      ensureScriptAndRender();
    }, 100);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[78px] p-4 border border-border rounded-lg bg-muted/10">
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
    <div className="flex justify-center items-center min-h-[78px] w-full p-4">
      <div 
        id={containerIdRef.current}
        className="hcaptcha-widget w-full max-w-sm"
        aria-label="hCaptcha security verification"
      />
    </div>
  );
};

export default HCaptchaWidget;
