import React from 'react';
import { initialChatData } from '../data/initialData';
import ChatTile from '../components/ChatTile';
import '../styles/Tile.css';

const ChatPage = () => {
  return (
    <div>
      <h2>Chat Tickets</h2>
      <div className="grid-container">
        {initialChatData.map(chat => (
          <ChatTile key={chat.id} chat={chat} />
        ))}
      </div>
    </div>
  );
};

export default ChatPage;