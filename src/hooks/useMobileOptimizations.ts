import { useEffect, useState } from 'react';
import { useIsMobile } from './use-mobile';

interface MobileOptimizations {
  shouldLazyLoad: boolean;
  shouldReduceAnimations: boolean;
  shouldOptimizeImages: boolean;
  connectionType: string;
}

export function useMobileOptimizations(): MobileOptimizations {
  const isMobile = useIsMobile();
  const [connectionType, setConnectionType] = useState('4g');
  const [shouldReduceAnimations, setShouldReduceAnimations] = useState(false);

  useEffect(() => {
    if (!isMobile) return;

    // Detect connection type for mobile optimization
    const connection = (navigator as any).connection;
    if (connection) {
      setConnectionType(connection.effectiveType || '4g');
      
      // Reduce animations on slow connections
      if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
        setShouldReduceAnimations(true);
      }
    }

    // Detect if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    setShouldReduceAnimations(prefersReducedMotion.matches);

  }, [isMobile]);

  return {
    shouldLazyLoad: isMobile,
    shouldReduceAnimations,
    shouldOptimizeImages: isMobile,
    connectionType
  };
}