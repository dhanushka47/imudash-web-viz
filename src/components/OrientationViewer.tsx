import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

interface CubeProps {
  rotation: { x: number; y: number; z: number };
}

const IMUCube = ({ rotation }: CubeProps) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x = rotation.x;
      meshRef.current.rotation.y = rotation.y;
      meshRef.current.rotation.z = rotation.z;
    }
  });

  return (
    <group>
      <mesh ref={meshRef}>
        <boxGeometry args={[2, 0.5, 3]} />
        <meshStandardMaterial color="#2563eb" />
        <lineSegments>
          <edgesGeometry args={[new THREE.BoxGeometry(2, 0.5, 3)]} />
          <lineBasicMaterial color="#ffffff" linewidth={2} />
        </lineSegments>
      </mesh>
      
      {/* Coordinate axes */}
      <arrowHelper args={[new THREE.Vector3(1, 0, 0), new THREE.Vector3(0, 0, 0), 2, 0xff0000]} />
      <arrowHelper args={[new THREE.Vector3(0, 1, 0), new THREE.Vector3(0, 0, 0), 2, 0x00ff00]} />
      <arrowHelper args={[new THREE.Vector3(0, 0, 1), new THREE.Vector3(0, 0, 0), 2, 0x0000ff]} />
    </group>
  );
};

interface OrientationViewerProps {
  rotation: { x: number; y: number; z: number };
}

export const OrientationViewer = ({ rotation }: OrientationViewerProps) => {
  return (
    <div className="w-full h-full bg-card rounded-lg border border-border overflow-hidden">
      <div className="p-4 border-b border-border">
        <h2 className="text-lg font-semibold text-foreground">3D Orientation</h2>
      </div>
      <div className="relative w-full h-[calc(100%-60px)]">
        <Canvas camera={{ position: [5, 3, 5], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <IMUCube rotation={rotation} />
          <OrbitControls enableZoom={true} enablePan={false} />
          <gridHelper args={[10, 10, '#374151', '#1f2937']} />
        </Canvas>
      </div>
    </div>
  );
};
