import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import EmailPage from './pages/EmailPage';
import EmailDetailsPage from './pages/EmailDetailsPage';
import ChatPage from './pages/ChatPage';
import VoicePage from './pages/VoicePage';
import Layout from './components/Layout/Layout';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<LoginPage />} />
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/emails" element={<EmailPage />} />
          <Route path="/emails/:id" element={<EmailDetailsPage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/voice" element={<VoicePage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;