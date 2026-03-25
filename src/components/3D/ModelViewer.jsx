import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

function Model({ url }) {
  const group = useRef();
  const { scene } = useGLTF(url);

  useFrame(() => {
    group.current.rotation.y += 0.005;
  });

  return <primitive ref={group} object={scene} scale={2} />;
}

export default function ModelViewer({ url }) {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
      <ambientLight intensity={0.7} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <Model url={url} />
      <OrbitControls />
    </Canvas>
  );
}