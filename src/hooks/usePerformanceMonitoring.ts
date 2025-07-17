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

    // Use a single timeout to batch performance measurements
    const timeoutId = setTimeout(() => {
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
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, []);
};

// Simplified memory monitoring hook
export const useMemoryMonitoring = () => {
  useEffect(() => {
    if (import.meta.env.DEV) return;

    // Single memory check with timeout
    const timeoutId = setTimeout(() => {
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
    }, 5000);

    return () => clearTimeout(timeoutId);
  }, []);
};