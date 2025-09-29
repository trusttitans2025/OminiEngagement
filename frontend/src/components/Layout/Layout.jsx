import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import './Layout.css';

const Layout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

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