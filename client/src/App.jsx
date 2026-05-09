import { lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/layout/Navbar';

const Home = lazy(() => import('./pages/Home'));
const FormPage = lazy(() => import('./pages/FormPage'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const NotFound = lazy(() => import('./pages/NotFound'));

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center" style={{ background: '#1A1208' }}>
    <div className="text-center">
      <div className="relative w-20 h-20 mx-auto mb-6">
        <div className="absolute inset-0 border border-antique-gold/15 rounded-full animate-ping" />
        <div className="absolute inset-1" style={{ border: '1px solid rgba(201,168,76,0.2)', borderRadius: '50%', animation: 'spin 2s linear infinite', borderTopColor: 'transparent' }} />
        <div className="absolute inset-3" style={{ border: '1px solid rgba(184,134,11,0.15)', borderRadius: '50%', animation: 'spin 3s linear infinite reverse', borderBottomColor: 'transparent' }} />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-antique-gold/20 text-3xl font-display">◈</span>
        </div>
      </div>
      <p className="text-antique-gold/50 font-mono text-xs tracking-[0.3em] animate-pulse">
        OPENING THE ARCHIVE
      </p>
      <div className="flex gap-1.5 justify-center mt-4">
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            className="w-1 h-1 rounded-full"
            style={{ background: '#C9A84C' }}
            animate={{ opacity: [0.1, 0.6, 0.1] }}
            transition={{ duration: 1.5, delay: i * 0.2, repeat: Infinity }}
          />
        ))}
      </div>
    </div>
  </div>
);

const PageWrapper = ({ children }) => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

const App = () => {
  return (
    <>
      <Navbar />
      <Suspense fallback={<PageLoader />}>
        <PageWrapper>
          <Routes location={useLocation().pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/form" element={<FormPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </PageWrapper>
      </Suspense>
    </>
  );
};

export default App;
