import React, { useEffect } from 'react';
import { Grid, Card, CardContent, Typography, Paper, createTheme, ThemeProvider } from '@mui/material';
import { BarChart, Group, Hub, PieChart as PieChartIcon } from '@mui/icons-material';
import UserList from '../../components/UserList/UserList';
import ChannelChart from '../../components/ChannelChart/ChannelChart';
import SentimentChart from '../../components/SentimentChart/SentimentChart';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00d4ff',
    },
    background: {
      paper: '#162447',
      default: '#1a1a2e',
    },
    text: {
      primary: '#e0e0e0',
      secondary: '#b0b0b0',
    },
  },
  typography: {
    fontFamily: ''Roboto', sans-serif',
    h5: {
      fontWeight: 500,
    },
  },
});

const Dashboard = () => {
  const navigate = useNavigate();

  const handleNodeClick = (path) => {
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
  }, []);

  return (
    <ThemeProvider theme={darkTheme}>
      <div className="dashboard-container">
        <Grid container spacing={3}>
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
                  <h2 className="card-title" style={{ marginLeft: '10px' }}>User List</h2>
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
                  <h2 className="card-title" style={{ marginLeft: '10px' }}>Channel Data</h2>
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
                  <h2 className="card-title" style={{ marginLeft: '10px' }}>Sentiment Analysis</h2>
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