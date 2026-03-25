import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { PointMaterial, Points, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// Galaxy generator
function GalaxyScene() {
  const pointsRef = useRef();
  const { mouse, viewport, camera } = useThree();
  
  const parameters = {
    count: 25000,
    size: 0.04,
    radius: 18,
    branches: 5,
    spin: 1.2,
    randomness: 0.6,
    randomnessPower: 3,
    insideColor: '#EC4899', // Pink/Neon
    outsideColor: '#3B82F6' // Blue
  };

  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(parameters.count * 3);
    const colors = new Float32Array(parameters.count * 3);
    
    const colorInside = new THREE.Color(parameters.insideColor);
    const colorOutside = new THREE.Color(parameters.outsideColor);

    for (let i = 0; i < parameters.count; i++) {
      const i3 = i * 3;
      
      // Position
      const radius = Math.random() * parameters.radius;
      const spinAngle = radius * parameters.spin;
      const branchAngle = ((i % parameters.branches) / parameters.branches) * Math.PI * 2;
      
      const randomX = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * parameters.randomness * radius;
      const randomY = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * parameters.randomness * radius;
      const randomZ = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * parameters.randomness * radius;

      positions[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX;
      positions[i3 + 1] = randomY;
      positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ;

      // Color
      const mixedColor = colorInside.clone();
      mixedColor.lerp(colorOutside, radius / parameters.radius);
      
      colors[i3] = mixedColor.r;
      colors[i3 + 1] = mixedColor.g;
      colors[i3 + 2] = mixedColor.b;
    }
    
    return [positions, colors];
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      // Slow rotation
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.05;
      
      // Mouse interaction parallax
      const targetX = (mouse.x * viewport.width) * 0.02;
      const targetY = (mouse.y * viewport.height) * 0.02;
      
      camera.position.x += (targetX - camera.position.x) * 0.02;
      camera.position.y += (targetY - camera.position.y) * 0.02;
      camera.lookAt(0, 0, 0);
    }
  });

  return (
    <Points ref={pointsRef} positions={positions} colors={colors}>
      <PointMaterial 
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        size={parameters.size}
        sizeAttenuation={true}
        vertexColors
      />
    </Points>
  );
}

// Background glowing ambient dust
function AmbientDust() {
  const pointsRef = useRef();
  
  const count = 3000;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
        pos[i * 3] = (Math.random() - 0.5) * 50;
        pos[i * 3 + 1] = (Math.random() - 0.5) * 50;
        pos[i * 3 + 2] = (Math.random() - 0.5) * 50;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
        pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02;
        pointsRef.current.rotation.x = state.clock.elapsedTime * 0.01;
    }
  });

  return (
    <Points ref={pointsRef} positions={positions}>
      <PointMaterial
        transparent
        color="#8B5CF6"
        size={0.03}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.3}
      />
    </Points>
  );
}



export default function AnimatedBackground() {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none', background: 'radial-gradient(circle at center, #0B0F19 0%, #030407 100%)' }}>
        <Canvas
            camera={{ position: [0, 8, 20], fov: 60 }}
            gl={{ antialias: false, alpha: false }} // Solid background for better performance and blending
            dpr={[1, 2]} // Support high-DPI
        >
            <color attach="background" args={['#030508']} />
            <fog attach="fog" args={['#030508', 10, 35]} />
            
            <GalaxyScene />
            <AmbientDust />

            
            <OrbitControls 
                enableZoom={false} 
                enablePan={false}
                minPolarAngle={Math.PI / 3}
                maxPolarAngle={Math.PI / 1.5}
                autoRotate
                autoRotateSpeed={0.3}
            />
        </Canvas>
    </div>
  );
}
