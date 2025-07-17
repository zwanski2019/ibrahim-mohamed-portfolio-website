// Performance monitoring and Core Web Vitals tracking
import { onCLS, onINP, onFCP, onLCP, onTTFB } from 'web-vitals';

export interface PerformanceMetric {
  name: string;
  value: number;
  delta: number;
  id: string;
  rating: 'good' | 'needs-improvement' | 'poor';
}

export interface PerformanceBudget {
  LCP: number; // Largest Contentful Paint
  FID: number; // First Input Delay
  CLS: number; // Cumulative Layout Shift
  FCP: number; // First Contentful Paint
  TTFB: number; // Time to First Byte
}

// Performance budgets (in ms for timing metrics, score for CLS)
const PERFORMANCE_BUDGET: PerformanceBudget = {
  LCP: 2500,  // Good: ≤2.5s
  FID: 100,   // Good: ≤100ms
  CLS: 0.1,   // Good: ≤0.1
  FCP: 1800,  // Good: ≤1.8s
  TTFB: 800   // Good: ≤800ms
};

class PerformanceMonitor {
  private metrics: Map<string, PerformanceMetric> = new Map();
  private observers: PerformanceObserver[] = [];

  constructor() {
    this.initializeCoreWebVitals();
    this.initializeCustomMetrics();
    this.setupErrorTracking();
  }

  private initializeCoreWebVitals() {
    const sendToAnalytics = (metric: PerformanceMetric) => {
      this.metrics.set(metric.name, metric);
      this.checkBudget(metric);
      this.sendMetric(metric);
    };

    // Core Web Vitals
    onCLS(sendToAnalytics);
    onINP(sendToAnalytics);
    onFCP(sendToAnalytics);
    onLCP(sendToAnalytics);
    onTTFB(sendToAnalytics);
  }

  private initializeCustomMetrics() {
    // Navigation timing
    if ('PerformanceObserver' in window) {
      const navObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'navigation') {
            const navEntry = entry as PerformanceNavigationTiming;
            
            // DOM Content Loaded
            const dcl = navEntry.domContentLoadedEventEnd - navEntry.domContentLoadedEventStart;
            this.recordCustomMetric('DCL', dcl);

            // Page Load Time
            const loadTime = navEntry.loadEventEnd - navEntry.loadEventStart;
            this.recordCustomMetric('LoadTime', loadTime);

            // DNS Lookup Time
            const dnsTime = navEntry.domainLookupEnd - navEntry.domainLookupStart;
            this.recordCustomMetric('DNSTime', dnsTime);
          }
        }
      });

      navObserver.observe({ entryTypes: ['navigation'] });
      this.observers.push(navObserver);
    }

    // Resource timing
    if ('PerformanceObserver' in window) {
      const resourceObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'resource') {
            const resourceEntry = entry as PerformanceResourceTiming;
            
            // Track slow resources
            if (resourceEntry.duration > 1000) {
              this.recordCustomMetric('SlowResource', resourceEntry.duration, {
                name: resourceEntry.name,
                type: this.getResourceType(resourceEntry.name)
              });
            }
          }
        }
      });

      resourceObserver.observe({ entryTypes: ['resource'] });
      this.observers.push(resourceObserver);
    }
  }

  private setupErrorTracking() {
    // JavaScript errors
    window.addEventListener('error', (event) => {
      this.recordError({
        type: 'javascript',
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        stack: event.error?.stack
      });
    });

    // Promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      this.recordError({
        type: 'promise',
        message: event.reason?.message || 'Unhandled promise rejection',
        stack: event.reason?.stack
      });
    });
  }

  private recordCustomMetric(name: string, value: number, metadata?: any) {
    const metric: PerformanceMetric = {
      name,
      value,
      delta: value,
      id: this.generateId(),
      rating: this.getRating(name, value),
      ...metadata
    };

    this.metrics.set(name, metric);
    this.sendMetric(metric);
  }

  private recordError(error: any) {
    // Send error to monitoring service
    this.sendToMonitoring('error', error);
  }

  private checkBudget(metric: PerformanceMetric) {
    const budget = PERFORMANCE_BUDGET[metric.name as keyof PerformanceBudget];
    if (budget && metric.value > budget) {
      console.warn(`Performance budget exceeded for ${metric.name}: ${metric.value} > ${budget}`);
      this.sendAlert(metric, budget);
    }
  }

  private getRating(name: string, value: number): 'good' | 'needs-improvement' | 'poor' {
    const thresholds = {
      LCP: { good: 2500, poor: 4000 },
      FID: { good: 100, poor: 300 },
      CLS: { good: 0.1, poor: 0.25 },
      FCP: { good: 1800, poor: 3000 },
      TTFB: { good: 800, poor: 1800 }
    };

    const threshold = thresholds[name as keyof typeof thresholds];
    if (!threshold) return 'good';

    if (value <= threshold.good) return 'good';
    if (value <= threshold.poor) return 'needs-improvement';
    return 'poor';
  }

  private getResourceType(url: string): string {
    if (url.match(/\.(js|jsx|ts|tsx)$/)) return 'script';
    if (url.match(/\.(css|scss|sass)$/)) return 'stylesheet';
    if (url.match(/\.(jpg|jpeg|png|gif|webp|svg)$/)) return 'image';
    if (url.match(/\.(woff|woff2|ttf|eot)$/)) return 'font';
    return 'other';
  }

  private generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  private sendMetric(metric: PerformanceMetric) {
    // Send to analytics service (Google Analytics, etc.)
    if (typeof window !== 'undefined' && 'gtag' in window) {
      (window as any).gtag('event', 'web_vitals', {
        event_category: 'Performance',
        event_label: metric.name,
        value: Math.round(metric.value),
        custom_map: { metric_rating: metric.rating }
      });
    }

    // Send to custom analytics
    this.sendToMonitoring('metric', metric);
  }

  private sendAlert(metric: PerformanceMetric, budget: number) {
    this.sendToMonitoring('alert', {
      type: 'performance_budget_exceeded',
      metric: metric.name,
      value: metric.value,
      budget,
      timestamp: Date.now()
    });
  }

  private sendToMonitoring(type: string, data: any) {
    // Send to monitoring service (implement based on your monitoring solution)
    if (process.env.NODE_ENV === 'development') {
      console.log(`[Performance Monitor] ${type}:`, data);
    }

    // Example: Send to custom endpoint
    try {
      fetch('/api/monitoring', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, data, timestamp: Date.now() })
      }).catch(() => {
        // Silently fail in monitoring to avoid affecting user experience
      });
    } catch (error) {
      // Silently fail
    }
  }

  public getMetrics(): Map<string, PerformanceMetric> {
    return new Map(this.metrics);
  }

  public destroy() {
    this.observers.forEach(observer => observer.disconnect());
    this.observers = [];
    this.metrics.clear();
  }
}

// Export singleton instance
export const performanceMonitor = new PerformanceMonitor();

// Utility function to measure custom operations
export function measureOperation<T>(name: string, operation: () => T): T {
  const start = performance.now();
  const result = operation();
  const duration = performance.now() - start;
  
  performanceMonitor['recordCustomMetric'](name, duration);
  return result;
}

// Utility function to measure async operations
export async function measureAsyncOperation<T>(name: string, operation: () => Promise<T>): Promise<T> {
  const start = performance.now();
  const result = await operation();
  const duration = performance.now() - start;
  
  performanceMonitor['recordCustomMetric'](name, duration);
  return result;
}