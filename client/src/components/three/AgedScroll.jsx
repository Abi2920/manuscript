import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const AgedScroll = ({ position = [0, 0, 0] }) => {
  const group = useRef();
  const scrollRef = useRef();

  const textLines = useMemo(() => {
    const lines = [];
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 4; col++) {
        lines.push({
          x: -0.35 + col * 0.22,
          y: 0.35 - row * 0.09,
          length: 0.08 + Math.random() * 0.12,
          opacity: 0.05 + Math.random() * 0.08,
        });
      }
    }
    return lines;
  }, []);

  useFrame((state) => {
    if (!group.current) return;
    const time = state.clock.elapsedTime;
    group.current.rotation.y = Math.sin(time * 0.15) * 0.1;
    group.current.position.y = position[1] + Math.sin(time * 0.25) * 0.05;

    if (scrollRef.current) {
      const scrollPos = scrollRef.current.geometry.attributes.position.array;
      for (let i = 0; i < scrollPos.length / 3; i++) {
        const x = scrollPos[i * 3];
        const z = scrollPos[i * 3 + 1] || 0;
        scrollPos[i * 3 + 2] = Math.sin(x * 4 + time * 0.2) * 0.015;
      }
      scrollRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group ref={group} position={position}>
      {/* Scroll body */}
      <mesh ref={scrollRef} rotation={[0, 0, 0]}>
        <planeGeometry args={[1.0, 0.8, 20, 8]} />
        <meshStandardMaterial
          color="#F4E4C1"
          roughness={0.95}
          metalness={0}
          side={THREE.DoubleSide}
          transparent
          opacity={0.7}
        />
      </mesh>

      {/* Aged stains */}
      <mesh position={[0.2, -0.15, 0.005]}>
        <planeGeometry args={[0.2, 0.15]} />
        <meshBasicMaterial
          color="#D4B896"
          transparent
          opacity={0.08}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh position={[-0.25, 0.2, 0.005]}>
        <planeGeometry args={[0.15, 0.12]} />
        <meshBasicMaterial
          color="#C4A882"
          transparent
          opacity={0.06}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Text lines */}
      {textLines.map((line, i) => (
        <mesh key={i} position={[line.x, line.y, 0.006]}>
          <planeGeometry args={[line.length, 0.005]} />
          <meshBasicMaterial
            color="#1A1410"
            transparent
            opacity={line.opacity}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}

      {/* Top roll */}
      <mesh position={[0, 0.42, 0]}>
        <cylinderGeometry args={[0.045, 0.05, 1.05, 8]} />
        <meshStandardMaterial color="#D4B896" roughness={0.9} metalness={0} />
      </mesh>

      {/* Bottom roll */}
      <mesh position={[0, -0.42, 0]}>
        <cylinderGeometry args={[0.045, 0.05, 1.05, 8]} />
        <meshStandardMaterial color="#D4B896" roughness={0.9} metalness={0} />
      </mesh>

      {/* Roll end caps */}
      <mesh position={[0.52, 0.42, 0]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshStandardMaterial color="#A0845C" roughness={0.8} />
      </mesh>
      <mesh position={[-0.52, 0.42, 0]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshStandardMaterial color="#A0845C" roughness={0.8} />
      </mesh>
      <mesh position={[0.52, -0.42, 0]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshStandardMaterial color="#A0845C" roughness={0.8} />
      </mesh>
      <mesh position={[-0.52, -0.42, 0]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshStandardMaterial color="#A0845C" roughness={0.8} />
      </mesh>
    </group>
  );
};

export default AgedScroll;
