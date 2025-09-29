import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { initialEmails, initialChatData, initialVoiceData } from '../../data/initialData';
import './UserList.css';

const users = [
  { 
    id: 1, 
    name: 'John Doe', 
    email: 'john.doe@example.com', 
    role: 'Admin', 
  },
  { 
    id: 2, 
    name: 'Jane Smith', 
    email: 'jane.smith@example.com', 
    role: 'User', 
  },
  { 
    id: 3, 
    name: 'Peter Jones', 
    email: 'peter.jones@example.com', 
    role: 'User', 
  },
  { 
    id: 4, 
    name: 'Mary Williams', 
    email: 'mary.williams@example.com', 
    role: 'User', 
  },
  { 
    id: 5, 
    name: 'David Brown', 
    email: 'david.brown@example.com', 
    role: 'Editor', 
  },
];

const UserList = () => {
  const [openAccordion, setOpenAccordion] = useState(null);

  const handleAccordionClick = (userId) => {
    setOpenAccordion(openAccordion === userId ? null : userId);
  };

  const getUserTickets = (email) => {
    const tickets = [];
    initialEmails.forEach(e => {
      if (e.email === email) {
        tickets.push({ type: 'Email', ticketNumber: e.ticketNumber, id: e.id });
      }
    });
    initialChatData.forEach(c => {
      if (c.email === email) {
        tickets.push({ type: 'Chat', ticketNumber: c.ticketNumber, id: c.id });
      }
    });
    initialVoiceData.forEach(v => {
      if (v.email === email) {
        tickets.push({ type: 'Voice', ticketNumber: v.ticketNumber, id: v.id });
      }
    });
    return tickets;
  };

  return (
    <ul className="user-list">
      {users.map(user => (
        <li key={user.id} className="user-list-item">
          <div className="user-info" onClick={() => handleAccordionClick(user.id)}>
            <div className="user-name">{user.name}</div>
            <div className="user-email">{user.email}</div>
          </div>
          <div className="user-role">{user.role}</div>
          {openAccordion === user.id && (
            <div className="accordion-content">
              <h4>Tickets:</h4>
              <ul>
                {getUserTickets(user.email).map(ticket => (
                  <li key={ticket.ticketNumber}>
                    <Link to={`/${ticket.type.toLowerCase()}/${ticket.id}`}>
                      {ticket.type}: {ticket.ticketNumber}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

export default UserList;