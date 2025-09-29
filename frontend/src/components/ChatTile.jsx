import React from 'react';
import { Link } from 'react-router-dom';

const ChatTile = ({ chat }) => {
  return (
    <Link to={`/chat/${chat.id}`} className="tile-link">
      <div className="tile">
        <h3>{chat.ticketNumber}</h3>
        <p>{chat.email}</p>
      </div>
    </Link>
  );
};

export default ChatTile;
