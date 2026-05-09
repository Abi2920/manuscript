import { useRef, useState } from 'react';
import { motion } from 'framer-motion';

const AntiqueButton = ({ children, onClick, type = 'button', disabled, className = '', loading, variant = 'primary' }) => {
  const btnRef = useRef(null);
  const [hovered, setHovered] = useState(false);

  const isPrimary = variant === 'primary';

  return (
    <motion.button
      ref={btnRef}
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ scale: 1.015 }}
      whileTap={{ scale: 0.97 }}
      className={`
        relative overflow-hidden font-display font-semibold text-xs
        tracking-[0.15em] uppercase transition-all duration-300
        disabled:opacity-40 disabled:cursor-not-allowed
        ${className}
      `}
      style={{
        padding: isPrimary ? '14px 36px' : '13px 36px',
        background: isPrimary
          ? 'linear-gradient(135deg, #B89745, #8A7030, #6B5220)'
          : 'transparent',
        border: isPrimary ? 'none' : '1px solid rgba(184, 151, 69, 0.25)',
        color: isPrimary ? '#0D0806' : '#B89745',
        boxShadow: hovered && isPrimary
          ? '0 0 30px rgba(184, 151, 69, 0.25), inset 0 0 20px rgba(255, 255, 255, 0.03)'
          : isPrimary ? '0 0 15px rgba(184, 151, 69, 0.1)' : 'none',
      }}
    >
      {hovered && isPrimary && (
        <motion.div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.06), transparent)',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        />
      )}
      {hovered && !isPrimary && (
        <motion.div
          className="absolute inset-0"
          style={{ background: 'rgba(184, 151, 69, 0.04)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        />
      )}

      {/* Decorative line on primary buttons */}
      {isPrimary && (
        <div
          className="absolute top-0 left-3 right-3 h-px"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
          }}
        />
      )}

      <span className="relative z-10 flex items-center justify-center gap-2.5">
        {loading && (
          <svg className="animate-spin h-3.5 w-3.5" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        )}
        {children}
      </span>
    </motion.button>
  );
};

export default AntiqueButton;
