// components/HeroSection.js
import React from 'react';
import './HeroSection.css'; // Import CSS specific to this component

const HeroSection = (props) => {
  return (
    <div className="hero-section">
      <div className="hero-text" id="hero-text">
        {/* Discover, Inspire, Connect: Your Blog for Everything Worth Sharing. <br /> */}
        Sup {props.name}!
      </div>
      <div className="buttons">
        <a className="explore-button liked-songs" href="/likedsongs">Liked Songs</a>
        <a className="explore-button liked-playlists" href="/likedplaylists">Liked Playlists</a>
        <a className="explore-button liked-podcasts" href="/likedpodcasts">Liked Podcasts</a>
        <a className="explore-button liked-albums" href="/likedalbums">Liked Albums</a>
      </div>
    </div>
  );
};

export default HeroSection;
