
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import * as THREE from 'three'

const Computer = () => {
  const meshRef = useRef<THREE.Mesh>(null)
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime) * 0.1
    }
  })

  return (
    <group ref={groupRef}>
      {/* Computer Base */}
      <mesh ref={meshRef} position={[0, -1, 0]}>
        <boxGeometry args={[3, 0.2, 2]} />
        <meshStandardMaterial color="#2a2a2a" />
      </mesh>

      {/* Screen */}
      <mesh position={[0, 0.5, 0.1]}>
        <boxGeometry args={[2.5, 1.8, 0.1]} />
        <meshStandardMaterial color="#000000" />
      </mesh>

      {/* Screen Content */}
      <mesh position={[0, 0.5, 0.16]}>
        <planeGeometry args={[2.3, 1.6]} />
        <meshBasicMaterial color="#1a1a2e" />
      </mesh>

      {/* Simplified Text on Screen - using any to bypass strict typing */}
      <Text
        {...({
          position: [0, 0.8, 0.17],
          fontSize: 0.15,
          color: "#00ff88",
          anchorX: "center",
          anchorY: "middle",
          maxWidth: 2,
          textAlign: "center"
        } as any)}
      >
        Welcome to SOS Services
      </Text>

      <Text
        {...({
          position: [0, 0.5, 0.17],
          fontSize: 0.12,
          color: "#ffffff",
          anchorX: "center",
          anchorY: "middle",
          maxWidth: 2,
          textAlign: "center"
        } as any)}
      >
        Tunisia's Premier IT Solutions
      </Text>

      <Text
        {...({
          position: [0, 0.2, 0.17],
          fontSize: 0.1,
          color: "#cccccc",
          anchorX: "center",
          anchorY: "middle",
          maxWidth: 2,
          textAlign: "center"
        } as any)}
      >
        Professional Tech Services
      </Text>

      {/* Keyboard */}
      <mesh position={[0, -0.8, 0.5]}>
        <boxGeometry args={[2, 0.1, 0.8]} />
        <meshStandardMaterial color="#333333" />
      </mesh>

      {/* Monitor Stand */}
      <mesh position={[0, -0.3, 0]}>
        <boxGeometry args={[0.3, 0.8, 0.3]} />
        <meshStandardMaterial color="#2a2a2a" />
      </mesh>

      {/* Lighting */}
      <pointLight position={[2, 2, 2]} intensity={0.5} />
      <ambientLight intensity={0.3} />
    </group>
  )
}

export default Computer
