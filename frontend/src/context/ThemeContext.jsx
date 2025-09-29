import React, { createContext, useMemo } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { getTheme } from '../styles/theme';

export const ThemeContext = createContext({});

export const ThemeProvider = ({ children }) => {
  const theme = useMemo(() => getTheme('light'), []);

  return (
    <ThemeContext.Provider value={{}}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};