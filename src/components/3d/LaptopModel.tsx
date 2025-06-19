
import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import * as THREE from 'three'

const LaptopModel = () => {
  const laptopGroupRef = useRef<THREE.Group>(null)
  const screenRef = useRef<THREE.Group>(null)
  const [lidOpen, setLidOpen] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  useFrame((state) => {
    if (laptopGroupRef.current && !isHovered) {
      laptopGroupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
    }
    
    // Animate lid opening/closing
    if (screenRef.current) {
      const targetRotation = lidOpen ? -Math.PI * 0.45 : 0
      screenRef.current.rotation.x += (targetRotation - screenRef.current.rotation.x) * 0.1
    }
  })

  const handleLaptopClick = () => {
    setLidOpen(!lidOpen)
  }

  return (
    <group 
      ref={laptopGroupRef}
      onClick={handleLaptopClick}
      onPointerOver={() => setIsHovered(true)}
      onPointerOut={() => setIsHovered(false)}
      scale={isHovered ? 1.05 : 1}
    >
      {/* Laptop Base */}
      <mesh position={[0, -0.05, 0]} castShadow receiveShadow>
        <boxGeometry args={[4, 0.15, 2.8]} />
        <meshPhysicalMaterial 
          color="#2a2a2a" 
          metalness={0.8} 
          roughness={0.2}
          clearcoat={0.1}
        />
      </mesh>

      {/* Keyboard Area */}
      <mesh position={[0, 0.08, 0.3]} castShadow>
        <boxGeometry args={[3.5, 0.02, 2]} />
        <meshPhysicalMaterial color="#1a1a1a" roughness={0.8} />
      </mesh>

      {/* Individual Keys */}
      {Array.from({ length: 15 }).map((_, i) => 
        Array.from({ length: 5 }).map((_, j) => (
          <mesh 
            key={`key-${i}-${j}`}
            position={[-1.5 + (i * 0.2), 0.12, -0.3 + (j * 0.2)]}
            castShadow
          >
            <boxGeometry args={[0.15, 0.03, 0.15]} />
            <meshPhysicalMaterial color="#333" roughness={0.6} />
          </mesh>
        ))
      )}

      {/* Trackpad */}
      <mesh position={[0, 0.1, 0.8]} castShadow>
        <boxGeometry args={[1.2, 0.01, 0.8]} />
        <meshPhysicalMaterial color="#1a1a1a" roughness={0.3} metalness={0.1} />
      </mesh>

      {/* Screen Group (rotates for lid opening) */}
      <group ref={screenRef} position={[0, 0.075, -1.35]}>
        {/* Screen Back */}
        <mesh position={[0, 1.2, -0.05]} castShadow>
          <boxGeometry args={[4, 2.4, 0.1]} />
          <meshPhysicalMaterial 
            color="#2a2a2a" 
            metalness={0.8} 
            roughness={0.2}
          />
        </mesh>

        {/* Screen Bezel */}
        <mesh position={[0, 1.2, 0.01]}>
          <boxGeometry args={[3.8, 2.2, 0.02]} />
          <meshPhysicalMaterial color="#000" roughness={0.9} />
        </mesh>

        {/* Active Screen */}
        <mesh position={[0, 1.2, 0.02]}>
          <boxGeometry args={[3.6, 2, 0.001]} />
          <meshBasicMaterial color="#0a0a2e" />
        </mesh>

        {/* Screen Content - Only show when lid is open */}
        {lidOpen && (
          <>
            {/* Terminal-style content */}
            <Text
              position={[-1.5, 1.6, 0.025]}
              fontSize={0.08}
              color="#00ff88"
              anchorX="left"
              anchorY="top"
              maxWidth={3}
              font="/fonts/monospace.woff"
            >
              {'> ZWANSKI TECH SYSTEMS'}
            </Text>

            <Text
              position={[-1.5, 1.4, 0.025]}
              fontSize={0.06}
              color="#ffffff"
              anchorX="left"
              anchorY="top"
              maxWidth={3}
            >
              {'Welcome to SOS Services'}
            </Text>

            <Text
              position={[-1.5, 1.2, 0.025]}
              fontSize={0.05}
              color="#cccccc"
              anchorX="left"
              anchorY="top"
              maxWidth={3}
            >
              {'█ Professional IT Solutions'}
            </Text>

            <Text
              position={[-1.5, 1.0, 0.025]}
              fontSize={0.05}
              color="#00ff88"
              anchorX="left"
              anchorY="top"
              maxWidth={3}
            >
              {'█ Web Development'}
            </Text>

            <Text
              position={[-1.5, 0.8, 0.025]}
              fontSize={0.05}
              color="#ff6b6b"
              anchorX="left"
              anchorY="top"
              maxWidth={3}
            >
              {'█ Device Repair Services'}
            </Text>

            <Text
              position={[-1.5, 0.6, 0.025]}
              fontSize={0.05}
              color="#4ecdc4"
              anchorX="left"
              anchorY="top"
              maxWidth={3}
            >
              {'█ Cybersecurity Solutions'}
            </Text>

            {/* Blinking cursor */}
            <Text
              position={[-1.5, 0.4, 0.025]}
              fontSize={0.06}
              color="#00ff88"
              anchorX="left"
              anchorY="top"
            >
              {'> _'}
            </Text>
          </>
        )}

        {/* Power LED indicator */}
        <mesh position={[1.7, 0.2, 0.01]}>
          <sphereGeometry args={[0.02, 8, 8]} />
          <meshBasicMaterial 
            color={lidOpen ? "#00ff00" : "#ff0000"} 
            emissive={lidOpen ? "#004400" : "#440000"}
          />
        </mesh>
      </group>

      {/* Brand Logo on Lid */}
      <Text
        position={[0, 1.8, -1.4]}
        fontSize={0.15}
        color="#888"
        anchorX="center"
        anchorY="center"
        rotation={[0, 0, 0]}
      >
        ZWANSKI
      </Text>

      {/* Ambient lighting */}
      <pointLight position={[2, 3, 2]} intensity={0.5} color="#ffffff" />
      <pointLight position={[-2, 2, 1]} intensity={0.3} color="#4ecdc4" />
      <ambientLight intensity={0.2} />
    </group>
  )
}

export default LaptopModel
