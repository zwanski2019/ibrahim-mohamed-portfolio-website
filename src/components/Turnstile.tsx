import React, { useEffect, useRef } from "react";

export interface TurnstileProps {
  siteKey: string;
  onVerify: (token: string) => void;
  onError?: () => void;
  onExpire?: () => void;
}

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: string | HTMLElement,
        options: Record<string, unknown>
      ) => string;
      remove: (widgetId: string) => void;
    };
  }
}

const Turnstile: React.FC<TurnstileProps> = ({
  siteKey,
  onVerify,
  onError,
  onExpire,
}) => {
  const widgetIdRef = useRef<string | null>(null);
  const containerId = useRef(
    `cf-turnstile-${Math.random().toString(36).slice(2)}`
  );

  useEffect(() => {
    const loadScript = () => {
      console.log("Loading Turnstile script...");
      
      if (
        document.querySelector(
          "script[src='https://challenges.cloudflare.com/turnstile/v0/api.js']"
        )
      ) {
        console.log("Turnstile script already loaded");
        renderWidget();
        return;
      }

      console.log("Creating new Turnstile script element");
      const script = document.createElement("script");
      script.src =
        "https://challenges.cloudflare.com/turnstile/v0/api.js";
      script.async = true;
      script.onload = () => {
        console.log("Turnstile script loaded successfully");
        renderWidget();
      };
      script.onerror = (error) => {
        console.error("Failed to load Turnstile script:", error);
        onError?.();
      };
      document.body.appendChild(script);
    };

    const renderWidget = () => {
      console.log("Attempting to render Turnstile widget...", { 
        turnstileAvailable: !!window.turnstile,
        containerId: containerId.current 
      });
      
      if (!window.turnstile) {
        console.log("Turnstile not available, retrying in 200ms...");
        setTimeout(renderWidget, 200);
        return;
      }

      try {
        console.log("Rendering Turnstile with siteKey:", siteKey);
        widgetIdRef.current = window.turnstile!.render(
          `#${containerId.current}`,
          {
            sitekey: siteKey,
            callback: (token: string) => {
              console.log("Turnstile token received:", token ? "TOKEN_RECEIVED" : "NO_TOKEN");
              onVerify(token);
            },
            "error-callback": (error: any) => {
              console.error("Turnstile error:", error);
              onError?.();
            },
            "expired-callback": () => {
              console.log("Turnstile token expired");
              onExpire?.();
            },
          }
        );
        console.log("Turnstile widget rendered with ID:", widgetIdRef.current);
      } catch (error) {
        console.error("Error rendering Turnstile widget:", error);
        onError?.();
      }
    };

    loadScript();

    return () => {
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    };
  }, [siteKey, onVerify, onError, onExpire]);

  return <div id={containerId.current} className="cf-turnstile" />;
};

export default Turnstile;
