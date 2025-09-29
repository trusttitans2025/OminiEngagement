import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';
import wlLogo from '../assets/wl.png';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if ((email === 'admin@wl.com' || email === 'user@wl.com') && password) {
      // In a real app, you'd have more secure authentication
      localStorage.setItem('user', JSON.stringify({ email }));
      navigate('/dashboard');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="login-page">
      
      <div className="login-card">
        {/* <div className="login-header">
        <img src={wlLogo} alt="Worldline Logo" className="login-logo" />
        <h1 className="login-title">Worldline AI Interaction</h1>
      </div> */}
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
