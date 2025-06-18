
import React from "react";

interface ZwanskiLogoProps {
  className?: string;
}

const ZwanskiLogo: React.FC<ZwanskiLogoProps> = ({ className = "w-10 h-10" }) => {
  return (
    <div className="flex items-center space-x-2">
      <div className="text-xl font-bold text-gradient">
        Zwanski Tech
      </div>
    </div>
  );
};

export default ZwanskiLogo;
