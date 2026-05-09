import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import AntiqueButton from '../components/ui/AntiqueButton';
import HistoricalBackground from '../components/three/HistoricalBackground';

const NotFound = () => (
  <div className="relative min-h-screen flex items-center justify-center">
    <HistoricalBackground variant="auth" />
    <div className="relative z-10 text-center px-6">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 150, delay: 0.2 }}
        className="w-28 h-28 mx-auto mb-6 rounded-sm flex items-center justify-center"
        style={{
          background: 'linear-gradient(135deg, rgba(201,168,76,0.15), rgba(184,134,11,0.15))',
          border: '1px solid rgba(201,168,76,0.15)',
        }}
      >
        <span className="text-5xl font-display font-bold" style={{ color: '#C9A84C' }}>?</span>
      </motion.div>
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-6xl md:text-8xl font-display font-bold text-gold mb-3"
      >
        404
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-sm mb-8 font-body"
        style={{ color: 'rgba(245, 230, 200, 0.35)' }}
      >
        This page has been lost to history
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <Link to="/">
          <AntiqueButton>Return to Archive</AntiqueButton>
        </Link>
      </motion.div>
    </div>
  </div>
);

export default NotFound;
