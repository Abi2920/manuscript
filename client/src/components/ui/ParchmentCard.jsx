import { useRef, useState } from 'react';
import { motion } from 'framer-motion';

const ParchmentCard = ({ children, className = '', style, ...props }) => {
  const cardRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [hovered, setHovered] = useState(false);

  const handleMouse = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouse}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`relative overflow-hidden ${className}`}
      style={{
        background: 'rgba(26, 14, 8, 0.85)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        border: '1px solid rgba(184, 151, 69, 0.08)',
        boxShadow: hovered
          ? '0 20px 60px rgba(0, 0, 0, 0.7), 0 0 40px rgba(184, 151, 69, 0.04)'
          : '0 8px 32px rgba(0, 0, 0, 0.5)',
        transform: hovered ? 'translateY(-1px)' : 'translateY(0)',
        transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        ...style,
      }}
      {...props}
    >
      {hovered && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(500px circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, rgba(184, 151, 69, 0.03), transparent 50%)`,
          }}
        />
      )}

      {/* Gold top border accent */}
      <div
        className="absolute top-0 left-4 right-4 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(184, 151, 69, 0.15), transparent)',
        }}
      />

      {/* Ornamental corners */}
      <span
        className="absolute top-2 left-2 text-[6px] pointer-events-none"
        style={{ color: 'rgba(184, 151, 69, 0.1)' }}
      >
        ◈
      </span>
      <span
        className="absolute top-2 right-2 text-[6px] pointer-events-none"
        style={{ color: 'rgba(184, 151, 69, 0.1)' }}
      >
        ◈
      </span>
      <span
        className="absolute bottom-2 left-2 text-[6px] pointer-events-none"
        style={{ color: 'rgba(184, 151, 69, 0.1)' }}
      >
        ◈
      </span>
      <span
        className="absolute bottom-2 right-2 text-[6px] pointer-events-none"
        style={{ color: 'rgba(184, 151, 69, 0.1)' }}
      >
        ◈
      </span>

      {children}
    </motion.div>
  );
};

export default ParchmentCard;
