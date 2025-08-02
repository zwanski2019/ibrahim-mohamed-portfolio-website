import React from "react";

export interface SpacerProps {
  x?: number;
  y?: number;
  className?: string;
}

export function Spacer({ x = 0, y = 0, className }: SpacerProps) {
  return (
    <div 
      className={className}
      style={{
        marginLeft: x ? `${x * 0.25}rem` : undefined,
        marginTop: y ? `${y * 0.25}rem` : undefined,
        display: x || y ? 'block' : 'inline-block'
      }}
    />
  );
}
