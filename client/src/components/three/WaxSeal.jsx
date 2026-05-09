import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const WaxSeal = ({ position = [0, 0, 0], scale = 1, color = '#8B1A1A' }) => {
  const mesh = useRef();
  const ribbonRef = useRef();

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.y = state.clock.elapsedTime * 0.1;
      mesh.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
    }
    if (ribbonRef.current) {
      ribbonRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.2) * 0.02;
    }
  });

  return (
    <group ref={mesh} position={position} scale={[scale, scale, scale]}>
      {/* Ribbon tails */}
      <group ref={ribbonRef}>
        <mesh position={[-0.4, -0.15, 0]} rotation={[0, 0, 0.3]}>
          <boxGeometry args={[0.5, 0.02, 0.06]} />
          <meshStandardMaterial color="#8B1A1A" roughness={0.7} metalness={0.1} />
        </mesh>
        <mesh position={[0.4, -0.15, 0]} rotation={[0, 0, -0.3]}>
          <boxGeometry args={[0.5, 0.02, 0.06]} />
          <meshStandardMaterial color="#8B1A1A" roughness={0.7} metalness={0.1} />
        </mesh>
      </group>

      {/* Seal disc */}
      <mesh>
        <cylinderGeometry args={[0.35, 0.38, 0.06, 24]} />
        <meshStandardMaterial
          color={color}
          roughness={0.6}
          metalness={0.2}
        />
      </mesh>

      {/* Seal top dome */}
      <mesh position={[0, 0.04, 0]}>
        <cylinderGeometry args={[0.34, 0.36, 0.04, 24]} />
        <meshStandardMaterial
          color={color}
          roughness={0.6}
          metalness={0.2}
        />
      </mesh>

      {/* Emblem - circle */}
      <mesh position={[0, 0.07, 0.01]}>
        <ringGeometry args={[0.08, 0.22, 24]} />
        <meshBasicMaterial
          color="#D4B896"
          transparent
          opacity={0.3}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Emblem - center dot */}
      <mesh position={[0, 0.07, 0.01]}>
        <circleGeometry args={[0.05, 12]} />
        <meshBasicMaterial
          color="#D4B896"
          transparent
          opacity={0.25}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Emblem - cross */}
      <mesh position={[0, 0.07, 0.01]} rotation={[0, 0, Math.PI / 4]}>
        <boxGeometry args={[0.25, 0.02, 0.01]} />
        <meshBasicMaterial color="#D4B896" transparent opacity={0.2} />
      </mesh>
      <mesh position={[0, 0.07, 0.01]} rotation={[0, 0, -Math.PI / 4]}>
        <boxGeometry args={[0.25, 0.02, 0.01]} />
        <meshBasicMaterial color="#D4B896" transparent opacity={0.2} />
      </mesh>

      {/* Seal edge detail */}
      <mesh position={[0, 0.02, 0]}>
        <torusGeometry args={[0.34, 0.015, 8, 24]} />
        <meshStandardMaterial
          color={color}
          roughness={0.5}
          metalness={0.3}
          transparent
          opacity={0.5}
        />
      </mesh>
    </group>
  );
};

export default WaxSeal;
