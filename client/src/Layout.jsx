import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from './components/Navigation';
import Footer from './components/Footer';

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      <Outlet />
      <Footer/>
    </div>
  )
};

export default Layout;