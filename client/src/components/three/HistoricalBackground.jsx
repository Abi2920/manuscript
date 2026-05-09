import { Canvas } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { Suspense } from 'react';
import DustParticles from './DustParticles';
import AncientColumns from './AncientColumns';
import FloatingManuscript from './FloatingManuscript';
import ParchmentWave from './ParchmentWave';
import AntiqueOrrery from './AntiqueOrrery';
import CandleFlicker from './CandleFlicker';
import WaxSeal from './WaxSeal';
import QuillPen from './QuillPen';
import AgedScroll from './AgedScroll';

const SceneContent = ({ variant = 'full' }) => {
  switch (variant) {
    case 'gallery':
      return (
        <>
          <color attach="background" args={['#0D0806']} />
          <ambientLight intensity={0.15} color="#F4E4C1" />
          <directionalLight position={[4, 6, 4]} intensity={0.3} color="#FFD700" />
          <pointLight position={[0, 2, 0]} intensity={0.4} color="#FFA500" />
          <pointLight position={[-3, 1, -2]} intensity={0.15} color="#B89745" />
          <fog attach="fog" args={['#0D0806', 10, 22]} />
          <DustParticles count={2000} />
          <AncientColumns count={3} />
          <FloatingManuscript count={4} />
          <ParchmentWave size={16} segments={60} />
          <CandleFlicker position={[-2.5, -1.5, -2]} height={2} />
          <CandleFlicker position={[2.5, -1.5, -2]} height={2} />
          <WaxSeal position={[0, -1.5, -1.5]} scale={0.8} />
        </>
      );

    case 'form':
      return (
        <>
          <color attach="background" args={['#0D0806']} />
          <ambientLight intensity={0.12} color="#F4E4C1" />
          <directionalLight position={[3, 5, 3]} intensity={0.25} color="#FFD700" />
          <pointLight position={[0, 1, 2]} intensity={0.5} color="#FFA500" />
          <pointLight position={[-1.5, 0.5, -1.5]} intensity={0.2} color="#B89745" />
          <fog attach="fog" args={['#0D0806', 8, 18]} />
          <DustParticles count={1200} />
          <FloatingManuscript count={3} />
          <ParchmentWave size={12} segments={40} />
          <CandleFlicker position={[-2, -1, -1]} height={2.2} />
          <CandleFlicker position={[2, -1, -1]} height={2.2} />
          <QuillPen position={[-1.2, 0.5, -2]} />
          <WaxSeal position={[1.5, -1, -1.5]} scale={0.6} />
          <AgedScroll position={[0, -1, -1]} />
        </>
      );

    case 'auth':
      return (
        <>
          <color attach="background" args={['#0D0806']} />
          <ambientLight intensity={0.1} color="#F4E4C1" />
          <directionalLight position={[2, 4, 2]} intensity={0.2} color="#FFD700" />
          <pointLight position={[0, 0, 2]} intensity={0.45} color="#FFA500" />
          <pointLight position={[1.5, -0.5, -1]} intensity={0.1} color="#B89745" />
          <fog attach="fog" args={['#0D0806', 6, 14]} />
          <DustParticles count={600} />
          <ParchmentWave size={10} segments={30} />
          <CandleFlicker position={[0, -0.5, -1]} height={2.5} />
        </>
      );

    case 'dashboard':
      return (
        <>
          <color attach="background" args={['#0D0806']} />
          <ambientLight intensity={0.15} color="#F4E4C1" />
          <directionalLight position={[3, 4, 3]} intensity={0.3} color="#FFD700" />
          <pointLight position={[0, 1, 0]} intensity={0.35} color="#FFA500" />
          <pointLight position={[2, -0.5, 1]} intensity={0.15} color="#B89745" />
          <fog attach="fog" args={['#0D0806', 12, 25]} />
          <DustParticles count={1000} />
          <AncientColumns count={2} />
          <ParchmentWave size={14} segments={40} />
          <CandleFlicker position={[-2, -0.5, -2]} height={2} />
          <CandleFlicker position={[2, -0.5, -2]} height={2} />
          <AntiqueOrrery />
        </>
      );

    case 'full':
    default:
      return (
        <>
          <color attach="background" args={['#0D0806']} />
          <ambientLight intensity={0.12} color="#F4E4C1" />
          <directionalLight position={[5, 8, 5]} intensity={0.35} color="#FFD700" />
          <directionalLight position={[-3, -1, -3]} intensity={0.08} color="#8A7030" />
          <pointLight position={[0, 2, 0]} intensity={0.5} color="#FFA500" />
          <pointLight position={[3, -1, 2]} intensity={0.15} color="#B89745" />
          <pointLight position={[-2.5, 0.5, -2]} intensity={0.12} color="#8A7030" />
          <fog attach="fog" args={['#0D0806', 14, 30]} />
          <DustParticles count={3000} />
          <AncientColumns count={4} />
          <FloatingManuscript count={6} />
          <ParchmentWave size={22} segments={70} />
          <AntiqueOrrery />
          <CandleFlicker position={[-3, -1, -3]} height={2} />
          <CandleFlicker position={[3, -1, -3]} height={2} />
          <CandleFlicker position={[0, -1, -4]} height={2.5} />
          <WaxSeal position={[-1, -0.5, -4]} scale={0.7} />
          <WaxSeal position={[1.5, -0.8, -3.5]} scale={0.5} />
          <QuillPen position={[-2, 1, -3]} />
          <QuillPen position={[2.5, 0.5, -4]} />
          <AgedScroll position={[0, -0.5, -4.5]} />
        </>
      );
  }
};

const HistoricalBackground = ({ variant = 'full', cameraPosition, children }) => {
  const cameraSettings = {
    full: [0, 0.5, 14],
    gallery: [0, 0.5, 11],
    form: [0, 0.3, 8],
    auth: [0, 0, 6],
    dashboard: [0, 0.3, 10],
  };

  const fovSettings = {
    full: 55,
    gallery: 50,
    form: 50,
    auth: 45,
    dashboard: 50,
  };

  const pos = cameraPosition || cameraSettings[variant] || [0, 0, 14];
  const fov = fovSettings[variant] || 55;

  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        camera={{ position: pos, fov, near: 0.1, far: 40 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: false,
          alpha: false,
          powerPreference: 'high-performance',
          stencil: false,
          depth: true,
        }}
      >
        <Suspense fallback={null}>
          <SceneContent variant={variant} />
          <EffectComposer>
            <Bloom
              intensity={0.1}
              luminanceThreshold={0.05}
              luminanceSmoothing={0.9}
              mipmapBlur
            />
          </EffectComposer>
        </Suspense>
      </Canvas>
      {children}
    </div>
  );
};

export default HistoricalBackground;
