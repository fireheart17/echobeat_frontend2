// components/Navbar.js
import React, { useState, useEffect } from 'react';
import './Navbar.css'; // Import the CSS file for styling
import SearchBar from './SearchBar.jsx';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // Function to toggle menu open state
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Function to close menu
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <div className="navbar">
        <a className="logo" href="/fyp">
          <b>EchoBeat</b>
        </a>
        <div className="navlinks">
          <div>
            <SearchBar />
          </div>
            <a className="link" href="blogs.html">
              Blogs
            </a>
            <a className="link" href="topics.html">
              Topics
            </a>
            <a className="link" href="/charts">
              Charts
            </a>
            <a className="link blocky" href="/login">
              Login
            </a>
        </div>
          <button className="hamburger-menu blocky" id="hamburgerMenu" onClick={toggleMenu}>
          &#9776;
        </button>
      </div>

      <div className={`sliding-menu ${isMenuOpen ? 'open' : ''}`} id="slidingMenu">
        <div className="close-btn" id="closeBtn" onClick={closeMenu}>
          &times;
        </div>
        <div className="menu-cards">
          <a href="/" className="menu-card">Menu Card 1</a>
          <a href="/" className="menu-card">Menu Card 2</a>
          <a href="/" className="menu-card">Menu Card 3</a>
          <a href="/" className="menu-card">Menu Card 4</a>
          <a href="/" className="menu-card">Menu Card 5</a>
        </div>
      </div>
    </>
  );
};

export default Navbar;
