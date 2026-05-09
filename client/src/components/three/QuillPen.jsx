import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const QuillPen = ({ position = [0, 0, 0] }) => {
  const group = useRef();
  const inkRef = useRef();

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
      group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.03;
      group.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.4) * 0.08;
    }
    if (inkRef.current) {
      inkRef.current.material.opacity = 0.2 + Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <group ref={group} position={position} rotation={[0.2, 0, 0.5]}>
      {/* Feather shaft */}
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.008, 0.015, 1, 4]} />
        <meshStandardMaterial color="#1A1410" roughness={0.8} />
      </mesh>

      {/* Feather barbs - left side */}
      {[-1, 0, 1, 2].map((i) => (
        <mesh key={`l-${i}`} position={[-0.03 - i * 0.02, 0.4 + i * 0.1, 0]} rotation={[0, 0, -0.4 - i * 0.15]}>
          <planeGeometry args={[0.01 + i * 0.005, 0.12 + i * 0.04]} />
          <meshStandardMaterial
            color="#2C1A10"
            roughness={0.9}
            side={THREE.DoubleSide}
            transparent
            opacity={0.6}
          />
        </mesh>
      ))}

      {/* Feather barbs - right side */}
      {[-1, 0, 1, 2].map((i) => (
        <mesh key={`r-${i}`} position={[0.03 + i * 0.02, 0.4 + i * 0.1, 0]} rotation={[0, 0, 0.4 + i * 0.15]}>
          <planeGeometry args={[0.01 + i * 0.005, 0.12 + i * 0.04]} />
          <meshStandardMaterial
            color="#2C1A10"
            roughness={0.9}
            side={THREE.DoubleSide}
            transparent
            opacity={0.6}
          />
        </mesh>
      ))}

      {/* Nib */}
      <mesh position={[0, 0.02, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <coneGeometry args={[0.015, 0.04, 4]} />
        <meshStandardMaterial color="#8A7030" metalness={0.6} roughness={0.3} />
      </mesh>

      {/* Ink drop */}
      <mesh ref={inkRef} position={[0, -0.06, 0]}>
        <sphereGeometry args={[0.015, 6, 6]} />
        <meshBasicMaterial
          color="#1A1410"
          transparent
          opacity={0.25}
        />
      </mesh>
    </group>
  );
};

export default QuillPen;
