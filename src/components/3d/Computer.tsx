
import { useEffect, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useGLTF, Text } from "@react-three/drei";
import * as THREE from "three";
import { useIsMobile } from "@/hooks/use-mobile";

// Type definitions
interface ComputerProps {
  position?: [number, number, number];
  scale?: number | [number, number, number];
}

const Computer = ({ position = [0, 0, 0], scale = 1 }: ComputerProps) => {
  const isMobile = useIsMobile();
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [screenColor, setScreenColor] = useState<THREE.Color>(new THREE.Color("#8B5CF6")); // Initial purple color
  
  // Screen colors rotation
  const screenColors = [
    new THREE.Color("#8B5CF6"), // Purple
    new THREE.Color("#EC4899"), // Pink
    new THREE.Color("#F97316"), // Orange
    new THREE.Color("#0EA5E9"), // Blue
    new THREE.Color("#10B981"), // Green
  ];
  
  const [colorIndex, setColorIndex] = useState(0);
  
  // Monitor screen ref
  const screenRef = useRef<THREE.Mesh>(null);
  const frameRef = useRef<THREE.Mesh>(null);
  const keyboardRef = useRef<THREE.Mesh>(null);
  const mouseRef = useRef<THREE.Mesh>(null);
  
  // Create materials
  const metalFrame = new THREE.MeshStandardMaterial({
    color: "#8E9196",
    metalness: 0.8,
    roughness: 0.2,
  });
  
  const darkPlastic = new THREE.MeshPhysicalMaterial({
    color: "#222222",
    metalness: 0.1,
    roughness: 0.8,
    clearcoat: 0.2,
  });
  
  const screenMaterial = new THREE.MeshPhysicalMaterial({
    color: screenColor,
    emissive: screenColor,
    emissiveIntensity: 0.5,
    roughness: 0.2,
    metalness: 0.0,
    clearcoat: 0.8,
    clearcoatRoughness: 0.2,
  });
  
  const keyboardMaterial = new THREE.MeshPhysicalMaterial({
    color: "#333333",
    metalness: 0.3,
    roughness: 0.7,
    clearcoat: 0.1,
  });
  
  const mouseMaterial = new THREE.MeshPhysicalMaterial({
    color: "#222222",
    metalness: 0.2,
    roughness: 0.5,
    clearcoat: 0.3,
  });
  
  // Handle color change
  const changeScreenColor = () => {
    const newIndex = (colorIndex + 1) % screenColors.length;
    setColorIndex(newIndex);
    setScreenColor(screenColors[newIndex]);
    setClicked(true);
    setTimeout(() => setClicked(false), 300);
  };
  
  // Update screen material when color changes
  useEffect(() => {
    if (screenRef.current) {
      screenMaterial.color = screenColor;
      screenMaterial.emissive = screenColor;
      screenRef.current.material = screenMaterial;
    }
  }, [screenColor]);
  
  // Animation loop
  useFrame((state) => {
    if (groupRef.current) {
      // Add subtle floating animation
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
      
      // Add subtle rotation on hover
      if (hovered && !isMobile) {
        groupRef.current.rotation.y = THREE.MathUtils.lerp(
          groupRef.current.rotation.y,
          Math.sin(state.clock.elapsedTime * 0.5) * 0.1,
          0.05
        );
      }
      
      // Animate on click
      if (clicked) {
        if (screenRef.current) {
          screenRef.current.scale.x = THREE.MathUtils.lerp(
            screenRef.current.scale.x,
            1.05,
            0.1
          );
          screenRef.current.scale.y = THREE.MathUtils.lerp(
            screenRef.current.scale.y,
            1.05,
            0.1
          );
        }
      } else {
        if (screenRef.current) {
          screenRef.current.scale.x = THREE.MathUtils.lerp(
            screenRef.current.scale.x,
            1,
            0.1
          );
          screenRef.current.scale.y = THREE.MathUtils.lerp(
            screenRef.current.scale.y,
            1,
            0.1
          );
        }
      }
    }
  });

  return (
    <group 
      ref={groupRef} 
      position={new THREE.Vector3(...position)} 
      scale={typeof scale === 'number' ? [scale, scale, scale] : scale}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Computer base */}
      <mesh 
        castShadow 
        receiveShadow 
        position={[0, -0.8, 0]} 
        rotation={[0, 0, 0]}
      >
        <boxGeometry args={[1.2, 0.1, 0.8]} />
        <primitive object={darkPlastic} />
      </mesh>
      
      {/* Monitor stand */}
      <mesh 
        castShadow 
        receiveShadow 
        position={[0, -0.4, 0]} 
        rotation={[0, 0, 0]}
      >
        <cylinderGeometry args={[0.1, 0.15, 0.7, 16]} />
        <primitive object={metalFrame} />
      </mesh>
      
      {/* Monitor frame */}
      <mesh 
        ref={frameRef}
        castShadow 
        receiveShadow 
        position={[0, 0.2, 0]} 
        rotation={[0, 0, 0]}
      >
        <boxGeometry args={[1.8, 1.2, 0.1]} />
        <primitive object={metalFrame} />
      </mesh>
      
      {/* Monitor screen (interactive) */}
      <mesh 
        ref={screenRef}
        castShadow 
        position={[0, 0.2, 0.02]} 
        rotation={[0, 0, 0]}
        onClick={changeScreenColor}
      >
        <boxGeometry args={[1.6, 1, 0.05]} />
        <primitive object={screenMaterial} />
      </mesh>
      
      {/* Keyboard */}
      <mesh 
        ref={keyboardRef}
        castShadow 
        receiveShadow 
        position={[0, -0.75, 0.6]} 
        rotation={[0.1, 0, 0]}
      >
        <boxGeometry args={[1, 0.05, 0.4]} />
        <primitive object={keyboardMaterial} />
        
        {/* Keyboard keys (simplified) */}
        <group position={[0, 0.03, 0]}>
          {Array.from({ length: 4 }).map((_, rowIndex) => (
            <group key={`row-${rowIndex}`} position={[0, 0, (rowIndex - 1.5) * 0.08]}>
              {Array.from({ length: 10 }).map((_, colIndex) => (
                <mesh 
                  key={`key-${rowIndex}-${colIndex}`} 
                  position={[(colIndex - 4.5) * 0.09, 0, 0]}
                >
                  <boxGeometry args={[0.07, 0.02, 0.07]} />
                  <meshStandardMaterial color="#444444" />
                </mesh>
              ))}
            </group>
          ))}
        </group>
      </mesh>
      
      {/* Mouse */}
      <mesh 
        ref={mouseRef}
        castShadow 
        receiveShadow 
        position={[0.8, -0.75, 0.6]} 
        rotation={[0, 0, 0]}
      >
        <capsuleGeometry args={[0.08, 0.2, 8, 16]} />
        <primitive object={mouseMaterial} />
        
        {/* Mouse buttons */}
        <group position={[0, 0.03, -0.05]}>
          <mesh position={[-0.03, 0, 0]}>
            <boxGeometry args={[0.06, 0.01, 0.08]} />
            <meshStandardMaterial color="#444444" />
          </mesh>
          <mesh position={[0.03, 0, 0]}>
            <boxGeometry args={[0.06, 0.01, 0.08]} />
            <meshStandardMaterial color="#444444" />
          </mesh>
        </group>
      </mesh>
      
      {/* Screen content (simplified UI) */}
      <group position={[0, 0.2, 0.06]}>
        <mesh>
          <planeGeometry args={[1.5, 0.9]} />
          <meshBasicMaterial 
            color={screenColor} 
            opacity={0.9} 
            transparent 
          />
        </mesh>
        <Text 
          position={[0, 0.2, 0.01]} 
          fontSize={0.08}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          font="/fonts/inter.woff"
        >
          ZWANSKI
        </Text>
        <Text 
          position={[0, 0, 0.01]} 
          fontSize={0.05}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          font="/fonts/inter.woff"
        >
          3D Computer Model
        </Text>
        <Text 
          position={[0, -0.2, 0.01]} 
          fontSize={0.03}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          font="/fonts/inter.woff"
        >
          Click to change colors
        </Text>
      </group>
    </group>
  );
};

export default Computer;
