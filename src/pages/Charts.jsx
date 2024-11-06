import { React, useState, useEffect } from 'react';
import './chart_style.css';
import Navbar from './../components/Navbar';
import CheckAuth from "../components/CheckAuth";

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
    <>
      <CheckAuth />
      <div>
        <Navbar /> {/* Assuming Navbar is a separate React component */}

        <div className="charts-container">
        <div className="spacer" style={{height:'60px'}}></div>
          <h1 className='h1-charts'>Top Charts</h1>
          {charts.map((chart) => (
            <div
              key={chart.chart_id}
              className="card"
              onClick={() => (window.location.href = `/chart/${chart.chart_id}`)}
            >
              <b>{chart.chart_type}</b>
            </div>
          ))}
        </div>
      </div>
      <Navbar />
    </>
  );
};

export default Charts;
