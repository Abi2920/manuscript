import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import HistoricalBackground from '../components/three/HistoricalBackground';
import AntiqueButton from '../components/ui/AntiqueButton';
import ParchmentCard from '../components/ui/ParchmentCard';

const FeatureCard = ({ icon, title, desc, index }) => (
  <ParchmentCard
    className="p-6 cursor-default group"
    style={{ animationDelay: `${index * 0.1}s` }}
  >
    <div className="flex items-center gap-3 mb-4">
      <div
        className="w-10 h-10 flex items-center justify-center text-base group-hover:scale-110 transition-all duration-500"
        style={{ background: 'rgba(184, 151, 69, 0.06)' }}
      >
        <span style={{ color: '#B89745' }}>{icon}</span>
      </div>
      <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg, rgba(184,151,69,0.1), transparent)' }} />
    </div>
    <h3 className="font-display text-base font-semibold mb-2" style={{ color: '#F4E4C1' }}>
      {title}
    </h3>
    <p className="text-xs leading-relaxed font-body" style={{ color: 'rgba(244, 228, 193, 0.35)' }}>
      {desc}
    </p>
  </ParchmentCard>
);

const Home = () => {
  const heroRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.reveal-text', {
        y: 40,
        opacity: 0,
        stagger: 0.12,
        duration: 1.2,
        ease: 'power4.out',
        delay: 0.3,
      });

      gsap.from('.fade-element', {
        y: 25,
        opacity: 0,
        stagger: 0.12,
        duration: 1,
        ease: 'power3.out',
        delay: 0.9,
      });

      gsap.to('.gold-glow-pulse', {
        boxShadow: '0 0 40px rgba(184, 151, 69, 0.15), 0 0 80px rgba(138, 112, 48, 0.06)',
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  const features = [
    { icon: '◈', title: 'The Grand Archive', desc: 'A digital repository for preserving manuscripts, letters, maps, and historical documents across centuries of human history.' },
    { icon: '◈', title: 'Manuscript Registry', desc: 'Submit and catalog historical documents with detailed metadata, provenance tracking, and scholarly categorization.' },
    { icon: '◈', title: 'Research Repository', desc: 'Advanced search and filtering tools for historians, genealogists, and academic researchers exploring primary sources.' },
    { icon: '◈', title: 'Secure Vault', desc: 'JWT-protected access with role-based permissions ensuring sensitive historical records remain preserved and protected.' },
    { icon: '◈', title: 'Digital Preservation', desc: 'Automated archival standards, version control, and long-term digital preservation following library science best practices.' },
    { icon: '◈', title: 'Contributor Network', desc: 'A growing community of historians, archivists, and collectors dedicated to safeguarding our shared heritage.' },
  ];

  return (
    <div className="relative">
      <HistoricalBackground variant="full" />

      <div ref={heroRef} className="relative z-10 min-h-screen flex items-center justify-center px-6">
        <div className="text-center max-w-4xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="inline-flex items-center gap-3 px-4 py-2 mb-10 fade-element"
            style={{
              border: '1px solid rgba(184, 151, 69, 0.06)',
              background: 'rgba(184, 151, 69, 0.02)',
            }}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#B89745] opacity-40" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#B89745]" />
            </span>
            <span className="text-[9px] tracking-[0.25em] uppercase font-mono" style={{ color: 'rgba(184, 151, 69, 0.5)' }}>
              Est. 2024 — Digital Archive
            </span>
          </motion.div>

          <div ref={titleRef}>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-[1.1] mb-6">
              <span className="reveal-text block text-gold">History</span>
              <span className="reveal-text block text-2xl md:text-3xl lg:text-4xl font-light mt-4" style={{ color: 'rgba(244, 228, 193, 0.45)' }}>
                Preserving the Past for the Future
              </span>
            </h1>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3, duration: 0.8 }}
            className="text-sm md:text-base max-w-2xl mx-auto mb-12 leading-relaxed fade-element font-body"
            style={{ color: 'rgba(244, 228, 193, 0.25)' }}
          >
            A digital archive and manuscript management system designed for historians,
            researchers, and institutions dedicated to preserving our shared heritage.
            Explore, contribute, and discover history through the lens of modern technology.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.7, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-5 fade-element"
          >
            <Link to="/form">
              <AntiqueButton className="px-10">
                Submit to Archive
              </AntiqueButton>
            </Link>
            <Link to="/register">
              <AntiqueButton variant="secondary" className="px-10">
                Become a Contributor
              </AntiqueButton>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.3 }}
            className="mt-16 flex items-center justify-center gap-6"
            style={{ color: 'rgba(244, 228, 193, 0.1)' }}
          >
            {['Archive', 'Manuscript', 'Record', 'Vault', 'Scroll'].map((word) => (
              <span
                key={word}
                className="px-3 py-1.5 text-[9px] font-mono tracking-widest uppercase"
                style={{ border: '1px solid rgba(184, 151, 69, 0.05) , color: rgba(184, 151, 69, 0.3)' }}
              >
                {word}
              </span>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Ornamental divider */}
      <div className="relative z-10 flex items-center justify-center gap-3 px-6 mb-20">
        <div className="h-px flex-1 max-w-[120px]" style={{ background: 'linear-gradient(90deg, transparent, rgba(184,151,69,0.08))' }} />
        <span className="text-xs" style={{ color: 'rgba(184, 151, 69, 0.2)' }}>◈</span>
        <div className="h-px flex-1 max-w-[120px]" style={{ background: 'linear-gradient(90deg, rgba(184,151,69,0.08), transparent)' }} />
      </div>

      {/* Features */}
      <div className="relative z-10 px-6 pb-24">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-block relative">
              <h2 className="text-3xl md:text-5xl font-display font-bold mb-3">
                <span className="text-gold">The Archive</span>
              </h2>
              <div className="flex items-center justify-center gap-2 mt-3">
                <div className="h-px w-8" style={{ background: 'rgba(184,151,69,0.15)' }} />
                <span className="text-[8px]" style={{ color: 'rgba(184,151,69,0.25)' }}>◈</span>
                <div className="h-px w-8" style={{ background: 'rgba(184,151,69,0.15)' }} />
              </div>
            </div>
            <p className="text-sm max-w-xl mx-auto mt-4 font-body" style={{ color: 'rgba(244, 228, 193, 0.25)' }}>
              Every instrument designed with the preservation of history in mind
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((feature, i) => (
              <FeatureCard key={i} {...feature} index={i} />
            ))}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="relative z-10 px-6 pb-24">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Documents Archived', value: '10K+' },
              { label: 'Active Contributors', value: '500+' },
              { label: 'Centuries Covered', value: '30+' },
              { label: 'Record Categories', value: '50+' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative text-center p-6"
                style={{
                  background: 'rgba(26, 14, 8, 0.5)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(184, 151, 69, 0.04)',
                }}
              >
                <div className="text-2xl md:text-3xl font-display font-bold text-gold mb-1">
                  {stat.value}
                </div>
                <div className="text-[9px] tracking-widest uppercase font-body" style={{ color: 'rgba(244, 228, 193, 0.25)' }}>
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="relative z-10 px-6 pb-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center p-12 md:p-16 gold-glow-pulse relative overflow-hidden"
          style={{
            background: 'rgba(26, 14, 8, 0.7)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(184, 151, 69, 0.06)',
          }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(184, 151, 69, 0.02), transparent)',
            }}
          />

          {/* Ornamental header */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="h-px w-12" style={{ background: 'linear-gradient(90deg, transparent, rgba(184,151,69,0.1))' }} />
            <span className="text-[8px]" style={{ color: 'rgba(184,151,69,0.2)' }}>◈</span>
            <div className="h-px w-12" style={{ background: 'linear-gradient(90deg, rgba(184,151,69,0.1), transparent)' }} />
          </div>

          <div className="relative z-10">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-display font-bold mb-4"
            >
              <span className="text-gold">Join the Archive</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-sm mb-10 max-w-lg mx-auto font-body"
              style={{ color: 'rgba(244, 228, 193, 0.25)' }}
            >
              Become part of a growing community dedicated to preserving our shared history
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <Link to="/form">
                <AntiqueButton className="px-12">
                  Begin Your Contribution
                </AntiqueButton>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="relative z-10 px-6 py-10" style={{ borderTop: '1px solid rgba(184, 151, 69, 0.03)' }}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #B89745, #8A7030)' }}>
              <span className="text-[8px] font-bold" style={{ color: '#0D0806' }}>H</span>
            </div>
            <span className="text-sm font-display font-semibold tracking-wider text-gold">
              History Form
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[9px] font-mono" style={{ color: 'rgba(244, 228, 193, 0.12)' }}>v1.0</span>
            <span className="text-[9px] font-mono" style={{ color: 'rgba(184, 151, 69, 0.15)' }}>◈</span>
            <span className="text-[10px] font-body" style={{ color: 'rgba(244, 228, 193, 0.12)' }}>
              &copy; {new Date().getFullYear()} History Form Archive
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
