
import { useEffect, useCallback } from 'react';

interface DirectLinkAdProps {
  trigger?: 'click' | 'load' | 'timed';
  delay?: number;
  frequency?: 'once' | 'session' | 'always';
  className?: string;
}

const DirectLinkAd = ({ 
  trigger = 'click', 
  delay = 0, 
  frequency = 'session',
  className = ""
}: DirectLinkAdProps) => {
  const directUrl = 'https://www.profitableratecpm.com/hkz91kg1?key=c395a609d0957d16a930a5cf4539ac45';
  
  const shouldTrigger = useCallback(() => {
    const now = Date.now();
    const lastTriggered = localStorage.getItem('directlink-last-triggered');
    const sessionTriggered = sessionStorage.getItem('directlink-session-triggered');
    
    switch (frequency) {
      case 'once':
        return !lastTriggered;
      case 'session':
        return !sessionTriggered;
      case 'always':
        return true;
      default:
        return true;
    }
  }, [frequency]);

  const triggerDirectLink = useCallback(() => {
    if (!shouldTrigger()) return;
    
    const now = Date.now();
    localStorage.setItem('directlink-last-triggered', now.toString());
    sessionStorage.setItem('directlink-session-triggered', 'true');
    
    // Open direct link in new window/tab
    window.open(directUrl, '_blank', 'noopener,noreferrer');
  }, [directUrl, shouldTrigger]);

  const handleClick = useCallback((e: Event) => {
    // Small delay to ensure user's primary action completes first
    setTimeout(() => {
      triggerDirectLink();
    }, 100);
  }, [triggerDirectLink]);

  useEffect(() => {
    if (trigger === 'load') {
      const timer = setTimeout(() => {
        triggerDirectLink();
      }, delay);
      return () => clearTimeout(timer);
    }
    
    if (trigger === 'timed') {
      const timer = setTimeout(() => {
        triggerDirectLink();
      }, delay || 30000); // Default 30 seconds
      return () => clearTimeout(timer);
    }
    
    if (trigger === 'click') {
      // Attach to high-value clicks in the component's area
      const buttons = document.querySelectorAll('button, a[href], .clickable');
      buttons.forEach(button => {
        button.addEventListener('click', handleClick);
      });
      
      return () => {
        buttons.forEach(button => {
          button.removeEventListener('click', handleClick);
        });
      };
    }
  }, [trigger, delay, handleClick, triggerDirectLink]);

  // This component renders nothing - it's purely functional
  return null;
};

export default DirectLinkAd;
