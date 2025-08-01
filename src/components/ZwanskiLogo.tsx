
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
      className={`flex items-center cursor-pointer transition-all duration-200 hover:scale-105 focus:scale-105 focus:outline-none focus:ring-2 focus:ring-primary/50 rounded-lg p-1 ${className}`}
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
      {/* Logo icon/symbol */}
      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-primary to-primary/70 rounded-lg flex items-center justify-center text-white font-bold text-sm sm:text-base">
        Z
      </div>
      
      {/* Logo text */}
      <div className="ml-2 text-base sm:text-lg md:text-xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent select-none">
        <span className="hidden sm:inline whitespace-nowrap">Zwanski Tech</span>
        <span className="sm:hidden">Tech</span>
      </div>
    </div>
  );
};

export default ZwanskiLogo;
