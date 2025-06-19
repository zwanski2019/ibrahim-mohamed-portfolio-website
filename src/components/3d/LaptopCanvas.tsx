
import { Canvas } from '@react-three/fiber'
import { OrbitControls, ContactShadows, Environment } from '@react-three/drei'
import { Suspense } from 'react'
import LaptopModel from './LaptopModel'

const LaptopCanvas = () => {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ 
          position: [4, 3, 4], 
          fov: 45,
          near: 0.1,
          far: 1000
        }}
        shadows
        className="bg-transparent"
      >
        <Suspense fallback={null}>
          {/* Enhanced lighting setup */}
          <ambientLight intensity={0.4} />
          <directionalLight
            position={[10, 10, 5]}
            intensity={1}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
          />
          <pointLight position={[-10, -10, -10]} intensity={0.3} color="#4ecdc4" />
          
          {/* Environment for reflections */}
          <Environment preset="studio" />
          
          {/* Orbit controls with constraints */}
          <OrbitControls
            enablePan={false}
            enableZoom={true}
            maxDistance={8}
            minDistance={3}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 6}
            autoRotate={false}
            autoRotateSpeed={0.5}
          />
          
          {/* The laptop model */}
          <LaptopModel />
          
          {/* Contact shadows for realism */}
          <ContactShadows
            position={[0, -1.5, 0]}
            opacity={0.4}
            scale={10}
            blur={2}
            far={4}
          />
        </Suspense>
      </Canvas>
    </div>
  )
}

export default LaptopCanvas
