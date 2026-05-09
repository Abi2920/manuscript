import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const DustParticles = ({ count = 3000 }) => {
  const mesh = useRef();

  const { positions, sizes, speeds, basePos } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const siz = new Float32Array(count);
    const spd = new Float32Array(count);
    const base = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const radius = 6 + Math.random() * 14;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = (Math.random() - 0.5) * 12;
      const z = radius * Math.cos(phi) - 3;

      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;
      base[i * 3] = x;
      base[i * 3 + 1] = y;
      base[i * 3 + 2] = z;

      siz[i] = 0.015 + Math.random() * 0.05;
      spd[i] = 0.05 + Math.random() * 0.15;
    }
    return { positions: pos, sizes: siz, speeds: spd, basePos: base };
  }, [count]);

  useFrame((state) => {
    if (!mesh.current) return;
    const time = state.clock.elapsedTime;
    const pos = mesh.current.geometry.attributes.position.array;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const speed = speeds[i];

      pos[i3] = basePos[i3] + Math.sin(time * speed * 0.3 + i * 0.005) * 0.8;
      pos[i3 + 1] = basePos[i3 + 1]
        + Math.sin(time * speed * 0.2 + i * 0.008) * 0.6
        + Math.sin(time * 0.1) * 0.3;
      pos[i3 + 2] = basePos[i3 + 2] + Math.cos(time * speed * 0.25 + i * 0.006) * 0.5;

      if (pos[i3 + 1] > 7) basePos[i3 + 1] = -7;
      if (pos[i3 + 1] < -7) basePos[i3 + 1] = 7;
    }
    mesh.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={mesh} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={count}
          array={sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#B89745"
        transparent
        opacity={0.12}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  );
};

export default DustParticles;
