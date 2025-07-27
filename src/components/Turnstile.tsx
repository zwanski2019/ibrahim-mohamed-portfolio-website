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
      if (
        document.querySelector(
          "script[src='https://challenges.cloudflare.com/turnstile/v0/api.js']"
        )
      ) {
        renderWidget();
        return;
      }

      const script = document.createElement("script");
      script.src =
        "https://challenges.cloudflare.com/turnstile/v0/api.js";
      script.async = true;
      script.onload = renderWidget;
      script.onerror = () => onError?.();
      document.body.appendChild(script);
    };

    const renderWidget = () => {
      if (!window.turnstile) {
        setTimeout(renderWidget, 200);
        return;
      }

      try {
        widgetIdRef.current = window.turnstile!.render(
          `#${containerId.current}`,
          {
            sitekey: siteKey,
            callback: (token: string) => onVerify(token),
            "error-callback": onError,
            "expired-callback": onExpire,
          }
        );
      } catch {
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
