import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Home from './pages/Home';
import Predict from './pages/predict';
import Result from './pages/Result';
import Insights from './pages/insights';
import Manual from './pages/Manual';  // ✅ Make sure this import is correct
import Navbar from './components/Navbar';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/predict" element={<Predict />} />
        <Route path="/result" element={<Result />} />
        <Route path="/insights" element={<Insights />} />
        <Route path="/manual" element={<Manual />} />  {/* ✅ This must match */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
