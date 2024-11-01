import React from 'react';
import MobileNavbar from './MobileNavbar';
import './Navbar.css';
import logo from './images/logo.svg';

const Navbar = () => {
  const handleNavigation = (path) => {
    window.location.href = path;
  };

  return (
    <div className="navbar">

      {/* Desktop Links */}
      <ul className="navbar-links">
        <li onClick={() => handleNavigation('/')}>Home</li>
        <li onClick={() => handleNavigation('/dashboard')}>Features</li>
        <img src={logo} width="50px" height="50px" alt="Sapplinns" className="navbar-logo" />
        <li onClick={() => handleNavigation('/graph-analyser')}>Tools</li>
        <li onClick={() => handleNavigation('/stock-graph')}>Contact Us</li>
      </ul>

      {/* Mobile Navbar Component */}
      <MobileNavbar />
    </div>
  );
};

export default Navbar;