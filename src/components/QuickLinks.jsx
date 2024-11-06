import React, { useState } from 'react';
import './QuickLinks.css'; // Import your CSS file

function QuickLinks() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="dropdown">
      <div className="dropdown-button" onClick={toggleDropdown}>
        QuickLinks
        <span className={`arrow down`}></span>
      </div>
      {isOpen && (
        <div className="dropdown-menu">
          <a href="/" className="dropdown-item">Home</a>
          <a href="/charts" className="dropdown-item">Charts</a>
          <a href="/user" className="dropdown-item">User</a>
          <a href="/logout" className="dropdown-item">Logout</a>
        </div>
      )}
    </div>
  );
}

export default QuickLinks;
