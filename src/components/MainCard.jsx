// components/MainCard.js
import React from 'react';
import '../pages/Fyp.css'; // Import CSS specific to this component

const MainCard = ({ title, items }) => {
  return (
    <div className="main-card">
      <h2>{title}</h2>
      <div className="sub-cards-container">
        {items.map((song) => (
        //   <div key={song.id} className="sub-card">
            <a key={song.track_id} href={`/player/${song.track_id}`} className="song-link sub-card">
              <b>{song.track_name}</b>
              <div style={{'fontSize':'0.8rem'}}>{song.genre}</div>
            </a>
        //   </div>
        ))}
      </div>
    </div>
  );
};

export default MainCard;