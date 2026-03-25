import { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

function FloatingCube() {
  const meshRef = useRef();
  
  useFrame((state) => {
    meshRef.current.rotation.x += 0.001;
    meshRef.current.rotation.y += 0.001;
    meshRef.current.position.y += Math.sin(state.clock.elapsedTime) * 0.001;
  });

  return (
    <mesh ref={meshRef} position={[-4, 2, 0]}>
      <boxGeometry args={[1.5, 1.5, 1.5]} />
      <meshStandardMaterial
        color="#3B82F6"
        wireframe={false}
        emissive="#1e40af"
        emissiveIntensity={0.5}
      />
    </mesh>
  );
}

function FloatingSphere() {
  const meshRef = useRef();
  
  useFrame((state) => {
    meshRef.current.rotation.x += 0.0005;
    meshRef.current.rotation.y += 0.0008;
    meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 2;
  });

  return (
    <mesh ref={meshRef} position={[4, 0, 0]}>
      <sphereGeometry args={[1.5, 32, 32]} />
      <meshStandardMaterial
        color="#EC4899"
        wireframe={false}
        emissive="#be123c"
        emissiveIntensity={0.4}
      />
    </mesh>
  );
}

function FloatingTorus() {
  const meshRef = useRef();
  
  useFrame((state) => {
    meshRef.current.rotation.x += 0.001;
    meshRef.current.rotation.y += 0.002;
  });

  return (
    <mesh ref={meshRef} position={[0, -2, -5]}>
      <torusGeometry args={[1.5, 0.5, 32, 100]} />
      <meshStandardMaterial
        color="#10B981"
        wireframe={false}
        emissive="#047857"
        emissiveIntensity={0.5}
      />
    </mesh>
  );
}

export default function AnimatedBackground() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 75 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none', // Allow clicking through canvas
      }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#EC4899" />
      
      <Stars radius={100} depth={50} count={5000} factor={4} />
      
      <FloatingCube />
      <FloatingSphere />
      <FloatingTorus />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={2}
      />
    </Canvas>
  );
}