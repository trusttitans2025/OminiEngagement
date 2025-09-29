import React, { useState, useContext, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import { ThemeContext } from '../../context/ThemeContext';
import './Layout.css';

const Layout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const { themeMode } = useContext(ThemeContext);

  useEffect(() => {
    document.body.setAttribute('data-theme', themeMode);
  }, [themeMode]);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <Header toggleSidebar={toggleSidebar} />
      {isSidebarOpen && <Sidebar />}
      <main
        className="main-content"
        style={{ marginLeft: isSidebarOpen ? '250px' : '0' }}
      >
        <Outlet />
      </main>
    </>
  );
};

export default Layout;