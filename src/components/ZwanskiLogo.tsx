
import React from "react";

interface ZwanskiLogoProps {
  className?: string;
  onClick?: () => void;
}

const ZwanskiLogo: React.FC<ZwanskiLogoProps> = ({ 
  className = "w-10 h-10", 
  onClick 
}) => {
  return (
    <div 
      className={`flex items-center space-x-2 cursor-pointer transition-all duration-200 hover:scale-105 focus:scale-105 focus:outline-none focus:ring-2 focus:ring-primary/50 rounded-lg p-2 -m-2 ${className}`}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.();
        }
      }}
      tabIndex={0}
      role="button"
      aria-label="Navigate to home page"
    >
      <div className="text-lg sm:text-xl md:text-2xl font-bold text-gradient select-none">
        Zwanski Tech
      </div>
    </div>
  );
};

export default ZwanskiLogo;
