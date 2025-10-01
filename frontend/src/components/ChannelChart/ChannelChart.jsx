import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import BarChartIcon from '@mui/icons-material/BarChart';

const data = [
  { name: 'Email', value: 400, fill: '#8884d8', sentiment: 0.8 },
  { name: 'Chat', value: 300, fill: '#82ca9d', sentiment: 0.6 },
  { name: 'Voice', value: 100, fill: '#ff8042', sentiment: 0.9 },
];

const ChannelChart = () => {
  return (
    <div style={{ width: '100%', height: 300 }}>
      {/* <h2 className="canvas-title"><BarChartIcon /> Channel Data</h2> */}
      <div style={{ display: 'flex' }}>
        <ResponsiveContainer width="50%" height={300}>
          <PieChart>
            <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
        <ResponsiveContainer width="50%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" isAnimationActive={true}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Bar>
            <Line type="monotone" dataKey="sentiment" stroke="#ff7300" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ChannelChart;
