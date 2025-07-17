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
    // Completely disabled to prevent white screen issues
    // Performance monitoring was causing app startup failures
  }, []);
};

export const useMemoryMonitoring = () => {
  useEffect(() => {
    // Completely disabled to prevent issues
  }, []);
};