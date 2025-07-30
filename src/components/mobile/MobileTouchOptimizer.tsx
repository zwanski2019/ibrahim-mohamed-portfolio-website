import { useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

interface MobileTouchOptimizerProps {
  children: React.ReactNode;
}

export function MobileTouchOptimizer({ children }: MobileTouchOptimizerProps) {
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!isMobile) return;

    // Add mobile-specific touch optimizations
    const addTouchFeedback = (element: HTMLElement) => {
      element.addEventListener('touchstart', () => {
        element.style.transform = 'scale(0.98)';
        element.style.transition = 'transform 0.1s ease';
      }, { passive: true });

      element.addEventListener('touchend', () => {
        element.style.transform = 'scale(1)';
      }, { passive: true });

      element.addEventListener('touchcancel', () => {
        element.style.transform = 'scale(1)';
      }, { passive: true });
    };

    // Apply to all interactive elements
    const interactiveElements = document.querySelectorAll('button, [role="button"], a, input[type="submit"]');
    interactiveElements.forEach((element) => {
      addTouchFeedback(element as HTMLElement);
    });

    // Improve scroll performance
    document.body.style.touchAction = 'manipulation';
    (document.body.style as any).webkitOverflowScrolling = 'touch';

    return () => {
      document.body.style.touchAction = '';
      (document.body.style as any).webkitOverflowScrolling = '';
    };
  }, [isMobile]);

  return <>{children}</>;
}