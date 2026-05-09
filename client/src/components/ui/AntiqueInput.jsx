import { useState } from 'react';
import { motion } from 'framer-motion';

const AntiqueInput = ({ label, name, type = 'text', value, onChange, onFocus, onBlur, required, error }) => {
  const [focused, setFocused] = useState(false);

  const hasValue = value && value.length > 0;

  return (
    <div className="relative mb-5 group">
      <motion.label
        htmlFor={name}
        className="absolute left-4 pointer-events-none font-display text-xs tracking-wider transition-all duration-300 z-10"
        style={{
          color: focused ? '#C9A84C' : error ? '#8B0000' : 'rgba(245, 230, 200, 0.35)',
        }}
        animate={{
          y: focused || hasValue ? -26 : 0,
          scale: focused || hasValue ? 0.9 : 1,
        }}
      >
        {label}
      </motion.label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        onFocus={() => { setFocused(true); onFocus?.(); }}
        onBlur={(e) => { setFocused(false); onBlur?.(); }}
        required={required}
        className={`
          w-full px-4 py-3.5 text-sm text-parchment-100 rounded-sm
          transition-all duration-300 outline-none
          bg-white/[0.03] border
          ${error ? 'border-antique-burgundy' : focused ? 'border-antique-gold' : 'border-white/[0.06]'}
          focus:border-antique-gold
          placeholder-transparent
          font-body
        `}
        style={{
          boxShadow: focused
            ? '0 0 15px rgba(201, 168, 76, 0.06), inset 0 0 15px rgba(201, 168, 76, 0.02)'
            : 'none',
        }}
      />
      {focused && (
        <motion.div
          className="absolute bottom-0 left-0 h-px"
          style={{
            background: 'linear-gradient(90deg, #C9A84C, #B8860B)',
          }}
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 0.4 }}
        />
      )}
      {error && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-antique-burgundy text-xs mt-1 ml-1 font-body"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
};

export default AntiqueInput;
