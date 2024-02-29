import React from 'react';
import './Navbar.css'; // Import CSS file for styling
import sports from '../Icons/sports.png'; 


const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src={sports} alt="Sportathon Logo" className="logo" />
        <span className="brand">Sportathon</span>
      </div>
      <div className="navbar-right">
        <button className="btn">Login</button>
        <button className="btn">Sign Up</button>
      </div>
    </nav>
  );
}

export default Navbar;
