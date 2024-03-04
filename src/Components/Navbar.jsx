import React from 'react';
import './Navbar.css'; // Import CSS file for styling
import sports from '../Icons/sports.png'; 
import { NavLink } from 'react-router-dom';
import { useState } from 'react';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src={sports} alt="Sportathon Logo" className="logo" />
        <span className="brand">Sportathon</span>
      </div>
      {/* <div className="navbar-right">
        <button className="btn">Login</button>
        <button className="btn">Sign Up</button>
      </div> */}
      <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul className={menuOpen ? "open" : ""}>
      <div className="navbar-right">
        <button className="btn">Login</button>
        <button className="btn">Sign Up</button>
      </div>

      </ul>
    </nav>
  );
}

export default Navbar;
