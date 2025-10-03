import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';

const ChatDetailsPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const [chat, setChat] = useState(location.state?.chat);
  const [loading, setLoading] = useState(!chat);

  useEffect(() => {
    if (!chat) {
      const fetchChat = async () => {
        try {
          const response = await fetch(`https://web-chat-service-631872245250.us-central1.run.app/conversations/${id}`);
          const data = await response.json();
          setChat(data);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching chat:', error);
          setLoading(false);
        }
      };

      fetchChat();
    }
  }, [id, chat]);

  if (loading) {
    return <div>Loading...</div>;
  }

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
