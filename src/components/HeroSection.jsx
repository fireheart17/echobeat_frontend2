// components/HeroSection.js
import React from 'react';
import './HeroSection.css'; // Import CSS specific to this component

const HeroSection = (props) => {
  return (
    <div className="hero-section">
      <div className="hero-text" id="hero-text">
        Sup {props.name}!
        {/* Discover, Inspire, Connect: Your Blog for Everything Worth Sharing. */}
      </div>
      <div className="buttons">
        <a className="explore-button" href="/likedsongs">Liked Songs</a>
        <a className="explore-button" href="/likedplaylists">Liked Playlists</a>
        <a className="explore-button" href="/likedpodcasts">Liked Podcasts</a>
        <a className="explore-button" href="/likedalbums">Liked Albums</a>
      </div>
    </div>
  );
};

export default HeroSection;
