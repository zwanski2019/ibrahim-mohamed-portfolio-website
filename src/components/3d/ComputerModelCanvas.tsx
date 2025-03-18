
import { Canvas } from "@react-three/fiber";
import { 
  OrbitControls, 
  ContactShadows, 
  Environment, 
  useGLTF, 
  Sparkles
} from "@react-three/drei";
import { Suspense, useRef, useState } from "react";
import Computer from "./Computer";
import { useIsMobile } from "@/hooks/use-mobile";

const ComputerModelCanvas = () => {
  const isMobile = useIsMobile();
  
  return (
    <Canvas 
      camera={{ position: [0, 0.5, 4], fov: 45 }}
      shadows
      dpr={[1, 2]}
      gl={{ antialias: true }}
    >
      <color attach="background" args={['#0a0a0a']} />
      
      <Suspense fallback={null}>
        <Environment preset="city" />
        
        {/* Main spot light */}
        <spotLight 
          position={[5, 5, 5]} 
          angle={0.15} 
          penumbra={1} 
          intensity={0.5} 
          castShadow 
          shadow-mapSize={1024}
        />
        
        {/* Fill light */}
        <pointLight position={[-5, 5, -5]} intensity={0.5} />
        
        {/* Ambient light for overall scene */}
        <ambientLight intensity={0.4} />
        
        {/* 3D Computer model */}
        <Computer position={[0, 0, 0]} scale={isMobile ? 0.8 : 1} />
        
        {/* Sparkles for visual effect */}
        <Sparkles 
          count={60} 
          scale={10} 
          size={2} 
          speed={0.2} 
          color={"#88ccff"} 
          opacity={0.5}
        />
        
        {/* Contact shadows */}
        <ContactShadows
          position={[0, -1, 0]}
          opacity={0.5}
          scale={10}
          blur={2}
          far={1}
          resolution={256}
          color="#000000"
        />
        
        {/* Orbit controls for interaction */}
        <OrbitControls 
          enablePan={false} 
          enableZoom={true} 
          minPolarAngle={Math.PI / 4} 
          maxPolarAngle={Math.PI / 2} 
          minDistance={3} 
          maxDistance={8}
          dampingFactor={0.1}
          enableDamping={true}
        />
      </Suspense>
    </Canvas>
  );
};

export default ComputerModelCanvas;
