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
          <a href="#item1" className="dropdown-item">Liked Songs</a>
          <a href="#item2" className="dropdown-item">Liked Playlists</a>
          <a href="#item3" className="dropdown-item">Liked Podcasts</a>
          <a href="#item4" className="dropdown-item">Liked Albums</a>
        </div>
      )}
    </div>
  );
}

export default QuickLinks;
