import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

const data = [
  { name: 'Email', value: 400, fill: 'url(#colorEmail)' },
  { name: 'Chat', value: 300, fill: 'url(#colorChat)' },
  { name: 'Voice', value: 100, fill: 'url(#colorVoice)' },
];

const ChannelChart = () => {
  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <defs>
            <linearGradient id="colorEmail" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#00d4ff" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#00d4ff" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorChat" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ff00ff" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#ff00ff" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorVoice" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ff9900" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#ff9900" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)"/>
          <XAxis dataKey="name" stroke="#e0e0e0" />
          <YAxis stroke="#e0e0e0" />
          <Tooltip contentStyle={{ backgroundColor: 'rgba(10, 14, 39, 0.8)', border: '1px solid rgba(255, 255, 255, 0.1)' }}/>
          <Legend wrapperStyle={{ color: '#e0e0e0' }}/>
          <Bar dataKey="value" isAnimationActive={true}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChannelChart;
