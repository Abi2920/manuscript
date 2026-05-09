import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const FloatingManuscript = ({ count = 6 }) => {
  const group = useRef();
  const pages = useRef([]);

  const data = useMemo(() => {
    const items = [];
    for (let i = 0; i < count; i++) {
      const textLines = [];
      const lineCount = 5 + Math.floor(Math.random() * 8);
      for (let l = 0; l < lineCount; l++) {
        textLines.push({
          y: 0.3 - (l / lineCount) * 0.55,
          length: 0.15 + Math.random() * 0.35,
          opacity: 0.04 + Math.random() * 0.06,
        });
      }
      items.push({
        position: [
          (Math.random() - 0.5) * 12,
          (Math.random() - 0.5) * 6,
          (Math.random() - 0.5) * 12 - 4,
        ],
        rotation: [Math.random() * 0.2, Math.random() * Math.PI * 2, Math.random() * 0.2],
        width: 0.7 + Math.random() * 0.5,
        height: 0.9 + Math.random() * 0.6,
        floatSpeed: 0.08 + Math.random() * 0.15,
        floatOffset: Math.random() * Math.PI * 2,
        rotSpeed: 0.03 + Math.random() * 0.06,
        opacity: 0.15 + Math.random() * 0.2,
        textLines,
        stain: { x: (Math.random() - 0.5) * 0.3, y: (Math.random() - 0.5) * 0.3 },
      });
    }
    return items;
  }, [count]);

  useFrame((state) => {
    if (!group.current) return;
    const time = state.clock.elapsedTime;

    data.forEach((d, i) => {
      const mesh = pages.current[i];
      if (!mesh) return;
      mesh.position.y = d.position[1] + Math.sin(time * d.floatSpeed + d.floatOffset) * 0.3;
      mesh.position.x = d.position[0] + Math.cos(time * d.floatSpeed * 0.5 + d.floatOffset) * 0.15;
      mesh.rotation.y = d.rotation[1] + time * d.rotSpeed;
      mesh.rotation.x = d.rotation[0] + Math.sin(time * d.floatSpeed + d.floatOffset) * 0.03;
    });
  });

  return (
    <group ref={group}>
      {data.map((d, i) => (
        <group
          key={i}
          ref={(el) => (pages.current[i] = el)}
          position={d.position}
          rotation={d.rotation}
        >
          {/* Main parchment */}
          <mesh>
            <planeGeometry args={[d.width, d.height]} />
            <meshStandardMaterial
              color="#F4E4C1"
              transparent
              opacity={d.opacity}
              side={THREE.DoubleSide}
              roughness={0.95}
              metalness={0}
            />
          </mesh>

          {/* Aged darker edges */}
          <mesh position={[0, 0, 0.002]}>
            <planeGeometry args={[d.width * 0.98, d.height * 0.98]} />
            <meshBasicMaterial
              color="#E8D5A3"
              transparent
              opacity={d.opacity * 0.4}
              side={THREE.DoubleSide}
            />
          </mesh>

          {/* Text lines */}
          {d.textLines.map((line, l) => (
            <mesh key={l} position={[0, line.y, 0.004]}>
              <planeGeometry args={[line.length, 0.004]} />
              <meshBasicMaterial
                color="#1A1410"
                transparent
                opacity={line.opacity}
                side={THREE.DoubleSide}
              />
            </mesh>
          ))}

          {/* Stain marks */}
          <mesh position={[d.stain.x, d.stain.y, 0.003]}>
            <planeGeometry args={[0.1, 0.08]} />
            <meshBasicMaterial
              color="#C4A882"
              transparent
              opacity={d.opacity * 0.15}
              side={THREE.DoubleSide}
            />
          </mesh>

          {/* Ink mark */}
          <mesh position={[d.stain.x * 0.5, d.stain.y * 0.5, 0.004]}>
            <circleGeometry args={[0.01, 8]} />
            <meshBasicMaterial
              color="#1A1410"
              transparent
              opacity={d.opacity * 0.2}
              side={THREE.DoubleSide}
            />
          </mesh>

          {/* Decorative border line */}
          <mesh position={[0, 0, 0.004]}>
            <planeGeometry args={[d.width * 0.85, d.height * 0.85]} />
            <meshBasicMaterial
              color="transparent"
              transparent
              opacity={1}
              side={THREE.DoubleSide}
            />
          </mesh>
          <lineSegments>
            <edgesGeometry args={[new THREE.PlaneGeometry(d.width * 0.85, d.height * 0.85)]} />
            <lineBasicMaterial
              color="#B89745"
              transparent
              opacity={d.opacity * 0.15}
            />
          </lineSegments>

          {/* Parchment edge border */}
          <lineSegments>
            <edgesGeometry args={[new THREE.PlaneGeometry(d.width, d.height)]} />
            <lineBasicMaterial
              color="#8A7030"
              transparent
              opacity={d.opacity * 0.1}
            />
          </lineSegments>
        </group>
      ))}
    </group>
  );
};

export default FloatingManuscript;
