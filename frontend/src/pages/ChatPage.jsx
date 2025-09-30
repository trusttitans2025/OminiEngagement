import React, { useState } from 'react';
import { initialChatData } from '../data/initialData';
import ChatList from '../components/ChatList';
import ChatWindow from '../components/ChatWindow';
import './ChatPage.css'; // Assuming you'll create this CSS file

const ChatPage = () => {
  const [chats, setChats] = useState(initialChatData);
  const [selectedChat, setSelectedChat] = useState(null);

  const handleSelectChat = (chat) => {
    setSelectedChat(chat);
  };

  const handleSendMessage = (chatId, message) => {
    setChats(prevChats => {
      const updatedChats = prevChats.map(chat =>
        chat.id === chatId
          ? { ...chat, messages: [...chat.messages, { sender: 'You', text: message, timestamp: new Date().toISOString() }], lastMessage: message }
          : chat
      );
      // Update selectedChat to reflect the changes
      setSelectedChat(updatedChats.find(chat => chat.id === chatId));
      return updatedChats;
    });
  };

  return (
    <div className="chat-page-container">
      <ChatList chats={chats} onSelectChat={handleSelectChat} selectedChat={selectedChat} />
      <ChatWindow chat={selectedChat} onSendMessage={handleSendMessage} />
    </div>
  );
};

export default ChatPage;