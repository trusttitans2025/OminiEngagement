import React from 'react';
import { useParams } from 'react-router-dom';
import { initialChatData } from '../data/initialData';

const ChatDetailsPage = () => {
  const { id } = useParams();
  const chat = initialChatData.find(c => c.id === parseInt(id));

  if (!chat) {
    return <div>Chat not found</div>;
  }

  return (
    <div>
      <h2>{chat.ticketNumber}</h2>
      <p><strong>Email:</strong> {chat.email}</p>
      <div>
        {chat.messages.map((message, index) => (
          <div key={index} className={`message ${message.sender}`}>
            <p>{message.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatDetailsPage;
