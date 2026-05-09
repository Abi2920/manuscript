import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

const LoadingScreen = () => (
  <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: '#1A1208' }}>
    <div className="text-center">
      <div className="relative w-24 h-24 mx-auto mb-8">
        <div className="absolute inset-0 border border-antique-gold/20 rounded-full animate-ping" />
        <div className="absolute inset-2 border border-antique-brass/30 rounded-full" style={{ animation: 'spin 3s linear infinite' }} />
        <div className="absolute inset-4 rounded-full" style={{ background: 'radial-gradient(circle, rgba(201,168,76,0.3), transparent)' }} />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-antique-gold/40 text-2xl">◈</span>
        </div>
      </div>
      <p className="text-antique-gold/60 font-mono text-xs tracking-[0.3em] animate-pulse">
        OPENING THE ARCHIVE
      </p>
    </div>
  </div>
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Suspense fallback={<LoadingScreen />}>
        <App />
      </Suspense>
    </BrowserRouter>
  </React.StrictMode>
);
