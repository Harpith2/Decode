import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import SignPage from './components/signPage';
import Dashboard from './components/Dashboard';
import LearnPage from './components/LearnPage';
import DSA from './components/DSA';
import Search from './components/Search/Search';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/learn" element={<LearnPage />} />
          <Route path="/signin" element={<SignPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dsa" element={<DSA />} />
          <Route path="/search" element={<Search />} />
          <Route path="/" element={<Navigate to="/signin" />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;