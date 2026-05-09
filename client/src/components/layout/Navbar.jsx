import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { isAuthenticated, logout, getUser } from '../../utils/auth';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const auth = isAuthenticated();
  const user = getUser();

  useEffect(() => {
    const handle = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handle);
    return () => window.removeEventListener('scroll', handle);
  }, []);

  const links = [
    { to: '/', label: 'Home' },
    { to: '/form', label: 'Archive' },
    ...(auth ? [{ to: '/dashboard', label: 'Records' }] : []),
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled
          ? 'bg-[#1A1208]/90 backdrop-blur-xl border-b border-antique-gold/10'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-sm bg-gradient-to-br from-antique-gold to-antique-brass flex items-center justify-center">
            <span className="text-[10px] font-bold" style={{ color: '#1A1208' }}>H</span>
          </div>
          <span className="font-display text-lg tracking-wider">
            <span style={{ color: '#C9A84C' }}>Manuscript</span>
            <span style={{ color: 'rgba(245, 230, 200, 0.6)' }}>Record</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-xs tracking-widest uppercase transition-all duration-300 relative font-body ${
                location.pathname === link.to
                  ? 'text-antique-gold'
                  : 'text-white/30 hover:text-white/60'
              }`}
            >
              {link.label}
              {location.pathname === link.to && (
                <motion.div
                  layoutId="nav-indicator-historical"
                  className="absolute -bottom-1 left-0 right-0 h-px"
                  style={{
                    background: 'linear-gradient(90deg, #C9A84C, transparent)',
                  }}
                />
              )}
            </Link>
          ))}

          {auth ? (
            <div className="flex items-center gap-4">
              <span className="text-white/20 text-xs font-body">{user?.name}</span>
              <button
                onClick={logout}
                className="text-xs text-white/30 hover:text-antique-burgundy transition-colors font-body uppercase tracking-wider"
              >
                Exit
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link
                to="/login"
                className="text-xs text-white/40 hover:text-antique-gold transition-colors uppercase tracking-wider font-body"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text-xs px-5 py-2 uppercase tracking-wider font-display font-semibold"
                style={{
                  background: 'linear-gradient(135deg, #C9A84C, #B8860B)',
                  color: '#1A1208',
                }}
              >
                Register
              </Link>
            </div>
          )}
        </div>

        <button
          className="md:hidden relative w-8 h-8 flex flex-col items-center justify-center gap-1.5"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <motion.span
            animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
            className="w-6 h-px bg-antique-gold/60 rounded"
          />
          <motion.span
            animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
            className="w-6 h-px bg-antique-gold/60 rounded"
          />
          <motion.span
            animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
            className="w-6 h-px bg-antique-gold/60 rounded"
          />
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-antique-gold/10 bg-[#1A1208]/95 backdrop-blur-xl"
          >
            <div className="px-6 py-4 space-y-4">
              {links.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMenuOpen(false)}
                  className={`block text-xs uppercase tracking-wider font-body ${
                    location.pathname === link.to ? 'text-antique-gold' : 'text-white/30'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              {!auth && (
                <>
                  <Link to="/login" onClick={() => setMenuOpen(false)} className="block text-xs uppercase tracking-wider text-white/30 font-body">Login</Link>
                  <Link to="/register" onClick={() => setMenuOpen(false)} className="block text-xs uppercase tracking-wider text-antique-gold font-body">Register</Link>
                </>
              )}
              {auth && (
                <button onClick={logout} className="text-xs uppercase tracking-wider text-antique-burgundy font-body">Exit</button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
