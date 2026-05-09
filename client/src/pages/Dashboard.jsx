import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../utils/auth';
import API from '../utils/api';
import ParchmentCard from '../components/ui/ParchmentCard';
import HistoricalBackground from '../components/three/HistoricalBackground';

const StatCard = ({ label, value, icon, delay }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [value]);

  const formatted = count >= 1000 ? `${(count / 1000).toFixed(1)}K` : count;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="relative overflow-hidden p-6"
      style={{
        background: 'rgba(44, 24, 16, 0.5)',
        backdropFilter: 'blur(16px)',
        border: '1px solid rgba(201, 168, 76, 0.06)',
      }}
    >
      <div className="flex items-start justify-between mb-4">
        <span className="text-xl" style={{ color: '#C9A84C' }}>{icon}</span>
        <div
          className="w-8 h-8 rounded-sm flex items-center justify-center"
          style={{ background: 'rgba(201, 168, 76, 0.08)' }}
        >
          <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#C9A84C' }} />
        </div>
      </div>
      <motion.p
        key={count}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-2xl font-display font-bold mb-1 text-gold"
      >
        {formatted}
      </motion.p>
      <p className="text-xs tracking-wider font-body" style={{ color: 'rgba(245, 230, 200, 0.3)' }}>
        {label}
      </p>
      <motion.div
        className="absolute bottom-0 left-0 h-px"
        style={{
          width: `${(value / Math.max(value, 1)) * 100}%`,
          background: 'linear-gradient(90deg, #C9A84C, transparent)',
        }}
      />
    </motion.div>
  );
};

const CategoryChart = ({ data }) => {
  if (!data || data.length === 0) {
    return <p className="text-xs text-center py-8 font-body" style={{ color: 'rgba(245, 230, 200, 0.2)' }}>No data yet</p>;
  }

  const maxVal = Math.max(...data.map((d) => d.count));

  return (
    <div className="space-y-3">
      {data.map((item, i) => (
        <motion.div
          key={item.category}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.1 }}
        >
          <div className="flex justify-between text-xs mb-1 font-body">
            <span className="capitalize" style={{ color: 'rgba(245, 230, 200, 0.4)' }}>{item.category}</span>
            <span style={{ color: 'rgba(245, 230, 200, 0.3)' }}>{item.count}</span>
          </div>
          <div className="h-1.5 overflow-hidden" style={{ background: 'rgba(201, 168, 76, 0.05)' }}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(item.count / maxVal) * 100}%` }}
              transition={{ duration: 1.5, delay: i * 0.1 + 0.5, ease: 'easeOut' }}
              className="h-full"
              style={{
                background: 'linear-gradient(90deg, #C9A84C, #B8860B, transparent)',
              }}
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
};

const RecentSubmissions = ({ submissions }) => {
  if (!submissions || submissions.length === 0) {
    return (
      <div className="text-center py-10">
        <div className="text-lg mb-2" style={{ color: 'rgba(201, 168, 76, 0.15)' }}>◈</div>
        <p className="text-xs font-body" style={{ color: 'rgba(245, 230, 200, 0.15)' }}>No submissions yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {submissions.map((sub, i) => (
        <motion.div
          key={sub.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
          className="flex items-center justify-between p-3 text-sm transition-all"
          style={{
            background: 'rgba(255, 255, 255, 0.015)',
            borderBottom: '1px solid rgba(201, 168, 76, 0.03)',
          }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-7 h-7 rounded-sm flex items-center justify-center text-xs font-display font-bold"
              style={{
                background: 'rgba(201, 168, 76, 0.1)',
                color: '#C9A84C',
              }}
            >
              {sub.name.charAt(0)}
            </div>
            <div>
              <p className="text-sm font-body" style={{ color: '#F5E6C8' }}>{sub.name}</p>
              <p className="text-xs font-body" style={{ color: 'rgba(245, 230, 200, 0.25)' }}>{sub.email}</p>
            </div>
          </div>
          <div className="text-right flex items-center gap-2">
            <span
              className="text-[10px] uppercase tracking-wider font-body px-2 py-0.5"
              style={{
                background: 'rgba(201, 168, 76, 0.05)',
                color: 'rgba(245, 230, 200, 0.3)',
              }}
            >
              {sub.category}
            </span>
            <span className="text-[10px] font-mono" style={{ color: 'rgba(245, 230, 200, 0.15)' }}>
              {new Date(sub.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/login');
      return;
    }
    const fetchData = async () => {
      try {
        const { data: res } = await API.get('/dashboard');
        setData(res);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [navigate]);

  const stats = data?.stats || {
    totalContacts: 0,
    totalUsers: 0,
    totalMessages: 0,
    totalUploads: 0,
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#1A1208' }}>
        <div className="text-center">
          <div className="relative w-14 h-14 mx-auto mb-4">
            <div className="absolute inset-0 border border-antique-gold/15 rounded-full animate-ping" />
            <div className="absolute inset-1 rounded-full" style={{ border: '1px solid rgba(201,168,76,0.2)', borderTopColor: 'transparent', animation: 'spin 2s linear infinite' }} />
            <div className="absolute inset-3" style={{ border: '1px solid rgba(184,134,11,0.15)', borderBottomColor: 'transparent', animation: 'spin 3s linear infinite reverse' }} />
          </div>
          <p className="text-antique-gold/40 text-xs font-mono tracking-widest animate-pulse">LOADING RECORDS</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen">
      <HistoricalBackground variant="dashboard" />

      <div className="relative z-10 pt-24 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center gap-2 mb-1">
              <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#C9A84C' }} />
              <span className="text-[10px] tracking-[0.2em] uppercase font-mono" style={{ color: 'rgba(245, 230, 200, 0.2)' }}>
                Archive Records
              </span>
            </div>
            <h1 className="text-2xl md:text-4xl font-display font-bold text-gold">
              Dashboard
            </h1>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatCard label="Total Records" value={stats.totalContacts} icon="◈" delay={0.1} />
            <StatCard label="Contributors" value={stats.totalUsers} icon="◈" delay={0.15} />
            <StatCard label="Messages" value={stats.totalMessages} icon="◈" delay={0.2} />
            <StatCard label="Uploads" value={stats.totalUploads} icon="◈" delay={0.25} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ParchmentCard className="p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-base font-display font-semibold" style={{ color: '#F5E6C8' }}>
                  Records by Category
                </h2>
                <div
                  className="w-6 h-6 rounded-sm flex items-center justify-center text-xs"
                  style={{ background: 'rgba(201, 168, 76, 0.08)' }}
                >
                  <span style={{ color: '#C9A84C' }}>◈</span>
                </div>
              </div>
              <CategoryChart data={data?.contactsByCategory} />
            </ParchmentCard>

            <ParchmentCard className="p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-base font-display font-semibold" style={{ color: '#F5E6C8' }}>
                  Recent Submissions
                </h2>
                <span className="text-[10px] font-mono" style={{ color: 'rgba(245, 230, 200, 0.15)' }}>
                  {data?.recentContacts?.length || 0} items
                </span>
              </div>
              <RecentSubmissions submissions={data?.recentContacts} />
            </ParchmentCard>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
