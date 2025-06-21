
import React from 'react';
import { Turnstile, TurnstileInstance } from '@marsidev/react-turnstile';

interface TurnstileWidgetProps {
  onVerify: (token: string) => void;
  onError?: (error: string) => void;
  onExpire?: () => void;
  theme?: 'light' | 'dark' | 'auto';
  size?: 'normal' | 'compact';
  className?: string;
}

export const TurnstileWidget = React.forwardRef<TurnstileInstance, TurnstileWidgetProps>(
  ({ onVerify, onError, onExpire, theme = 'auto', size = 'normal', className }, ref) => {
    return (
      <div className={className}>
        <Turnstile
          ref={ref}
          siteKey="0x4AAAAAABhxuYUdORnhPKDe"
          onVerify={onVerify}
          onError={onError}
          onExpire={onExpire}
          options={{
            theme,
            size,
          }}
        />
      </div>
    );
  }
);

TurnstileWidget.displayName = 'TurnstileWidget';
