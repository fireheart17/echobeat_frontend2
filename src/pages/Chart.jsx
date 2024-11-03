import React from 'react';
import './CSS/chart_styles.css';
import './CSS/colors.css';
import './CSS/navbar.css';

const Chart = ({ chartName, chartSongs }) => {
  return (
    <div>
      <Navbar /> {/* Assuming Navbar is a separate React component */}

      <div className="song-list-container">
        <h1>{chartName?.chart_type}</h1>

        <ul>
          {chartSongs.map((song, index) => (
            <li key={index} onClick={() => window.location.href = `player.html?songId=${song.id}`}>
              {song.track_name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Chart;
