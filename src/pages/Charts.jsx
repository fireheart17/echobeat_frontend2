import React from 'react';
import './CSS/chart_styles.css';
import './CSS/colors.css';
import './CSS/navbar.css';

const Charts = ({ charts }) => {
  return (
    <div>
      <Navbar /> {/* Assuming Navbar is a separate React component */}

      <div className="charts-container">
        <h1>Top Charts</h1>
        {charts.map((chart) => (
          <div
            key={chart.chart_id}
            className="card"
            onClick={() => (window.location.href = `/chart?id=${chart.chart_id}`)}
          >
            <b>Chart name: {chart.chart_type}</b>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Charts;
