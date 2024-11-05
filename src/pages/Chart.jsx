import React, { useEffect, useState } from 'react';
import './chart_style.css';
import Navbar from './../components/Navbar';
import { wait } from '@testing-library/user-event/dist/utils';
import { useParams } from 'react-router-dom';
import CheckAuth from "../components/CheckAuth";

const Chart = () => {
  const { id } = useParams(); // Get ID from URL params
  const [chart, setChart] = useState([]);
  const [chartSongs, setChartSongs] = useState([]);
  
  useEffect(() => {
    const fetchChart = async () => {
      try {
        const res = await fetch(`http://localhost:8081/api/charts/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        });
        const data = await res.json();
        setChart(data);
      } catch (error) {
        console.error('Error fetching chart:', error);
      }
    };
  
    fetchChart();
  }, [id]); // Add id as dependency
  useEffect(() => {
    const fetchChartSongs = async () => {
      try {
        const res = await fetch(`http://localhost:8081/api/rankings/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        });
        const data = await res.json();
        setChartSongs(data);
      } catch (error) {
        console.error('Error fetching chart:', error);
      }
    };
  
    fetchChartSongs();
  }, [id]); // Add id as dependency
  return (
    <>
    <CheckAuth />
    <div>
      <Navbar /> {/* Assuming Navbar is a separate React component */}
      <div className="song-list-container">
        <h1 className='h1-charts'>{chart?.chart_type}</h1>

        <ul className='ul-charts'>
          {chartSongs.map((song, index) => (
            <li className='li-charts' key={index} onClick={() => window.location.href = `player.html?songId=${song.id}`}>
              {song.track_name}
            </li>
          ))}
        </ul>
      </div>
    </div>
    </>
  );
};

export default Chart;
