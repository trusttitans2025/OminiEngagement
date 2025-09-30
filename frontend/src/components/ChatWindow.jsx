import React, { useState, useEffect } from 'react';
import ChatSuggestionBox from './ChatSuggestionBox';

const ChatWindow = ({ chat, onSendMessage }) => {
  const [message, setMessage] = useState('');
  const [suggestion, setSuggestion] = useState(''); // Dummy suggestion for now

  useEffect(() => {
    // Scroll to the bottom of the chat window when messages change
    const chatMessages = document.querySelector('.chat-messages');
    if (chatMessages) {
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    // Set a dummy suggestion when chat changes
    if (chat) {
      setSuggestion(`Hi ${chat.customerName}, I understand you have a question about your bill. How can I assist you today?`);
    } else {
      setSuggestion('');
    }
  }, [chat]);

  const handleSendMessage = () => {
    if (message.trim()) {
      onSendMessage(chat.id, message);
      setMessage('');
    }
  };

  const handleCopySuggestion = (text) => {
    navigator.clipboard.writeText(text);
    alert('Suggestion copied to clipboard!'); // For demonstration
  };

  const handleSendSuggestion = (text) => {
    onSendMessage(chat.id, text);
  };

  if (!chat) {
    return <div className="chat-window-placeholder">Select a chat to start messaging</div>;
  }

  return (
    <div className="chat-window-container">
      <div className="chat-window">
        <div className="chat-header">
          <h3>{chat.customerName} {chat.ticketNumber && `(${chat.ticketNumber})`}</h3>
        </div>
        <div className="chat-messages">
          {chat.messages.map((msg, index) => (
            <div key={index} className={`message ${msg.sender === 'You' || msg.sender === 'agent' ? 'sent' : 'received'}`}>
              <p><strong>{msg.sender}:</strong> {msg.text} <span className="message-timestamp">{new Date(msg.timestamp).toLocaleTimeString()}</span></p>
            </div>
          ))}
        </div>
        <div className="chat-input">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleSendMessage();
              }
            }}
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
      </div>
      <div className="chat-right-sidebar">
        {suggestion && (
          <ChatSuggestionBox
            suggestion={suggestion}
            onCopy={handleCopySuggestion}
            onSend={handleSendSuggestion}
          />
        )}
        {chat.summary && (
                  <div className="chat-summary-box">
                    <h4>✨ AI-Generated Conversation Summary</h4>            <p>{chat.summary}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatWindow;