import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const EmberParticles = ({ count = 300 }) => {
  const mesh = useRef();

  const { positions, sizes, speeds } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const siz = new Float32Array(count);
    const spd = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 1] = Math.random() * 10 - 5;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 16 - 3;
      siz[i] = 0.02 + Math.random() * 0.04;
      spd[i] = 0.2 + Math.random() * 0.5;
    }
    return { positions: pos, sizes: siz, speeds: spd };
  }, [count]);

  const basePos = useMemo(() => new Float32Array(positions), [positions]);

  useFrame((state) => {
    if (!mesh.current) return;
    const time = state.clock.elapsedTime;
    const pos = mesh.current.geometry.attributes.position.array;
    const sizesArr = mesh.current.geometry.attributes.size.array;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const floatY = Math.sin(time * speeds[i] + i * 0.1) * 0.5;
      const floatX = Math.cos(time * speeds[i] * 0.7 + i * 0.05) * 0.2;

      pos[i3] = basePos[i3] + floatX;
      pos[i3 + 1] = basePos[i3 + 1] + floatY;
      pos[i3 + 2] = basePos[i3 + 2];

      sizesArr[i] = 0.03 + Math.sin(time * speeds[i] + i) * 0.015;
    }
    mesh.current.geometry.attributes.position.needsUpdate = true;
    mesh.current.geometry.attributes.size.needsUpdate = true;
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
        color="#D4A574"
        transparent
        opacity={0.3}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  );
};

export default EmberParticles;
