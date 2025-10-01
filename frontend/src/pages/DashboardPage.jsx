import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './DashboardPage.css';
import UserList from '../components/UserList/UserList';
import ChannelChart from '../components/ChannelChart/ChannelChart';
import { Group, BarChart, Hub } from '@mui/icons-material';

const Dashboard = () => {
  const canvasRef = useRef(null);
  const navigate = useNavigate();

  // Background Canvas Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resize();
    window.addEventListener('resize', resize);

    const particles = [];
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1
      });
    }
    
    let animationId;
    
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      particles.forEach(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
        
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 123, 255, 0.1)';
        ctx.fill();
      });
      
      // Draw connections
      particles.forEach((particle, i) => {
        particles.slice(i + 1).forEach(otherParticle => {
          const distance = Math.sqrt(
            Math.pow(particle.x - otherParticle.x, 2) + 
            Math.pow(particle.y - otherParticle.y, 2)
          );
          
          if (distance < 150) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.strokeStyle = `rgba(0, 123, 255, ${0.1 * (1 - distance / 150)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        });
      });
      
      animationId = requestAnimationFrame(animate);
    }
    
    animate();
    
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  const handleNodeClick = (path) => {
    navigate(path);
  };

  return (
    <div className="dashboard-container">
      <canvas className="neural-background" ref={canvasRef} />

      <div className="main-container">
        <section className="card neural-canvas">
          <div className="card-header">
            <Hub />
            <h2 className="card-title">Neural Engagement Network</h2>
          </div>
          <div className="neural-network">
            <div className="neural-node-container">
              <div className="neural-node" onClick={() => handleNodeClick('/chat')}>
                <div className="neural-node-icon">💬</div>
                <div className="neural-node-label">Chat</div>
              </div>
              <div className="neural-node" onClick={() => handleNodeClick('/voice')}>
                <div className="neural-node-icon">🎙️</div>
                <div className="neural-node-label">Voice</div>
              </div>
              <div className="neural-node" onClick={() => handleNodeClick('/emails')}>
                <div className="neural-node-icon">📧</div>
                <div className="neural-node-label">Email</div>
              </div>
            </div>
          </div>
        </section>

        <section className="card">
          <div className="card-header">
            <Group />
            <h2 className="card-title">User List</h2>
          </div>
          <UserList />
        </section>

        <section className="card channel-chart-container">
          <div className="card-header">
            <BarChart />
            <h2 className="card-title">Channel Data</h2>
          </div>
          <ChannelChart />
        </section>
      </div>
    </div>
  );
};

export default Dashboard;