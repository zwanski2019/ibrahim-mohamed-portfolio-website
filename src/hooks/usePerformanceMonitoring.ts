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
    // Ultra-lightweight performance monitoring with Web Worker fallback
    if (import.meta.env.DEV) return;
    
    // Sample only 2% of users to minimize overhead
    if (Math.random() > 0.02) return;

    let worker: Worker | null = null;
    
    // Try to use Web Worker for heavy lifting
    try {
      worker = new Worker('/performance-worker.js');
      worker.postMessage({ type: 'START_MONITORING' });
    } catch (error) {
      // Fallback to minimal main thread monitoring
      const timeoutId = setTimeout(() => {
        try {
          if ('performance' in window && 'getEntriesByType' in performance) {
            const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
            if (navigation && navigation.loadEventEnd > 0) {
              const loadTime = navigation.loadEventEnd - navigation.fetchStart;
              // Only report if performance is concerning
              if (loadTime > 4000) {
                console.debug('Performance concern:', Math.round(loadTime), 'ms');
              }
            }
          }
        } catch (error) {
          // Silently fail to avoid any user impact
        }
      }, 3000);

      return () => clearTimeout(timeoutId);
    }

    return () => {
      if (worker) {
        worker.postMessage({ type: 'STOP_MONITORING' });
        worker.terminate();
      }
    };
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