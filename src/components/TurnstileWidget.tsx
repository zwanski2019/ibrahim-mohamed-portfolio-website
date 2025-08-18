import React from 'react';
import { Turnstile } from '@marsidev/react-turnstile';

interface TurnstileWidgetProps {
  onVerify: (token: string) => void;
  onError?: () => void;
  className?: string;
}

export const TurnstileWidget: React.FC<TurnstileWidgetProps> = ({
  onVerify,
  onError,
  className = ''
}) => {
  const siteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY;

  if (!siteKey) {
    console.error('Turnstile site key not configured');
    return (
      <div className={`p-4 border border-destructive/20 rounded-md bg-destructive/5 ${className}`}>
        <p className="text-sm text-destructive">Security verification unavailable</p>
      </div>
    );
  }

  return (
    <div className={className}>
      <Turnstile
        siteKey={siteKey}
        onSuccess={onVerify}
        onError={onError}
      />
    </div>
  );
};

export default TurnstileWidget;