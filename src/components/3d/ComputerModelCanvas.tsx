
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stars, ContactShadows } from '@react-three/drei'
import { Suspense } from 'react'
import Computer from './Computer'

const ComputerModelCanvas = () => {
  return (
    <div className="w-full h-screen">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        className="bg-gradient-to-b from-slate-900 to-slate-800"
      >
        <Suspense fallback={null}>
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2.5}
          />
          
          <Computer />
          
          <Stars
            radius={100}
            depth={50}
            count={5000}
            factor={4}
            saturation={0}
            fade
            speed={1}
          />
          
          <ContactShadows
            position={[0, -2, 0]}
            opacity={0.4}
            scale={10}
            blur={1}
            far={4}
            resolution={256}
            color="#000000"
          />
        </Suspense>
      </Canvas>
    </div>
  )
}

export default ComputerModelCanvas
