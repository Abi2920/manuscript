import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HistoricalBackground from '../components/three/HistoricalBackground';
import { AntiqueInput, AntiqueButton, ParchmentCard } from '../components/ui';
import API from '../utils/api';

const categories = [
  { value: 'manuscript', label: 'Manuscript', icon: '◈' },
  { value: 'letter', label: 'Letter / Correspondence', icon: '◈' },
  { value: 'photograph', label: 'Photograph', icon: '◈' },
  { value: 'map', label: 'Map / Chart', icon: '◈' },
  { value: 'document', label: 'Official Document', icon: '◈' },
  { value: 'artifact', label: 'Artifact Record', icon: '◈' },
];

const FormPage = () => {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    category: '',
    file: null,
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, val]) => {
        if (val) formData.append(key, val);
      });
      await API.post('/contact', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setSuccess(true);
      setForm({ name: '', email: '', phone: '', message: '', category: '', file: null });
    } catch (err) {
      setError(err.response?.data?.error || 'Submission failed');
    } finally {
      setLoading(false);
    }
  };

  const isValid = form.name && form.email && form.message;

  return (
    <div className="relative min-h-screen">
      <HistoricalBackground variant="form" />

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-24">
        <div className="w-full max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-10"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 150, delay: 0.2 }}
              className="w-20 h-20 mx-auto mb-5 rounded-sm flex items-center justify-center relative"
              style={{
                background: 'linear-gradient(135deg, rgba(201,168,76,0.15), rgba(184,134,11,0.15))',
                border: '1px solid rgba(201,168,76,0.15)',
              }}
            >
              <span className="text-2xl" style={{ color: '#C9A84C' }}>◈</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-3xl md:text-5xl font-display font-bold mb-3"
            >
              <span className="text-gold">Submit to the</span>{' '}
              <span style={{ color: 'rgba(245, 230, 200, 0.7)' }}>Archive</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-sm max-w-lg mx-auto"
              style={{ color: 'rgba(245, 230, 200, 0.3)' }}
            >
              Contribute your documents and records to our growing historical collection
            </motion.p>
          </motion.div>

          <AnimatePresence mode="wait">
            {success ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-16"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                  className="w-24 h-24 mx-auto mb-6 rounded-sm flex items-center justify-center relative"
                  style={{
                    background: 'linear-gradient(135deg, rgba(201,168,76,0.15), rgba(184,134,11,0.15))',
                    border: '1px solid rgba(201,168,76,0.2)',
                  }}
                >
                  <span className="text-4xl" style={{ color: '#C9A84C' }}>✓</span>
                </motion.div>
                <h2 className="text-2xl font-display font-bold text-gold mb-3">Submission Received</h2>
                <p className="text-sm mb-8" style={{ color: 'rgba(245, 230, 200, 0.4)' }}>
                  Your contribution has been added to the archive. Our team will review it shortly.
                </p>
                <AntiqueButton onClick={() => setSuccess(false)}>
                  Submit Another Record
                </AntiqueButton>
              </motion.div>
            ) : (
              <ParchmentCard className="p-8 md:p-10">
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

                {/* Step indicators */}
                <div className="flex items-center justify-center gap-3 mb-8">
                  {[1, 2, 3].map((s) => (
                    <div key={s} className="flex items-center gap-3">
                      <motion.div
                        animate={{
                          backgroundColor: step >= s ? '#C9A84C' : 'rgba(201, 168, 76, 0.06)',
                        }}
                        className="w-8 h-8 rounded-sm flex items-center justify-center text-xs font-display font-bold transition-all"
                        style={{ color: step >= s ? '#1A1208' : 'rgba(245, 230, 200, 0.3)' }}
                      >
                        {step > s ? '✓' : s}
                      </motion.div>
                      {s < 3 && (
                        <motion.div
                          animate={{ backgroundColor: step > s ? '#C9A84C' : 'rgba(201, 168, 76, 0.06)' }}
                          className="w-12 h-px transition-all"
                        />
                      )}
                    </div>
                  ))}
                </div>

                <form onSubmit={handleSubmit}>
                  {step === 1 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                    >
                      <AntiqueInput
                        label="Full Name"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                      />
                      <AntiqueInput
                        label="Email Address"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                      />
                      <AntiqueInput
                        label="Phone Number"
                        name="phone"
                        type="tel"
                        value={form.phone}
                        onChange={handleChange}
                      />
                      <div className="pt-4 flex justify-end">
                        <AntiqueButton type="button" onClick={() => setStep(2)} className="px-8">
                          Next
                        </AntiqueButton>
                      </div>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                    >
                      <label
                        className="block text-xs tracking-wider uppercase mb-3 font-display"
                        style={{ color: 'rgba(245, 230, 200, 0.35)' }}
                      >
                        Record Category
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-5">
                        {categories.map((cat) => (
                          <motion.button
                            key={cat.value}
                            type="button"
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setForm({ ...form, category: cat.value })}
                            className="p-3.5 text-left transition-all duration-300 text-sm"
                            style={{
                              background: form.category === cat.value
                                ? 'rgba(201, 168, 76, 0.08)'
                                : 'rgba(255, 255, 255, 0.02)',
                              border: form.category === cat.value
                                ? '1px solid rgba(201, 168, 76, 0.3)'
                                : '1px solid rgba(255, 255, 255, 0.04)',
                              color: form.category === cat.value ? '#C9A84C' : 'rgba(245, 230, 200, 0.4)',
                            }}
                          >
                            <span className="mr-2">{cat.icon}</span>
                            {cat.label}
                          </motion.button>
                        ))}
                      </div>

                      <div className="relative mb-5">
                        <label
                          className="block text-xs tracking-wider uppercase mb-2 font-display"
                          style={{ color: 'rgba(245, 230, 200, 0.35)' }}
                        >
                          Description
                        </label>
                        <textarea
                          name="message"
                          value={form.message}
                          onChange={handleChange}
                          rows={5}
                          required
                          className="w-full px-4 py-3.5 text-sm rounded-sm transition-all duration-300 outline-none border resize-none font-body"
                          style={{
                            background: 'rgba(255,255,255,0.02)',
                            border: '1px solid rgba(255,255,255,0.06)',
                            color: '#F5E6C8',
                          }}
                          placeholder="Describe the document or record you are submitting..."
                        />
                      </div>

                      <div className="flex justify-between pt-4">
                        <AntiqueButton type="button" onClick={() => setStep(1)} variant="secondary" className="px-8">
                          Back
                        </AntiqueButton>
                        <AntiqueButton type="button" onClick={() => setStep(3)} className="px-8">
                          Next
                        </AntiqueButton>
                      </div>
                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                    >
                      <div className="mb-6">
                        <label
                          className="block text-xs tracking-wider uppercase mb-3 font-display"
                          style={{ color: 'rgba(245, 230, 200, 0.35)' }}
                        >
                          Upload Document
                        </label>
                        <div
                          className="relative px-8 py-8 text-center cursor-pointer group transition-all duration-300"
                          style={{
                            border: '1px dashed rgba(201, 168, 76, 0.15)',
                            background: 'rgba(201, 168, 76, 0.02)',
                          }}
                          onClick={() => document.getElementById('file-upload')?.click()}
                        >
                          <input
                            id="file-upload"
                            name="file"
                            type="file"
                            onChange={handleChange}
                            className="hidden"
                          />
                          <motion.div
                            animate={{ y: [0, -4, 0] }}
                            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                            className="text-3xl mb-3"
                          >
                            {form.file ? '📄' : '⬆'}
                          </motion.div>
                          <p className="text-sm font-body" style={{ color: 'rgba(245, 230, 200, 0.3)' }}>
                            {form.file ? form.file.name : 'Click to upload a document'}
                          </p>
                          <p className="text-xs mt-1 font-body" style={{ color: 'rgba(245, 230, 200, 0.15)' }}>
                            Max 5MB — PDF, Images, Text Files
                          </p>
                        </div>
                      </div>

                      <div
                        className="p-5 mb-5"
                        style={{
                          background: 'rgba(201, 168, 76, 0.03)',
                          border: '1px solid rgba(201, 168, 76, 0.06)',
                        }}
                      >
                        <h3
                          className="text-xs tracking-wider uppercase mb-3 font-display"
                          style={{ color: 'rgba(245, 230, 200, 0.35)' }}
                        >
                          Review Submission
                        </h3>
                        <div className="space-y-2 text-sm font-body">
                          {[
                            { label: 'Name', value: form.name },
                            { label: 'Email', value: form.email },
                            { label: 'Phone', value: form.phone || '—' },
                            { label: 'Category', value: categories.find((c) => c.value === form.category)?.label || 'General' },
                          ].map((item) => (
                            <div key={item.label} className="flex justify-between items-center py-1" style={{ borderBottom: '1px solid rgba(201, 168, 76, 0.04)' }}>
                              <span style={{ color: 'rgba(245, 230, 200, 0.3)' }}>{item.label}</span>
                              <span style={{ color: '#F5E6C8' }}>{item.value}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex justify-between pt-4">
                        <AntiqueButton type="button" onClick={() => setStep(2)} variant="secondary" className="px-8">
                          Back
                        </AntiqueButton>
                        <AntiqueButton type="submit" loading={loading} disabled={!isValid} className="px-10">
                          {loading ? 'Submitting...' : 'Submit to Archive'}
                        </AntiqueButton>
                      </div>
                    </motion.div>
                  )}
                </form>
              </ParchmentCard>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default FormPage;
