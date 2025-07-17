import React, { useState, useEffect } from 'react';
import { useTheme } from '@/context/ThemeContext';

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const { theme } = useTheme();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 500); // Wait for fade out animation
    }, 2000); // Show preloader for 2 seconds

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!isVisible) {
    return (
      <div className="preloader-container fade-out">
        <div className="preloader-content">
          <div className="preloader-logo">
            <div className="logo-text">
              <span className="logo-z">Z</span>
              <span className="logo-full">wanski Tech</span>
            </div>
          </div>
          <div className="preloader-spinner">
            <div className="spinner-ring"></div>
            <div className="spinner-ring"></div>
            <div className="spinner-ring"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="preloader-container">
      <div className="preloader-content">
        <div className="preloader-logo">
          <div className="logo-text">
            <span className="logo-z">Z</span>
            <span className="logo-full">wanski Tech</span>
          </div>
        </div>
        <div className="preloader-spinner">
          <div className="spinner-ring"></div>
          <div className="spinner-ring"></div>
          <div className="spinner-ring"></div>
        </div>
      </div>
    </div>
  );
};

export default Preloader;