import React, { useState, useEffect } from 'react';
import { useTheme } from '@/context/ThemeContext';

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const { theme } = useTheme();
  const [isVisible, setIsVisible] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [animationPhase, setAnimationPhase] = useState('initial');

  useEffect(() => {
    // Animation sequence
    const phases = [
      { phase: 'breathing', delay: 500 },
      { phase: 'spinning', delay: 1000 },
      { phase: 'glow', delay: 1500 }
    ];

    let timeouts: NodeJS.Timeout[] = [];

    phases.forEach(({ phase, delay }) => {
      const timeout = setTimeout(() => {
        setAnimationPhase(phase);
      }, delay);
      timeouts.push(timeout);
    });

    // Complete the preloader
    const completeTimeout = setTimeout(() => {
      setIsFadingOut(true);
      setTimeout(() => {
        setIsVisible(false);
        onComplete();
      }, 600); // Smooth fade out duration
    }, 2500); // Total preloader duration
    timeouts.push(completeTimeout);

    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, [onComplete]);

  if (!isVisible) {
    return null;
  }

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-background transition-opacity duration-600 ${
      isFadingOut ? 'opacity-0' : 'opacity-100'
    }`}>
      <div className="relative flex flex-col items-center justify-center space-y-8">
        {/* Main Logo Animation */}
        <div className={`relative transition-all duration-700 ${
          animationPhase === 'breathing' ? 'animate-pulse scale-105' :
          animationPhase === 'spinning' ? 'animate-spin' :
          animationPhase === 'glow' ? 'animate-bounce' : ''
        }`}>
          <div className="text-6xl md:text-8xl font-bold text-center">
            <span className={`inline-block text-primary transition-all duration-500 ${
              animationPhase === 'glow' ? 'drop-shadow-[0_0_20px_hsl(var(--primary))]' : ''
            }`}>
              Z
            </span>
            <span className="text-foreground font-light">wanski</span>
          </div>
          <div className="text-lg md:text-xl text-center text-muted-foreground font-medium mt-2">
            Tech Platform
          </div>
        </div>

        {/* Loading Animation */}
        <div className="flex space-x-2">
          <div className="w-3 h-3 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-3 h-3 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-3 h-3 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>

        {/* Progress Bar */}
        <div className="w-64 h-1 bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary transition-all duration-2000 ease-out"
            style={{ 
              width: animationPhase === 'initial' ? '0%' : 
                     animationPhase === 'breathing' ? '30%' : 
                     animationPhase === 'spinning' ? '70%' : '100%' 
            }}
          ></div>
        </div>

        {/* Subtitle */}
        <div className="text-center space-y-1 opacity-70">
          <p className="text-sm text-muted-foreground">
            Professional IT Services & Digital Education
          </p>
          <p className="text-xs text-muted-foreground">
            Loading your experience...
          </p>
        </div>
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 border border-primary rounded-full animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-24 h-24 border border-primary rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-16 h-16 border border-primary rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>
    </div>
  );
};

export default Preloader;