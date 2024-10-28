// components/HeroSection.js
import React from 'react';
import '../pages/Fyp.css'; // Import CSS specific to this component

const HeroSection = () => {
  return (
    <div className="hero-section card">
      <div className="hero-text" id="hero-text">
        {/* Discover, Inspire, Connect: Your Blog for Everything Worth Sharing. */}
      </div>
      <div className="buttons">
        <a className="explore-button" href="blogs.html">Liked Songs</a>
        <a className="explore-button" href="blogs.html">Liked Playlists</a>
        <a className="explore-button" href="blogs.html">Liked Podcasts</a>
      </div>
    </div>
  );
};

export default HeroSection;
