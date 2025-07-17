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
    // Only run in production
    if (import.meta.env.DEV) return;

    const metrics: PerformanceMetrics = {};

    // Largest Contentful Paint (LCP)
    const observeLCP = () => {
      if ('PerformanceObserver' in window) {
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          metrics.lcp = lastEntry.startTime;
          
          // Log if LCP is poor (>2.5s)
          if (metrics.lcp > 2500) {
            console.warn('Poor LCP detected:', metrics.lcp);
          }
        });
        
        observer.observe({ entryTypes: ['largest-contentful-paint'] });
      }
    };

    // First Input Delay (FID)
    const observeFID = () => {
      if ('PerformanceObserver' in window) {
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry: any) => {
            metrics.fid = entry.processingStart - entry.startTime;
            
            // Log if FID is poor (>100ms)
            if (metrics.fid > 100) {
              console.warn('Poor FID detected:', metrics.fid);
            }
          });
        });
        
        observer.observe({ entryTypes: ['first-input'] });
      }
    };

    // Cumulative Layout Shift (CLS)
    const observeCLS = () => {
      if ('PerformanceObserver' in window) {
        let clsValue = 0;
        
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry: any) => {
            if (!entry.hadRecentInput) {
              clsValue += entry.value;
            }
          });
          
          metrics.cls = clsValue;
          
          // Log if CLS is poor (>0.1)
          if (metrics.cls > 0.1) {
            console.warn('Poor CLS detected:', metrics.cls);
          }
        });
        
        observer.observe({ entryTypes: ['layout-shift'] });
      }
    };

    // First Contentful Paint (FCP)
    const observeFCP = () => {
      if ('PerformanceObserver' in window) {
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry: any) => {
            metrics.fcp = entry.startTime;
            
            // Log if FCP is poor (>1.8s)
            if (metrics.fcp > 1800) {
              console.warn('Poor FCP detected:', metrics.fcp);
            }
          });
        });
        
        observer.observe({ entryTypes: ['paint'] });
      }
    };

    // Time to First Byte (TTFB)
    const observeTTFB = () => {
      if ('PerformanceObserver' in window) {
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry: any) => {
            if (entry.name === window.location.href) {
              metrics.ttfb = entry.responseStart - entry.requestStart;
              
              // Log if TTFB is poor (>800ms)
              if (metrics.ttfb > 800) {
                console.warn('Poor TTFB detected:', metrics.ttfb);
              }
            }
          });
        });
        
        observer.observe({ entryTypes: ['navigation'] });
      }
    };

    // Resource loading performance
    const observeResources = () => {
      if ('PerformanceObserver' in window) {
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry: any) => {
            const duration = entry.duration;
            const size = entry.transferSize || 0;
            
            // Log slow resources (>1s)
            if (duration > 1000) {
              console.warn('Slow resource detected:', {
                name: entry.name,
                duration,
                size
              });
            }
            
            // Log large resources (>1MB)
            if (size > 1024 * 1024) {
              console.warn('Large resource detected:', {
                name: entry.name,
                size: `${(size / 1024 / 1024).toFixed(2)}MB`
              });
            }
          });
        });
        
        observer.observe({ entryTypes: ['resource'] });
      }
    };

    // Long tasks monitoring
    const observeLongTasks = () => {
      if ('PerformanceObserver' in window) {
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry: any) => {
            console.warn('Long task detected:', {
              duration: entry.duration,
              startTime: entry.startTime
            });
          });
        });
        
        observer.observe({ entryTypes: ['longtask'] });
      }
    };

    // Initialize all observers
    observeLCP();
    observeFID();
    observeCLS();
    observeFCP();
    observeTTFB();
    observeResources();
    observeLongTasks();

    // Send metrics to analytics on page unload
    const sendMetrics = () => {
      if (Object.keys(metrics).length > 0) {
        // You can send metrics to your analytics service here
        console.log('Performance Metrics:', metrics);
        
        // Example: Send to Google Analytics
        if ((window as any).gtag) {
          (window as any).gtag('event', 'web_vitals', {
            custom_map: {
              metric_lcp: metrics.lcp,
              metric_fid: metrics.fid,
              metric_cls: metrics.cls,
              metric_fcp: metrics.fcp,
              metric_ttfb: metrics.ttfb
            }
          });
        }
      }
    };

    window.addEventListener('beforeunload', sendMetrics);
    
    // Also send metrics after 10 seconds for single-page apps
    const timeout = setTimeout(sendMetrics, 10000);

    return () => {
      window.removeEventListener('beforeunload', sendMetrics);
      clearTimeout(timeout);
    };
  }, []);
};

// Hook to monitor memory usage
export const useMemoryMonitoring = () => {
  useEffect(() => {
    if (import.meta.env.DEV || !('memory' in performance)) return;

    const checkMemory = () => {
      const memory = (performance as any).memory;
      if (memory) {
        const used = memory.usedJSHeapSize / 1024 / 1024;
        const total = memory.totalJSHeapSize / 1024 / 1024;
        const limit = memory.jsHeapSizeLimit / 1024 / 1024;
        
        // Warn if memory usage is high
        if (used > 100) { // More than 100MB
          console.warn('High memory usage detected:', {
            used: `${used.toFixed(2)}MB`,
            total: `${total.toFixed(2)}MB`,
            limit: `${limit.toFixed(2)}MB`
          });
        }
      }
    };

    const interval = setInterval(checkMemory, 30000); // Check every 30 seconds
    
    return () => clearInterval(interval);
  }, []);
};