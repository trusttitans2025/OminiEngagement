import React, { useState, useEffect } from 'react';
import { Grid, Card, CardContent, Typography, Button, Paper, CircularProgress } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { fetchInsights, runAiAnalysis } from '../../services/mockApi';

const KPI = ({ name, value }) => (
  <Card sx={{ height: '100%' }}>
    <CardContent sx={{ textAlign: 'center' }}>
      <Typography color="text.secondary" gutterBottom>
        {name}
      </Typography>
      <Typography variant="h4" component="div">
        {value}
      </Typography>
    </CardContent>
  </Card>
);

const Chart = ({ data }) => {
  if (!data || data.length === 0) return null;

  return (
    <Paper elevation={3} sx={{ p: 2, height: 300 }}>
        <Typography variant="h6" gutterBottom align="center">
            Engagement Trends
        </Typography>
        <ResponsiveContainer width="100%" height="85%">
            <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
        </ResponsiveContainer>
    </Paper>
  );
};

const Dashboard = () => {
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(true);
  const [simulating, setSimulating] = useState(false);

  useEffect(() => {
    fetchInsights().then(data => {
      setInsights(data);
      setLoading(false);
    });
  }, []);

  const handleRunAnalysis = () => {
    setSimulating(true);
    runAiAnalysis().then(data => {
      setInsights(data);
      setSimulating(false);
    });
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (!insights) {
    return <Typography>No data available.</Typography>;
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Typography variant="h5">Real-time Dashboard</Typography>
          <Button variant="contained" onClick={handleRunAnalysis} disabled={simulating}>
            {simulating ? 'Analyzing...' : 'Run AI Analysis'}
          </Button>
        </Grid>
      </Grid>
      {insights.kpis.map(kpi => (
        <Grid item xs={12} sm={6} md={4} key={kpi.name}>
          <KPI name={kpi.name} value={kpi.value} />
        </Grid>
      ))}
      <Grid item xs={12}>
        <Chart data={insights.chartData} />
      </Grid>
       <Grid item xs={12} sx={{textAlign: 'center'}}>
         <Typography variant="caption" color="text.secondary">
            Last updated: {new Date(insights.lastUpdated).toLocaleString()}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Dashboard;