export const chatData = [
  {
    id: 1,
    ticketNumber: 'WAI-01',
    customerName: 'John Doe',
    email: 'john.doe@example.com',
    messages: [
      { sender: 'user', text: 'Hi, I have a question about my bill.', timestamp: '2023-10-26T10:00:00Z' },
      { sender: 'agent', text: 'Hi John, I can help with that. What is your question?', timestamp: '2023-10-26T10:01:30Z' },
    ],
    lastMessage: 'Hi John, I can help with that. What is your question?',
    sentiment_score: 0.85,
    response_quality: 90,
    summary: 'The customer is asking about their bill and needs assistance with a specific query.',
  },
  {
    id: 2,
    ticketNumber: 'WAI-02',
    customerName: 'Jane Smith',
    email: 'jane.smith@example.com',
    messages: [
      { sender: 'user', text: 'I need to update my shipping address.', timestamp: '2023-10-26T11:05:00Z' },
      { sender: 'agent', text: 'Sure, I can help with that. What is the new address?', timestamp: '2023-10-26T11:06:45Z' },
    ],
    lastMessage: 'Sure, I can help with that. What is the new address?',
    sentiment_score: 0.72,
    response_quality: 85,
    summary: 'The customer wants to update their shipping address and is awaiting instructions.',
  },
];
