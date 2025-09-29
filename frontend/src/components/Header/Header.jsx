import React from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import wlLogo from '../../assets/wl.png';
import './Header.css';

const Header = ({ toggleSidebar }) => {
  return (
    <AppBar position="static" className="app-header">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={toggleSidebar}
        >
          <MenuIcon />
        </IconButton>
        <div className="header-title">
          <img src={wlLogo} alt="Worldline Logo" className="header-logo" />
          <Typography variant="h6" component="div">
            Worldline AI Interaction
          </Typography>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;