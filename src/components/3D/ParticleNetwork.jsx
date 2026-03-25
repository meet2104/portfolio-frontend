import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function ParticleNetwork() {
  const pointsRef = useRef();
  const lineRef = useRef();

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < 100; i++) {
      const x = (Math.random() - 0.5) * 20;
      const y = (Math.random() - 0.5) * 20;
      const z = (Math.random() - 0.5) * 20;
      temp.push({ x, y, z, vx: Math.random() * 0.01, vy: Math.random() * 0.01, vz: Math.random() * 0.01 });
    }
    return temp;
  }, []);

  const positionArray = useMemo(() => {
    const arr = new Float32Array(particles.length * 3);
    particles.forEach((p, i) => {
      arr[i * 3] = p.x;
      arr[i * 3 + 1] = p.y;
      arr[i * 3 + 2] = p.z;
    });
    return arr;
  }, [particles]);

  useFrame(() => {
    const positions = pointsRef.current.geometry.attributes.position.array;
    particles.forEach((p, i) => {
      p.x += p.vx;
      p.y += p.vy;
      p.z += p.vz;

      if (p.x > 10) p.x = -10;
      if (p.x < -10) p.x = 10;
      if (p.y > 10) p.y = -10;
      if (p.y < -10) p.y = 10;
      if (p.z > 10) p.z = -10;
      if (p.z < -10) p.z = 10;

      positions[i * 3] = p.x;
      positions[i * 3 + 1] = p.y;
      positions[i * 3 + 2] = p.z;
    });
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positionArray.length / 3}
          array={positionArray}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.3} color="#3B82F6" sizeAttenuation transparent opacity={0.8} />
    </points>
  );
}

export default function ParticleNetworkScene() {
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
      camera={{ position: [0, 0, 15], fov: 75 }}
    >
      <ambientLight intensity={0.5} />
      <ParticleNetwork />
    </Canvas>
  );
}