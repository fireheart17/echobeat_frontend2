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
          <a href="/likedsongs" className="dropdown-item">Liked Songs</a>
          <a href="/likedplaylists" className="dropdown-item">Liked Playlists</a>
          <a href="/likedpodcasts" className="dropdown-item">Liked Podcasts</a>
          <a href="/likedalbums" className="dropdown-item">Liked Albums</a>
        </div>
      )}
    </div>
  );
}

export default QuickLinks;
