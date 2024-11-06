// components/MainCard.js
import React from 'react';
import './MainCard.css'; // Import CSS specific to this component
import useLikedSongs from './useLikedSongs';

const MainCard = ({ title, items }) => {
  const [likedSongs,fetchLikedSongs]=useLikedSongs()
  return (
    <div className="main-card">
      <h2 style={{color:'var(--color-300)'}}>{title}</h2>
      <div className="sub-cards-container">
        {items.map((song) => (
        //   <div key={song.id} className="sub-card">
            <a key={song.track_id} href={`/player/${song.track_id}`} className="song-link sub-card">
              <b>{song.track_name} {likedSongs.includes(song.track_id) && <>&#10084;</>}</b>
              <div style={{'fontSize':'0.8rem'}}>{song.genre}</div>
              <img src="./wave.svg" alt="" style={{position:'relative',width:'300px',transform:'translate(0px,20px)'}}/>
            </a>
        //   </div>
        ))}
      </div>
    </div>
  );
};

export default MainCard;