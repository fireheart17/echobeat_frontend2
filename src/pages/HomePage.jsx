// HomePage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';
import CheckAuth from "../components/CheckAuth";

const HomePage = () => {
    const navigate = useNavigate();

    const handleGetStarted = () => {
        navigate('/login');
    };

    return (
        <>
            <CheckAuth />
            <div className="home-container">
                <header className="header">
                    <h1 className="app-name">EchoBeat</h1>
                </header>
                <main className="main-content">
                    <button className="get-started-btn" onClick={handleGetStarted}>
                        Get Started
                    </button>
                    <div className="home-circle"></div>
                    <p className="description">
                        Discover, listen, and share music from around the world with the best personalized music experience.
                    </p>
                    <h2 className="tagline">"Experience Music Like Never Before"</h2>
                </main>
            </div>
        </>
    );
};

export default HomePage;
