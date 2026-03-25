import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function Particle() {
  const meshRef = useRef();
  const positionArray = useMemo(() => {
    const arr = new Float32Array(3000);
    for (let i = 0; i < 3000; i += 3) {
      arr[i] = (Math.random() - 0.5) * 20;
      arr[i + 1] = Math.random() * 40 - 20;
      arr[i + 2] = (Math.random() - 0.5) * 10;
    }
    return arr;
  }, []);

  useFrame(() => {
    const positions = meshRef.current.geometry.attributes.position.array;
    for (let i = 1; i < 3000; i += 3) {
      positions[i] -= 0.1;
      if (positions[i] < -20) {
        positions[i] = 20;
      }
    }
    meshRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positionArray.length / 3}
          array={positionArray}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        color="#3B82F6"
        sizeAttenuation
        transparent
        opacity={0.6}
      />
    </points>
  );
}

export default function CodeRain() {
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
      camera={{ position: [0, 0, 10], fov: 75 }}
    >
      <Particle />
    </Canvas>
  );
}