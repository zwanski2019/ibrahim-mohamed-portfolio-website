import { useEffect } from 'react';

interface PerformanceMetrics {
  lcp?: number;
  fid?: number;
  cls?: number;
  fcp?: number;
  ttfb?: number;
}

export const usePerformanceMonitoring = () => {
  useEffect(() => {
    // Simplified performance monitoring with minimal overhead
    if (import.meta.env.DEV) return;

    // Use requestIdleCallback for non-critical performance monitoring
    if ('requestIdleCallback' in window) {
      const idleId = requestIdleCallback(() => {
        try {
          if ('performance' in window && 'getEntriesByType' in performance) {
            const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
            if (navigation) {
              const loadTime = navigation.loadEventEnd - navigation.fetchStart;
              if (loadTime > 3000) { // Only log if slow
                console.warn('Slow page load detected:', Math.round(loadTime), 'ms');
              }
            }
          }
        } catch (error) {
          // Silently fail
        }
      }, { timeout: 5000 });

      return () => cancelIdleCallback(idleId);
    }
  }, []);
};

// Simplified memory monitoring hook
export const useMemoryMonitoring = () => {
  useEffect(() => {
    if (import.meta.env.DEV) return;

    // Use requestIdleCallback for memory monitoring
    if ('requestIdleCallback' in window) {
      const idleId = requestIdleCallback(() => {
        try {
          if ('memory' in performance) {
            const memory = (performance as any).memory;
            if (memory?.usedJSHeapSize) {
              const used = memory.usedJSHeapSize / 1024 / 1024;
              if (used > 150) { // Only warn if > 150MB
                console.warn('High memory usage:', Math.round(used), 'MB');
              }
            }
          }
        } catch (error) {
          // Silently fail
        }
      }, { timeout: 10000 });

      return () => cancelIdleCallback(idleId);
    }
  }, []);
};