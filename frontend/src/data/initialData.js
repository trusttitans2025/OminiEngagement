import { chatData } from './chatData';
import { voiceData } from './voiceData';

export const initialEmails = [
  {
    id: 1,
    ticketId: 'WAI-05',
    email: 'john.doe@example.com',
    subject: 'Question about my bill',
    body: 'Hi, I have a question about my bill. Can you please help me?'
  },
  {
    id: 2,
    ticketId: 'WAI-06',
    email: 'jane.smith@example.com',
    subject: 'Update shipping address',
    body: 'I need to update my shipping address. Please let me know what information you need.'
  },
];

export const initialInsights = {
  kpis: [
    { name: 'Response Quality', value: '89%' },
    { name: 'Customer Satisfaction', value: '92%' },
    { name: 'Learning Efficiency', value: '78%' },
  ],
  chartData: [
    { name: 'Week 1', value: 65 },
    { name: 'Week 2', value: 70 },
    { name: 'Week 3', value: 78 },
    { name: 'Week 4', value: 85 },
  ],
  lastUpdated: new Date().toISOString(),
};

export const initialChatData = chatData;
export const initialVoiceData = voiceData;