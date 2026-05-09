import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const AntiqueOrrery = () => {
  const group = useRef();
  const centerRef = useRef();
  const outerRingRef = useRef();

  const planets = useMemo(() => [
    { radius: 1.5, size: 0.12, speed: 0.7, color: '#D4B896', tilt: 0.08, emissive: '#8A7030' },
    { radius: 2.3, size: 0.16, speed: 0.5, color: '#B89745', tilt: 0.12, emissive: '#6B5220' },
    { radius: 3.2, size: 0.2, speed: 0.35, color: '#8A7030', tilt: 0.18, emissive: '#4A3520' },
    { radius: 4.2, size: 0.18, speed: 0.2, color: '#D4C5B0', tilt: 0.22, emissive: '#8A7030' },
    { radius: 5.3, size: 0.22, speed: 0.12, color: '#B5A992', tilt: 0.28, emissive: '#6B5220' },
  ], []);

  useFrame((state) => {
    if (!group.current || !centerRef.current || !outerRingRef.current) return;
    const time = state.clock.elapsedTime;

    group.current.rotation.y = time * 0.02;

    planets.forEach((p, i) => {
      const planet = group.current.children[i * 2 + 1];
      if (!planet) return;
      const angle = time * p.speed;
      planet.position.x = Math.cos(angle) * p.radius;
      planet.position.z = Math.sin(angle) * p.radius;
      planet.position.y = Math.sin(angle * 0.5) * p.tilt;
      planet.rotation.x = time * 0.8;
      planet.rotation.y = time * 0.5;
    });

    centerRef.current.rotation.y = time * 0.08;
    centerRef.current.rotation.x = Math.sin(time * 0.03) * 0.03;

    outerRingRef.current.rotation.x = Math.PI / 2;
    outerRingRef.current.rotation.z = time * 0.01;
  });

  return (
    <group ref={group} position={[0, 0.5, -1]}>
      {/* Center sphere - the sun/golden orb */}
      <mesh ref={centerRef}>
        <sphereGeometry args={[0.35, 20, 20]} />
        <meshStandardMaterial
          color="#B89745"
          metalness={0.5}
          roughness={0.3}
          emissive="#B89745"
          emissiveIntensity={0.15}
        />
      </mesh>
      <pointLight color="#B89745" intensity={0.3} distance={6} decay={2} />

      {/* Arm rings */}
      <mesh>
        <ringGeometry args={[5.2, 5.3, 80]} />
        <meshBasicMaterial
          color="#8A7030"
          transparent
          opacity={0.08}
          side={THREE.DoubleSide}
        />
      </mesh>

      {planets.map((p, i) => (
        <group key={i}>
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[p.radius - 0.005, p.radius, 60]} />
            <meshBasicMaterial
              color="#8A7030"
              transparent
              opacity={0.08}
              side={THREE.DoubleSide}
            />
          </mesh>
          <mesh>
            <sphereGeometry args={[p.size, 12, 12]} />
            <meshStandardMaterial
              color={p.color}
              metalness={0.3}
              roughness={0.5}
              emissive={p.emissive}
              emissiveIntensity={0.05}
            />
          </mesh>
          {/* Gear detail ring */}
          <mesh>
            <torusGeometry args={[p.size * 1.4, 0.008, 6, 12]} />
            <meshBasicMaterial
              color="#8A7030"
              transparent
              opacity={0.15}
            />
          </mesh>
        </group>
      ))}

      {/* Outer zodiac ring */}
      <mesh ref={outerRingRef}>
        <ringGeometry args={[5.8, 5.85, 80]} />
        <meshBasicMaterial
          color="#B89745"
          transparent
          opacity={0.05}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Support arms */}
      {planets.map((p, i) => {
        const armLen = p.radius;
        return (
          <mesh key={`arm-${i}`} rotation={[0, 0, Math.PI / 2]} position={[0, 0, 0]}>
            <cylinderGeometry args={[0.005, 0.005, armLen * 2, 4]} />
            <meshBasicMaterial color="#8A7030" transparent opacity={0.08} />
          </mesh>
        );
      })}
    </group>
  );
};

export default AntiqueOrrery;
