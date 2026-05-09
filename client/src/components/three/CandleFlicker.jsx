import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const CandleFlicker = ({ position = [0, 0, 0], height = 2.5, color = '#FFD700' }) => {
  const flameRef = useRef();
  const glowRef = useRef();
  const lightRef = useRef();

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    const flicker = 0.85 + Math.sin(time * 23.7) * 0.08 + Math.sin(time * 37.3) * 0.05 + Math.sin(time * 13.1) * 0.03;
    const swayX = Math.sin(time * 1.7) * 0.03;
    const swayZ = Math.cos(time * 1.3) * 0.03;

    if (flameRef.current) {
      flameRef.current.scale.y = flicker;
      flameRef.current.scale.x = 0.7 + 0.3 * flicker;
      flameRef.current.position.x = swayX;
      flameRef.current.position.z = swayZ;
      flameRef.current.position.y = height + 0.3 + (flicker - 1) * 0.1;
    }

    if (glowRef.current) {
      glowRef.current.scale.setScalar(0.8 + (flicker - 0.85) * 0.5);
      glowRef.current.material.opacity = 0.15 + (flicker - 0.85) * 0.2;
    }

    if (lightRef.current) {
      lightRef.current.intensity = 0.6 + (flicker - 0.85) * 1.5;
      lightRef.current.position.x = swayX * 2;
      lightRef.current.position.z = swayZ * 2;
    }
  });

  return (
    <group position={position}>
      {/* Candle body */}
      <mesh position={[0, height / 2, 0]}>
        <cylinderGeometry args={[0.12, 0.14, height, 12]} />
        <meshStandardMaterial color="#F4E4C1" roughness={0.9} metalness={0} />
      </mesh>
      <mesh position={[0, height / 2, 0]}>
        <cylinderGeometry args={[0.13, 0.15, height, 12]} />
        <meshStandardMaterial color="#E8D5A3" roughness={1} metalness={0} transparent opacity={0.3} />
      </mesh>

      {/* Wax drip */}
      <mesh position={[0.06, height * 0.6, 0]}>
        <sphereGeometry args={[0.04, 6, 6]} />
        <meshStandardMaterial color="#F4E4C1" roughness={0.9} />
      </mesh>

      {/* Wick */}
      <mesh position={[0, height + 0.05, 0]}>
        <cylinderGeometry args={[0.008, 0.008, 0.1, 4]} />
        <meshBasicMaterial color="#1A1410" />
      </mesh>

      {/* Flame */}
      <group ref={flameRef} position={[0, height + 0.3, 0]}>
        <mesh>
          <sphereGeometry args={[0.08, 8, 8]} />
          <meshBasicMaterial color="#FFD700" />
        </mesh>
        <mesh position={[0, 0.04, 0]}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshBasicMaterial color="#FFA500" />
        </mesh>
        <mesh position={[0, 0.08, 0]}>
          <coneGeometry args={[0.03, 0.08, 6]} />
          <meshBasicMaterial color="#FF8C00" />
        </mesh>
      </group>

      {/* Glow halo */}
      <mesh ref={glowRef} position={[0, height + 0.3, 0]}>
        <sphereGeometry args={[0.4, 16, 16]} />
        <meshBasicMaterial
          color="#FFD700"
          transparent
          opacity={0.15}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Point light */}
      <pointLight
        ref={lightRef}
        color="#FFD700"
        intensity={0.6}
        distance={8}
        decay={2}
        position={[0, height + 0.3, 0]}
      />
    </group>
  );
};

export default CandleFlicker;
