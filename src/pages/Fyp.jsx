// App.js
import React, { useState } from 'react';
import './Fyp.css'; // Plain CSS file
import Navbar from './../components/Navbar';
import HeroSection from './../components/HeroSection';
// import Menu from './../components/Menu';
import MainCard from './../components/MainCard';

const App = () => {
  // Example state for demonstration
  const [topPicks, setTopPicks] = useState([
    { id: 1, track_name: 'Song A' },
    { id: 2, track_name: 'Song B' },
  ]);

  const [newTracks, setNewTracks] = useState([
    { id: 3, track_name: 'New Release A' },
    { id: 4, track_name: 'New Release B' },
  ]);

  return (
    <div>
      <Navbar />
      <HeroSection />
      <div className="wrapper">
        <MainCard title="Top Picks" items={topPicks} />
        <MainCard title="New Releases" items={newTracks} />
      </div>
    </div>
  );
};

export default App;
