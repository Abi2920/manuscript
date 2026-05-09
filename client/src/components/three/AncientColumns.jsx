import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const AncientColumns = ({ count = 4 }) => {
  const group = useRef();
  const columns = useRef([]);

  const data = useMemo(() => {
    const items = [];
    const marbleColors = ['#D4C5B0', '#C4B8A3', '#E8DDD0', '#B5A992'];
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2 + Math.PI / 4;
      items.push({
        position: [
          Math.cos(angle) * 5.5,
          -2.5 + Math.random() * 1.5,
          Math.sin(angle) * 5.5,
        ],
        height: 3.5 + Math.random() * 1.5,
        radius: 0.25,
        rotation: [0, Math.PI / count * i, 0],
        floatSpeed: 0.12 + Math.random() * 0.1,
        floatOffset: Math.random() * Math.PI * 2,
        color: marbleColors[i % marbleColors.length],
        flutes: 16,
      });
    }
    return items;
  }, [count]);

  useFrame((state) => {
    if (!group.current) return;
    const time = state.clock.elapsedTime;

    data.forEach((d, i) => {
      const col = columns.current[i];
      if (!col) return;
      col.position.y = d.position[1] + Math.sin(time * d.floatSpeed + d.floatOffset) * 0.2;
      col.rotation.y = d.rotation[1] + time * 0.015;
    });

    group.current.rotation.y = time * 0.005;
  });

  return (
    <group ref={group}>
      {data.map((d, i) => (
        <group
          key={i}
          ref={(el) => (columns.current[i] = el)}
          position={d.position}
          rotation={d.rotation}
        >
          {/* Column shaft with fluting */}
          <mesh position={[0, d.height / 2, 0]}>
            <cylinderGeometry args={[d.radius * 0.85, d.radius, d.height, d.flutes, 1]} />
            <meshStandardMaterial
              color={d.color}
              metalness={0.05}
              roughness={0.7}
              transparent
              opacity={0.45}
              flatShading
            />
          </mesh>

          {/* Inner shaft for depth */}
          <mesh position={[0, d.height / 2, 0]}>
            <cylinderGeometry args={[d.radius * 0.75, d.radius * 0.88, d.height, 12]} />
            <meshStandardMaterial
              color="#B5A992"
              metalness={0.02}
              roughness={0.8}
              transparent
              opacity={0.15}
            />
          </mesh>

          {/* Capital - top */}
          <mesh position={[0, d.height + 0.08, 0]}>
            <cylinderGeometry args={[d.radius * 1.3, d.radius * 0.9, 0.12, 12]} />
            <meshStandardMaterial
              color={d.color}
              metalness={0.08}
              roughness={0.65}
              transparent
              opacity={0.5}
            />
          </mesh>
          <mesh position={[0, d.height + 0.18, 0]}>
            <cylinderGeometry args={[d.radius * 1.1, d.radius * 1.3, 0.08, 12]} />
            <meshStandardMaterial
              color="#E8DDD0"
              metalness={0.05}
              roughness={0.6}
              transparent
              opacity={0.4}
            />
          </mesh>

          {/* Capital detail - scroll volutes */}
          <mesh position={[d.radius * 0.9, d.height + 0.12, d.radius * 0.3]}>
            <torusGeometry args={[0.06, 0.025, 6, 8]} />
            <meshStandardMaterial color="#D4C5B0" transparent opacity={0.3} />
          </mesh>
          <mesh position={[-d.radius * 0.9, d.height + 0.12, d.radius * 0.3]}>
            <torusGeometry args={[0.06, 0.025, 6, 8]} />
            <meshStandardMaterial color="#D4C5B0" transparent opacity={0.3} />
          </mesh>
          <mesh position={[d.radius * 0.9, d.height + 0.12, -d.radius * 0.3]}>
            <torusGeometry args={[0.06, 0.025, 6, 8]} />
            <meshStandardMaterial color="#D4C5B0" transparent opacity={0.3} />
          </mesh>
          <mesh position={[-d.radius * 0.9, d.height + 0.12, -d.radius * 0.3]}>
            <torusGeometry args={[0.06, 0.025, 6, 8]} />
            <meshStandardMaterial color="#D4C5B0" transparent opacity={0.3} />
          </mesh>

          {/* Base */}
          <mesh position={[0, -0.1, 0]}>
            <cylinderGeometry args={[d.radius * 1.25, d.radius * 1.35, 0.15, 12]} />
            <meshStandardMaterial
              color={d.color}
              metalness={0.05}
              roughness={0.7}
              transparent
              opacity={0.45}
            />
          </mesh>
          <mesh position={[0, -0.2, 0]}>
            <cylinderGeometry args={[d.radius * 1.15, d.radius * 1.25, 0.08, 12]} />
            <meshStandardMaterial
              color="#C4B8A3"
              metalness={0.05}
              roughness={0.7}
              transparent
              opacity={0.35}
            />
          </mesh>

          {/* Plinth */}
          <mesh position={[0, -0.3, 0]}>
            <boxGeometry args={[d.radius * 2.8, 0.08, d.radius * 2.8]} />
            <meshStandardMaterial
              color="#B5A992"
              metalness={0.05}
              roughness={0.8}
              transparent
              opacity={0.35}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
};

export default AncientColumns;
