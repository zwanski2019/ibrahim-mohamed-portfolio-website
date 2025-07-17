import React, { Suspense, ComponentType } from 'react';
import ErrorBoundary from './ErrorBoundary';

interface LazyRouteProps {
  Component: ComponentType<any>;
  fallback?: React.ReactNode;
}

const LazyRoute: React.FC<LazyRouteProps> = ({ 
  Component, 
  fallback = (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-sm text-muted-foreground">Loading...</p>
      </div>
    </div>
  )
}) => {
  return (
    <ErrorBoundary fallback={
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center p-8">
          <h1 className="text-2xl font-bold mb-4">Zwanski Tech</h1>
          <p className="text-muted-foreground mb-4">Professional IT Services & Digital Education</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90"
          >
            Retry
          </button>
        </div>
      </div>
    }>
      <Suspense fallback={fallback}>
        <Component />
      </Suspense>
    </ErrorBoundary>
  );
};

export default LazyRoute;