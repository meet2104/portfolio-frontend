import { useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import * as THREE from 'three';

function InteractiveOrb() {
  const meshRef = useRef();
  const { mouse } = useThree();
  
  useFrame(() => {
    meshRef.current.rotation.x = mouse.y * 0.5;
    meshRef.current.rotation.y = mouse.x * 0.5;
  });

  return (
    <Sphere ref={meshRef} args={[1.5, 64, 64]} position={[0, 0, 0]}>
      <meshStandardMaterial
        color="#3B82F6"
        wireframe={true}
        emissive="#1e40af"
        emissiveIntensity={0.5}
      />
    </Sphere>
  );
}

export default function InteractiveOrbScene() {
  return (
    <Canvas
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
      }}
      camera={{ position: [0, 0, 4], fov: 45 }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <InteractiveOrb />
    </Canvas>
  );
}