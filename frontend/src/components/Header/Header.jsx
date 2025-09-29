import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import wlLogo from '../../assets/wl.png';
import { ThemeContext } from '../../context/ThemeContext';
import './Header.css';

const Header = ({ toggleSidebar }) => {
  const { toggleTheme, themeMode } = useContext(ThemeContext);

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
        <IconButton sx={{ ml: 'auto' }} onClick={toggleTheme} color="inherit">
          {themeMode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;