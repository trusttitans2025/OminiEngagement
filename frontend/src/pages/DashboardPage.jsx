import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './DashboardPage.css';
import UserList from '../components/UserList/UserList';
import ChannelChart from '../components/ChannelChart/ChannelChart';
import { Group, BarChart, Hub } from '@mui/icons-material';

const Dashboard = () => {
  const canvasRef = useRef(null);
  const neuralNetworkRef = useRef(null);
  const navigate = useNavigate();
  const [activeChannel, setActiveChannel] = useState('all');

  // Neural Network Creation
  useEffect(() => {
    const container = neuralNetworkRef.current;
    if (!container) return;

    // Clear previous content
    container.innerHTML = '';

    const nodes = [
      { x: 20, y: 20, label: 'Chat', channel: 'chat', path: '/chat' },
      { x: 120, y: 60, label: 'Email', channel: 'email', path: '/emails' },
      { x: 220, y: 40, label: 'Social', channel: 'social', path: '/social' },
      { x: 80, y: 120, label: 'Voice', channel: 'voice', path: '/voice' },
      { x: 180, y: 150, label: 'SMS', channel: 'sms', path: '/sms' },
      { x: 50, y: 200, label: 'Web', channel: 'web', path: '/web' },
      { x: 150, y: 220, label: 'AI Core', channel: 'ai', path: '/ai-core' },
      { x: 250, y: 180, label: 'CRM', channel: 'crm', path: '/crm' }
    ];

    const connections = [
      { from: 0, to: 6 }, { from: 1, to: 6 }, { from: 2, to: 6 },
      { from: 3, to: 6 }, { from: 4, to: 6 }, { from: 5, to: 6 },
      { from: 6, to: 7 }, { from: 0, to: 1 }, { from: 2, to: 4 }
    ];

    // Create connections first (so they appear behind nodes)
    connections.forEach(conn => {
      const line = document.createElement('div');
      line.className = 'neural-connection';
      
      const fromNode = nodes[conn.from];
      const toNode = nodes[conn.to];
      
      const length = Math.sqrt(
        Math.pow(toNode.x - fromNode.x, 2) + 
        Math.pow(toNode.y - fromNode.y, 2)
      );
      
      const angle = Math.atan2(toNode.y - fromNode.y, toNode.x - fromNode.x) * 180 / Math.PI;
      
      line.style.width = length + 'px';
      line.style.left = fromNode.x + 20 + 'px';
      line.style.top = fromNode.y + 20 + 'px';
      line.style.transform = `rotate(${angle}deg)`;
      line.style.animationDelay = Math.random() + 's';
      
      container.appendChild(line);
    });

    // Create nodes
    nodes.forEach((node, index) => {
      const nodeEl = document.createElement('div');
      nodeEl.className = 'neural-node';
      nodeEl.style.left = node.x + 'px';
      nodeEl.style.top = node.y + 'px';
      nodeEl.style.animationDelay = (index * 0.2) + 's';
      nodeEl.textContent = node.label;
      nodeEl.title = `${node.label} Channel - Click for details`;
      
      nodeEl.addEventListener('click', () => {
        const analytics = {
          activeConversations: Math.floor(Math.random() * 100) + 50,
          responseTime: (Math.random() * 2 + 0.5).toFixed(1),
          satisfactionScore: (Math.random() * 2 + 8).toFixed(1),
          learningRate: (Math.random() * 20 + 80).toFixed(1)
        };
        
        alert(
          `${node.label} Channel Analytics:\n\n` +
          `• Active Conversations: ${analytics.activeConversations}\n` +
          `• Response Time: ${analytics.responseTime}s\n` +
          `• Satisfaction Score: ${analytics.satisfactionScore}/10\n` +
          `• Learning Rate: ${analytics.learningRate}%`
        );
        
        // Navigate to channel page if path exists
        if (node.path) {
          navigate(node.path);
        }
      });
      
      container.appendChild(nodeEl);
    });
  }, [navigate]);

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
        ctx.fillStyle = 'rgba(0, 212, 255, 0.1)';
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
            ctx.strokeStyle = `rgba(0, 212, 255, ${0.1 * (1 - distance / 150)})`;
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

  // Simulate real-time metric updates
  useEffect(() => {
    const interval = setInterval(() => {
      const metrics = document.querySelectorAll('.metric-value');
      metrics.forEach(metric => {
        // Add subtle animations to show live updates
        metric.style.animation = 'none';
        setTimeout(() => {
          metric.style.animation = 'pulse 0.5s ease-in-out';
        }, 10);
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleChannelSelect = (channel) => {
    setActiveChannel(channel);
    console.log('Selected channel:', channel);
    // Filter neural network based on selected channel
  };

  const channels = ['All', 'Chat', 'Email', 'Social', 'Voice', 'SMS', 'Web'];

  return (
    <div className="dashboard-container">
      <canvas className="neural-background" ref={canvasRef} />

      <div className="main-container">
        <section className="card neural-canvas">
          <div className="card-header">
            <Hub />
            <h2 className="card-title">Neural Engagement Network</h2>
          </div>
          
          {/* Channel Selector */}
          <div className="channel-selector">
            {channels.map((channel) => (
              <button
                key={channel}
                className={`channel-chip ${activeChannel === channel.toLowerCase() ? 'active' : ''}`}
                onClick={() => handleChannelSelect(channel.toLowerCase())}
              >
                {channel}
              </button>
            ))}
          </div>

          {/* Neural Network Container */}
          <div className="neural-network" id="neuralNetwork" ref={neuralNetworkRef}>
            {/* Nodes and connections will be dynamically added here */}
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