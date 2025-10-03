import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { initialEmails, initialChatData, initialVoiceData } from '../../data/initialData';
import './UserList.css';
import { TextField, Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const users = [
  { 
    id: 1, 
    name: 'Amit', 
    email: 'Amit@example.com', 
    role: 'Admin', 
  },
  { 
    id: 2, 
    name: 'Shubham', 
    email: 'Shubham@example.com', 
    role: 'User', 
  },
  { 
    id: 3, 
    name: 'Kajal', 
    email: 'Kajal@example.com', 
    role: 'User', 
  },
];

const UserList = () => {
  const [filter, setFilter] = useState('');

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
        tickets.push({ type: 'CRM', ticketNumber: v.ticketNumber, id: v.id });
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
  sx={{
    marginBottom: '20px',
    '& .MuiOutlinedInput-root': {
      color: 'white',
      '& fieldset': {
        borderColor: 'rgba(255, 255, 255, 0.3)',
      },
      '&:hover fieldset': {
        borderColor: 'rgba(255, 255, 255, 0.5)',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'white',
      },
    },
    '& .MuiInputLabel-root': {
      color: 'rgba(255, 255, 255, 0.7)',
    },
    '& .MuiInputLabel-root.Mui-focused': {
      color: 'white',
    },
  }}
/>
      <div>
        {filteredUsers.map(user => (
          <Accordion key={user.id} className="user-accordion">
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel${user.id}-content`}
              id={`panel${user.id}-header`}
            >
              <Typography className="user-name">{user.name}</Typography>
              <Typography className="user-role">{user.role}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div>
                <Typography variant="h6">Tickets:</Typography>
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
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </div>
  );
};

export default UserList;

