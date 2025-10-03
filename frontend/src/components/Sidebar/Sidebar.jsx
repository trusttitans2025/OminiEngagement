import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  IconButton,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import EmailIcon from '@mui/icons-material/Email';
import ChatIcon from '@mui/icons-material/Chat';
import VoicemailIcon from '@mui/icons-material/Voicemail';
import LogoutIcon from '@mui/icons-material/Logout';
import './Sidebar.css';

const navItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
  { text: 'Email', icon: <EmailIcon />, path: '/emails' },
  { text: 'Chat', icon: <ChatIcon />, path: '/chat' },
  { text: 'CRM', icon: <VoicemailIcon />, path: 'https://crm-django-service-631872245250.us-central1.run.app/admin/login/?next=/admin/tickets/ticket/' },
];

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="sidebar">
      <List component="nav" className="sidebar-nav">
        {navItems.map((item) => (
          <ListItem
            button
            key={item.text}
            component={NavLink}
            to={item.path}
            className="sidebar-nav-item"
          >
            <ListItemIcon className="sidebar-nav-icon">{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
      <div className="sidebar-footer">
        <span>User</span>
        <IconButton onClick={handleLogout} color="inherit">
          <LogoutIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default Sidebar;
