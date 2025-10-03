import React, { useState, useEffect } from 'react';
import ChatList from '../components/ChatList';
import ChatWindow from '../components/ChatWindow';
import './ChatPage.css'; // Assuming you'll create this CSS file

const ChatPage = () => {
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await fetch('https://web-chat-service-631872245250.us-central1.run.app/conversations');
        const data = await response.json();
        setChats(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching chats:', error);
        setLoading(false);
      }
    };

    fetchChats();
  }, []);

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

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="chat-page-container">
      <ChatList chats={chats} onSelectChat={handleSelectChat} selectedChat={selectedChat} />
      <ChatWindow chat={selectedChat} onSendMessage={handleSendMessage} />
    </div>
  );
};

export default ChatPage;