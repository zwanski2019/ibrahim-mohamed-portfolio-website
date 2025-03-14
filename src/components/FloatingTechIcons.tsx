
import React from "react";
import { motion } from "framer-motion";
import {
  Code,
  Braces,
  Cpu,
  Database,
  FileCode,
  FileJson,
  Frame,
  Github,
  Globe,
  Layers,
  LayoutGrid,
  Rocket,
  Server,
  Terminal
} from "lucide-react";

interface TechIconProps {
  icon: React.ReactNode;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
}

const TechIcon: React.FC<TechIconProps> = ({ icon, x, y, size, delay, duration }) => {
  return (
    <motion.div
      className="absolute text-primary/70 backdrop-blur-sm bg-background/30 rounded-full p-2 shadow-sm border border-primary/20"
      style={{ width: size, height: size }}
      initial={{ opacity: 0, x, y }}
      animate={{
        opacity: [0, 1, 1, 0],
        x: [x, x + 20, x - 20, x],
        y: [y, y - 20, y + 20, y],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        repeatType: "loop",
      }}
    >
      {icon}
    </motion.div>
  );
};

const FloatingTechIcons: React.FC = () => {
  // Array of tech icons with their positions and animation settings
  const techIcons = [
    { Icon: Code, x: -80, y: 0, size: 36, delay: 0, duration: 8 },
    { Icon: Database, x: -40, y: -100, size: 32, delay: 1, duration: 7 },
    { Icon: Globe, x: 60, y: -80, size: 40, delay: 2, duration: 9 },
    { Icon: FileJson, x: 120, y: 20, size: 30, delay: 3, duration: 8.5 },
    { Icon: Terminal, x: 90, y: 100, size: 35, delay: 4, duration: 7.5 },
    { Icon: Server, x: -60, y: 120, size: 34, delay: 5, duration: 8 },
    { Icon: Braces, x: -140, y: -40, size: 38, delay: 6, duration: 9 },
    { Icon: LayoutGrid, x: 140, y: -60, size: 32, delay: 7, duration: 7 },
    { Icon: Github, x: -120, y: 60, size: 36, delay: 8, duration: 8.5 },
    { Icon: Cpu, x: 0, y: -130, size: 30, delay: 9, duration: 9 },
    { Icon: Rocket, x: 120, y: -120, size: 34, delay: 10, duration: 8 },
    { Icon: Frame, x: -130, y: -110, size: 32, delay: 11, duration: 7.5 },
    { Icon: Layers, x: 50, y: 130, size: 38, delay: 12, duration: 9 },
    { Icon: FileCode, x: -40, y: 80, size: 33, delay: 13, duration: 8.2 },
  ];

  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      {techIcons.map((icon, index) => (
        <TechIcon
          key={index}
          icon={<icon.Icon className="w-full h-full" />}
          x={icon.x}
          y={icon.y}
          size={icon.size}
          delay={icon.delay * 0.5}
          duration={icon.duration}
        />
      ))}
    </div>
  );
};

export default FloatingTechIcons;
