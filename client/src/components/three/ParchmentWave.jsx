import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const ParchmentWave = ({ size = 25, segments = 100 }) => {
  const mesh = useRef();

  const initialPositions = useMemo(() => {
    const geo = new THREE.PlaneGeometry(size, size, segments, segments);
    return geo.attributes.position.array.slice();
  }, [size, segments]);

  useFrame((state) => {
    if (!mesh.current) return;
    const time = state.clock.elapsedTime;
    const pos = mesh.current.geometry.attributes.position.array;

    for (let i = 0; i < pos.length / 3; i++) {
      const x = initialPositions[i * 3];
      const y = initialPositions[i * 3 + 1];
      const d = Math.sqrt(x * x + y * y);

      const wave1 = Math.sin(d * 1.5 - time * 0.4) * 0.15;
      const wave2 = Math.sin(x * 1.2 + time * 0.3) * 0.08;
      const wave3 = Math.cos(y * 1.2 + time * 0.25) * 0.08;
      const wave4 = Math.sin((x + y) * 0.8 + time * 0.2) * 0.06;

      pos[i * 3 + 2] = wave1 + wave2 + wave3 + wave4;
    }
    mesh.current.geometry.attributes.position.needsUpdate = true;
    mesh.current.geometry.computeVertexNormals();
  });

  return (
    <mesh ref={mesh} rotation={[-Math.PI / 2, 0, 0]} position={[0, -4, 0]}>
      <planeGeometry args={[size, size, segments, segments]} />
      <meshStandardMaterial
        color="#2C1810"
        roughness={0.9}
        metalness={0}
        transparent
        opacity={0.5}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

export default ParchmentWave;
