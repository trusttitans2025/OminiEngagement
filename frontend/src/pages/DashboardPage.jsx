import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './DashboardPage.css';
import UserList from '../components/UserList/UserList';
import ChannelChart from '../components/ChannelChart/ChannelChart';
import { Group, BarChart, Hub, PieChart } from '@mui/icons-material';

const Dashboard = () => {
  const canvasRef = useRef(null);
  const neuralNetworkRef = useRef(null);
  const pieChartRef = useRef(null);
  const navigate = useNavigate();
  const [activeChannel, setActiveChannel] = useState('all');

  // Neural Network Creation
  useEffect(() => {
    const container = neuralNetworkRef.current;
    if (!container) return;

    container.innerHTML = '';

    const nodes = [
      { x: 40, y: 30, label: 'Chat', channel: 'chat', path: '/chat' },
      { x: 140, y: 50, label: 'Email', channel: 'email', path: '/emails' },
      { x: 240, y: 30, label: 'Social', channel: 'social', path: '/social' },
      { x: 90, y: 100, label: 'Voice', channel: 'voice', path: '/voice' },
      { x: 190, y: 120, label: 'SMS', channel: 'sms', path: '/sms' },
      { x: 40, y: 170, label: 'Web', channel: 'web', path: '/web' },
      { x: 140, y: 190, label: 'AI Core', channel: 'ai', path: '/ai-core' },
      { x: 240, y: 170, label: 'CRM', channel: 'crm', path: '/crm' }
    ];

    const connections = [
      { from: 0, to: 6 }, { from: 1, to: 6 }, { from: 2, to: 6 },
      { from: 3, to: 6 }, { from: 4, to: 6 }, { from: 5, to: 6 },
      { from: 6, to: 7 }, { from: 0, to: 1 }, { from: 2, to: 4 }
    ];

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
        
        if (node.path) {
          navigate(node.path);
        }
      });
      
      container.appendChild(nodeEl);
    });
  }, [navigate]);

  // Pie Chart Creation
  useEffect(() => {
    const canvas = pieChartRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 80;

    const data = [
      { label: 'Chat', value: 30, color: '#00d4ff' },
      { label: 'Email', value: 25, color: '#9333ea' },
      { label: 'Social', value: 20, color: '#10b981' },
      { label: 'Voice', value: 15, color: '#f59e0b' },
      { label: 'Other', value: 10, color: '#ef4444' }
    ];

    const total = data.reduce((sum, item) => sum + item.value, 0);
    let currentAngle = -Math.PI / 2;

    const drawPieChart = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      data.forEach((item) => {
        const sliceAngle = (item.value / total) * 2 * Math.PI;
        
        // Draw slice
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
        ctx.closePath();
        
        // Create gradient
        const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
        gradient.addColorStop(0, item.color);
        gradient.addColorStop(1, item.color + '80');
        
        ctx.fillStyle = gradient;
        ctx.fill();
        
        // Add glow effect
        ctx.shadowColor = item.color;
        ctx.shadowBlur = 15;
        ctx.stroke();
        ctx.shadowBlur = 0;
        
        // Draw label
        const labelAngle = currentAngle + sliceAngle / 2;
        const labelX = centerX + Math.cos(labelAngle) * (radius + 30);
        const labelY = centerY + Math.sin(labelAngle) * (radius + 30);
        
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 12px Inter';
        ctx.textAlign = 'center';
        ctx.fillText(`${item.label}`, labelX, labelY);
        ctx.font = '10px Inter';
        ctx.fillText(`${item.value}%`, labelX, labelY + 15);
        
        currentAngle += sliceAngle;
      });
      
      // Draw center circle
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * 0.5, 0, 2 * Math.PI);
      ctx.fillStyle = 'rgba(17, 24, 57, 0.95)';
      ctx.fill();
      
      // Add center text
      ctx.fillStyle = '#00d4ff';
      ctx.font = 'bold 14px Inter';
      ctx.textAlign = 'center';
      ctx.fillText('Total', centerX, centerY - 5);
      ctx.font = 'bold 18px Inter';
      ctx.fillText('100%', centerX, centerY + 15);
    };

    drawPieChart();

    // Animate on hover
    let animationId;
    const animate = () => {
      currentAngle += 0.005;
      drawPieChart();
      animationId = requestAnimationFrame(animate);
    };

    canvas.addEventListener('mouseenter', () => {
      animate();
    });

    canvas.addEventListener('mouseleave', () => {
      cancelAnimationFrame(animationId);
    });

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

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

  const handleChannelSelect = (channel) => {
    setActiveChannel(channel);
    console.log('Selected channel:', channel);
  };

  // const channels = ['All', 'Chat', 'Email', 'Social', 'Voice', 'SMS', 'Web'];

  return (
    <div className="dashboard-container">
      <canvas className="neural-background" ref={canvasRef} />

      <div className="dashboard-header">
        <h1 className="dashboard-title">OmniMind Dashboard</h1>
        <p className="dashboard-subtitle">Real-time Analytics & Neural Network Monitor</p>
      </div>

      {/* Channel Selector */}
      {/* <div className="channel-selector-container">
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
      </div> */}

      {/* Grid Layout */}
      <div className="dashboard-grid">
        {/* Neural Network Section */}
        <section className="grid-card neural-card">
          <div className="card-header">
            <Hub className="card-icon" />
            <h2 className="card-title">Neural Engagement Network</h2>
          </div>
          <div className="neural-network" ref={neuralNetworkRef}>
            {/* Nodes and connections dynamically added */}
          </div>
        </section>

        {/* User List Section */}
        <section className="grid-card user-card">
          <div className="card-header">
            <Group className="card-icon" />
            <h2 className="card-title">Active Users</h2>
          </div>
          <div className="card-content">
            <UserList />
          </div>
        </section>

        {/* Bar Chart Section */}
        <section className="grid-card chart-card">
          <div className="card-header">
            {/* <BarChart className="card-icon" /> */}
            <h2 className="card-title">Channel Performance</h2>
          </div>
          <div className="card-content">
            <ChannelChart />
          </div>
        </section>

        {/* Pie Chart Section */}
        <section className="grid-card pie-card">
          <div className="card-header">
            <PieChart className="card-icon" />
            <h2 className="card-title">Channel Distribution</h2>
          </div>
          <div className="card-content pie-content">
            <canvas ref={pieChartRef} width="300" height="300"></canvas>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;