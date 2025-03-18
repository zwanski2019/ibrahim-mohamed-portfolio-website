
import React from "react";

interface ZwanskiLogoProps {
  className?: string;
}

const ZwanskiLogo: React.FC<ZwanskiLogoProps> = ({ className = "w-10 h-10" }) => {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="zwanski-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(var(--primary))" />
          <stop offset="100%" stopColor="hsl(var(--secondary))" />
        </linearGradient>
      </defs>
      
      {/* Background */}
      <circle cx="50" cy="50" r="45" fill="url(#zwanski-gradient)" />
      
      {/* Letter Z */}
      <g fill="white">
        <path d="M30 30H70V40H45L70 70H30V60H55L30 30Z" />
        <circle cx="70" cy="30" r="5" />
        <circle cx="30" cy="70" r="5" />
      </g>
    </svg>
  );
};

export default ZwanskiLogo;
