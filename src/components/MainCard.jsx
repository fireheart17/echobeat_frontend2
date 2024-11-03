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
            <a key={song.id} href={`/songs/${song.id}`} className="song-link sub-card">
              <b>{`Song name: ${song.track_name}`}</b>
            </a>
        //   </div>
        ))}
      </div>
    </div>
  );
};

export default MainCard;
