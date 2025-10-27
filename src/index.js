import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Hub from './pages/Hub';
import Ferramentas from './pages/Ferramentas';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import reportWebVitals from './reportWebVitals';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { Analytics } from "@vercel/analytics/react";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>

        <Route path="/hub" element={<Hub />} />

        <Route path="/portfolio" element={<App />} />

        <Route path="/ferramentas" element={<Ferramentas />} />

        {/* opcional: abre direto no hub quando acessar "/" */}
        <Route path="/" element={<Hub />} />
      </Routes>
      <SpeedInsights />
      <Analytics />
    </Router>
  </React.StrictMode>
);

reportWebVitals();
