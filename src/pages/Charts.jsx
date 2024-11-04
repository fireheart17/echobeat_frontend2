import { React, useState, useEffect } from 'react';
import './chart_style.css';
import Navbar from './../components/Navbar';

const Charts = () => {

  const [charts, setCharts] = useState([]);

  // useEffect(() => {
  //   fetch('http://localhost:8081/api/charts')
  //     .then((response) => response.json())
  //     .then((data) => setCharts(data))
  //     .catch((error) => console.error('Error fetching charts:', error));
  // }, []);

  useEffect(() => {
    const fetchChart = async () => {
      try {
        const res = await fetch(`http://localhost:8081/api/charts/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        });
        const data = await res.json();
        setCharts(data);
      } catch (error) {
        console.error('Error fetching chart:', error);
      }
    };
  
    fetchChart();
  }, []);

  return (
    <div>
      <Navbar /> {/* Assuming Navbar is a separate React component */}

      <div className="charts-container">
        <h1 className='h1-charts'>Top Charts</h1>
        {charts.map((chart) => (
          <div
            key={chart.chart_id}
            className="card"
            onClick={() => (window.location.href = `/chart/${chart.chart_id}`)}
          >
            <b>Chart name: {chart.chart_type}</b>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Charts;
