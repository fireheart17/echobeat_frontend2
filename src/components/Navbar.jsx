// components/Navbar.js
import React, { useState, useEffect } from 'react';
import './Navbar.css'; // Import the CSS file for styling

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

  // Close the menu if clicking outside or pressing escape
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (
        e.target.closest('.sliding-menu') === null &&
        e.target.closest('.hamburger-menu-sm') === null
      ) {
        setIsMenuOpen(false);
      }
    };

    // Disable scrolling when menu is open
    document.body.classList.toggle('menu-open', isMenuOpen);

    // Add event listener when menu is open
    if (isMenuOpen) {
      window.addEventListener('click', handleOutsideClick);
    }

    // Cleanup function to remove listener when component unmounts or menu closes
    return () => {
      window.removeEventListener('click', handleOutsideClick);
      document.body.classList.remove('menu-open');
    };
  }, [isMenuOpen]);

  return (
    <>
      <div className="navbar">
        <a className="logo" href="/fyp">
          <b>EchoBeat</b>
        </a>
        <button className="hamburger-menu-sm blocky" id="hamburgerMenu" onClick={toggleMenu}>
          &#9776;
        </button>
        <div className="navlinks" style={{ display: isMenuOpen ? 'flex' : '' }}>
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
      </div>

      <div className={`sliding-menu ${isMenuOpen ? 'open' : ''}`} id="slidingMenu">
        <div className="close-btn" id="closeBtn" onClick={closeMenu}>
          &times;
        </div>
        <input type="text" className="search-bar" placeholder="Search..." />
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
