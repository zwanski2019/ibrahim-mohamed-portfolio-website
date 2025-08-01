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
      className={`flex items-center justify-start cursor-pointer transition-all duration-200 hover:scale-105 focus:scale-105 focus:outline-none focus:ring-2 focus:ring-primary/50 rounded-lg py-1 px-2 ${className}`} 
      onClick={onClick} 
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.();
        }
      }} 
      tabIndex={0} 
      role="button" 
      aria-label="Navigate to home page"
    >
      {/* Logo text with proper alignment */}
      <div className="flex items-center justify-center min-w-0">
        <span className="text-sm sm:text-base md:text-lg lg:text-xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent select-none whitespace-nowrap">
          <span className="hidden xs:inline">Zwanski Tech</span>
          <span className="xs:hidden">ZT</span>
        </span>
      </div>
    </div>
  );
};
export default ZwanskiLogo;