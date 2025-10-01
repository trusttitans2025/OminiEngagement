import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Positive', value: 400 },
  { name: 'Negative', value: 300 },
  { name: 'Neutral', value: 300 },
];

const COLORS = ['#00d4ff', '#ff00ff', '#ff9900'];

const SentimentChart = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip contentStyle={{ backgroundColor: 'rgba(10, 14, 39, 0.8)', border: '1px solid rgba(255, 255, 255, 0.1)' }}/>
        <Legend wrapperStyle={{ color: '#e0e0e0' }}/>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default SentimentChart;
