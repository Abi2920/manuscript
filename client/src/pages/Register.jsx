import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import API from '../utils/api';
import { AntiqueInput, AntiqueButton, ParchmentCard } from '../components/ui';
import HistoricalBackground from '../components/three/HistoricalBackground';

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const { data } = await API.post('/auth/register', form);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-6">
      <HistoricalBackground variant="auth" />
      <div className="relative z-10 w-full max-w-md">
        <ParchmentCard className="p-8 md:p-10">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-8"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
              className="w-16 h-16 mx-auto mb-4 rounded-sm flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, rgba(201,168,76,0.15), rgba(184,134,11,0.15))',
                border: '1px solid rgba(201,168,76,0.15)',
              }}
            >
              <span className="text-lg" style={{ color: '#C9A84C' }}>◈</span>
            </motion.div>
            <h1 className="text-xl font-display font-bold text-gold">New Contributor</h1>
            <p className="text-xs mt-2 font-body" style={{ color: 'rgba(245, 230, 200, 0.3)' }}>
              Join the Archive today
            </p>
          </motion.div>

          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-6 px-4 py-3"
              style={{
                background: 'rgba(139, 0, 0, 0.1)',
                border: '1px solid rgba(139, 0, 0, 0.2)',
              }}
            >
              <p className="text-sm" style={{ color: '#8B0000' }}>{error}</p>
            </motion.div>
          )}

          <form onSubmit={handleSubmit}>
            <AntiqueInput
              label="Full Name"
              name="name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
            <AntiqueInput
              label="Email"
              name="email"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
            <AntiqueInput
              label="Password"
              name="password"
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
            <AntiqueButton type="submit" loading={loading} className="w-full mt-2">
              Register
            </AntiqueButton>
          </form>

          <p className="text-center text-xs mt-6 font-body" style={{ color: 'rgba(245, 230, 200, 0.25)' }}>
            Already a contributor?{' '}
            <Link to="/login" style={{ color: '#C9A84C' }} className="hover:underline">
              Sign In
            </Link>
          </p>
        </ParchmentCard>
      </div>
    </div>
  );
};

export default Register;
