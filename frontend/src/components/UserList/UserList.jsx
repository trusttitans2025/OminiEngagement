import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { initialEmails, initialChatData, initialVoiceData } from '../../data/initialData';
import './UserList.css';
import { TextField } from '@mui/material';

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
  const [filter, setFilter] = useState('');

  const handleAccordionClick = (userId) => {
    setOpenAccordion(openAccordion === userId ? null : userId);
  };

  const getUserTickets = (email) => {
    const tickets = [];
    initialEmails.forEach(e => {
      if (e.email === email) {
        tickets.push({ type: 'Email', ticketNumber: e.ticketId, id: e.id });
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

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(filter.toLowerCase()) || 
    user.email.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <TextField
        label="Filter by name or email"
        variant="outlined"
        size="small"
        fullWidth
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        style={{ marginBottom: '20px' }}
      />
      <ul className="user-list">
        {filteredUsers.map(user => (
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
    </div>
  );
};

export default UserList;
