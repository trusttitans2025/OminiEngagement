import React from 'react';

const getSentimentEmoji = (score) => {
  if (score > 0.7) return '😊'; // Positive
  if (score < 0.3) return '😞'; // Negative
  return '😐'; // Neutral
};

const getQualityEmoji = (quality) => {
  if (quality >= 90) return '🌟';
  if (quality >= 70) return '👍';
  return '🤔'; // Other/Neutral
};

const ChatList = ({ chats, onSelectChat, selectedChat }) => {
  return (
    <div className="chat-list">
      {chats.map(chat => (
        <div
          key={chat.id}
          className={`chat-list-item ${selectedChat && selectedChat.id === chat.id ? 'active' : ''}`}
          onClick={() => onSelectChat(chat)}
        >
          <h3>{chat.customerName} ({chat.ticketNumber})</h3>
          <p>{chat.lastMessage}</p>
          <p>
            Sentiment: {getSentimentEmoji(chat.sentiment_score)} ({chat.sentiment_score}) |
            Quality: {getQualityEmoji(chat.response_quality)} ({chat.response_quality}%)
          </p>
        </div>
      ))}
    </div>
  );
};

export default ChatList;