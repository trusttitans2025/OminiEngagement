import React, { useEffect, useRef } from 'react';
import { Grid, Card, CardContent, Typography, Paper, createTheme, ThemeProvider } from '@mui/material';
import { BarChart, Group, Hub, PieChart as PieChartIcon } from '@mui/icons-material';
import UserList from '../../components/UserList/UserList';
import ChannelChart from '../../components/ChannelChart/ChannelChart';
import SentimentChart from '../../components/SentimentChart/SentimentChart';
import { useNavigate } from 'react-router-dom';
import './Dashboard.v2.css';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00d4ff',
    },
    secondary: {
      main: '#ff00ff',
    },
    background: {
      paper: 'rgba(10, 14, 39, 0.7)',
      default: '#0a0e27',
    },
    text: {
      primary: '#e0e0e0',
      secondary: '#b0b0b0',
    },
  },
  typography: {
    fontFamily: ''Inter', sans-serif',
    h5: {
      fontWeight: 700,
      background: 'linear-gradient(135deg, #00d4ff, #ff00ff)',
      'WebkitBackgroundClip': 'text',
      'WebkitTextFillColor': 'transparent',
    },
  },
});

const Dashboard = () => {
  const navigate = useNavigate();
  const canvasRef = useRef(null);

  const handleNodeClick = (path) => {
    console.log('Navigating to:', path);
    navigate(path);
  };

  useEffect(() => {
    const network = document.getElementById('neuralNetwork');
    if (!network) return;

    // Clear previous nodes and connections
    while (network.firstChild) {
      network.removeChild(network.firstChild);
    }

    const nodes = [
      { id: 'chat', label: 'Chat', x: 100, y: 200 },
      { id: 'voice', label: 'Voice', x: 300, y: 100 },
      { id: 'email', label: 'Email', x: 300, y: 300 },
      { id: 'center', label: 'Omini', x: 200, y: 200 },
    ];

    const connections = [
      { from: 'chat', to: 'center' },
      { from: 'voice', to: 'center' },
      { from: 'email', to: 'center' },
    ];

    nodes.forEach(node => {
      const nodeEl = document.createElement('div');
      nodeEl.classList.add('neural-node');
      nodeEl.style.left = `${node.x}px`;
      nodeEl.style.top = `${node.y}px`;
      nodeEl.textContent = node.label;
      nodeEl.onclick = () => handleNodeClick(`/${node.id}`);
      network.appendChild(nodeEl);
    });

    connections.forEach(conn => {
      const fromNode = nodes.find(n => n.id === conn.from);
      const toNode = nodes.find(n => n.id === conn.to);

      const connectionEl = document.createElement('div');
      connectionEl.classList.add('neural-connection');

      const angle = Math.atan2(toNode.y - fromNode.y, toNode.x - fromNode.x) * 180 / Math.PI;
      const length = Math.sqrt(Math.pow(toNode.x - fromNode.x, 2) + Math.pow(toNode.y - fromNode.y, 2));

      connectionEl.style.width = `${length}px`;
      connectionEl.style.transform = `rotate(${angle}deg)`;
      connectionEl.style.left = `${fromNode.x}px`;
      connectionEl.style.top = `${fromNode.y}px`;

      network.appendChild(connectionEl);
    });

    // Particle animation
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    let particles = [];

    const particle = {
        x: 0,
        y: 0,
        vx: 0,
        vy: 0,
        radius: 0,
        color: ''
    };

    function createParticles() {
        for(let i = 0; i < 100; i++) {
            const p = Object.create(particle);
            p.x = Math.random() * canvas.width;
            p.y = Math.random() * canvas.height;
            p.vx = Math.random() * 1 - 0.5;
            p.vy = Math.random() * 1 - 0.5;
            p.radius = Math.random() * 2;
            p.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
            particles.push(p);
        }
    }

    function update() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;

            if(p.x < 0 || p.x > canvas.width) p.vx *= -1;
            if(p.y < 0 || p.y > canvas.height) p.vy *= -1;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.fill();
        });

        requestAnimationFrame(update);
    }

    createParticles();
    update();

  }, []);

  return (
    <ThemeProvider theme={darkTheme}>
      <canvas id="particle-canvas" ref={canvasRef}></canvas>
      <div className="dashboard-container">
        <Grid container spacing={5}>
          {/* Neural Engagement Network */}
          <Grid item xs={12}>
            <Paper elevation={3} className="card">
              <CardContent>
                <div className="card-header">
                  <h2 className="card-title">🌐 Neural Engagement Network</h2>
                  <div className="channel-selector">
                      <div className="channel-chip active">All Channels</div>
                      <div className="channel-chip">Chat</div>
                      <div className="channel-chip">Email</div>
                      <div className="channel-chip">Social</div>
                      <div className="channel-chip">Voice</div>
                  </div>
                </div>
                <div className="neural-network" id="neuralNetwork">
                    {/* Neural nodes and connections will be dynamically generated */}
                </div>
              </CardContent>
            </Paper>
          </Grid>

          {/* User List */}
          <Grid item xs={12} md={6}>
            <Paper elevation={3} className="card">
              <CardContent>
                <div className="card-header">
                  <Group fontSize="large" color="primary" />
                  <Typography variant="h5" component="div" style={{ marginLeft: '15px' }}>User List</Typography>
                </div>
                <UserList />
              </CardContent>
            </Paper>
          </Grid>

          {/* Channel Data */}
          <Grid item xs={12} md={6}>
            <Paper elevation={3} className="card">
              <CardContent>
                <div className="card-header">
                  <BarChart fontSize="large" color="primary" />
                  <Typography variant="h5" component="div" style={{ marginLeft: '15px' }}>Channel Data</Typography>
                </div>
                <ChannelChart />
              </CardContent>
            </Paper>
          </Grid>

          {/* Sentiment Analysis */}
          <Grid item xs={12} md={6}>
            <Paper elevation={3} className="card">
              <CardContent>
                <div className="card-header">
                  <PieChartIcon fontSize="large" color="primary" />
                  <Typography variant="h5" component="div" style={{ marginLeft: '15px' }}>Sentiment Analysis</Typography>
                </div>
                <SentimentChart />
              </CardContent>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </ThemeProvider>
  );
};

export default Dashboard;

export default Dashboard;

export default Dashboard;