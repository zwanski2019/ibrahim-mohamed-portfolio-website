import { lazy, Suspense } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useMobileOptimizations } from '@/hooks/useMobileOptimizations';

interface MobilePerformanceWrapperProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  enableLazyLoading?: boolean;
}

export function MobilePerformanceWrapper({ 
  children, 
  fallback = <div className="animate-pulse bg-muted h-20 rounded" />,
  enableLazyLoading = true 
}: MobilePerformanceWrapperProps) {
  const isMobile = useIsMobile();
  const { shouldLazyLoad, shouldReduceAnimations } = useMobileOptimizations();

  // Apply mobile-specific optimizations
  const wrapperClass = `
    ${shouldReduceAnimations ? 'reduce-motion' : ''}
    ${isMobile ? 'mobile-optimized' : ''}
  `.trim();

  if (isMobile && shouldLazyLoad && enableLazyLoading) {
    return (
      <div className={wrapperClass}>
        <Suspense fallback={fallback}>
          {children}
        </Suspense>
      </div>
    );
  }

  return <div className={wrapperClass}>{children}</div>;
}