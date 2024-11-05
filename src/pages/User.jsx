import React, { useState } from 'react';
import './user_style.css';
import Navbar from './../components/Navbar';
import CheckAuth from "../components/CheckAuth";

const UserProfile = () => {
    const [showForm, setShowForm] = useState(false);
    const [userInfo, setUserInfo] = useState({
        firstName: 'Janie',
        lastName: 'Jones',
        memberSince: 'April 26, 2015',
        yearsListening: 3,
        birthday: 'May 18, 1984',
        hoursListened: '1,024 hours',
        favoriteArtist: 'Adele',
        favoriteGenre: 'Pop',
        location: 'New York, NY'
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserInfo({
            ...userInfo,
            [name]: value,
        });
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        // Save changes or handle form submission logic here
        setShowForm(false);
    };

    return (
        <>
            <CheckAuth />
            <div>
                <Navbar />

                <div className="profile-container">
                    <div className="profile-header">
                        <div className="profile-pic">
                            {/* <img src="https://avatars.githubusercontent.com/u/118014773?v=4" alt="User Picture" /> */}
                            <img src="http://localhost:8081/songs/cat.png" alt="User Picture" />
                        </div>
                        <div className="profile-info">
                            <h1>{userInfo.firstName} {userInfo.lastName}</h1>
                            <p><strong>Online:</strong> <span className="online-indicator">●</span></p>
                            <button className="btn" onClick={() => setShowForm(true)}>Change User Information</button>
                        </div>
                    </div>

                    <div className="profile-stats">
                        <div className="about-me">
                            <h2>About Me</h2>
                            <table className="info-table">
                                <tbody>
                                    <tr>
                                        <td><strong>Member since:</strong></td>
                                        <td>{userInfo.memberSince}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Years Listening:</strong></td>
                                        <td>{userInfo.yearsListening}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Birthday:</strong></td>
                                        <td>{userInfo.birthday}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="my-stats">
                            <h2>My Stats</h2>
                            <table className="info-table">
                                <tbody>
                                    <tr>
                                        <td><strong>Hours Listened:</strong></td>
                                        <td>{userInfo.hoursListened}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Favorite Artist:</strong></td>
                                        <td>{userInfo.favoriteArtist}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Favorite Genre:</strong></td>
                                        <td>{userInfo.favoriteGenre}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {showForm && (
                        <div id="user-info-form" className="form-popup">
                            <div className="form-container">
                                <h2>Change User Information</h2>
                                <form onSubmit={handleFormSubmit}>
                                    <label htmlFor="firstName">First Name:</label>
                                    <input
                                        type="text"
                                        id="firstName"
                                        name="firstName"
                                        value={userInfo.firstName}
                                        onChange={handleInputChange}
                                        required
                                    />

                                    <label htmlFor="lastName">Last Name:</label>
                                    <input
                                        type="text"
                                        id="lastName"
                                        name="lastName"
                                        value={userInfo.lastName}
                                        onChange={handleInputChange}
                                        required
                                    />

                                    <label htmlFor="location">Location:</label>
                                    <input
                                        type="text"
                                        id="location"
                                        name="location"
                                        value={userInfo.location}
                                        onChange={handleInputChange}
                                        required
                                    />

                                    <label htmlFor="favoriteArtist">Favorite Artist:</label>
                                    <input
                                        type="text"
                                        id="favoriteArtist"
                                        name="favoriteArtist"
                                        value={userInfo.favoriteArtist}
                                        onChange={handleInputChange}
                                        required
                                    />

                                    <label htmlFor="favoriteGenre">Favorite Genre:</label>
                                    <input
                                        type="text"
                                        id="favoriteGenre"
                                        name="favoriteGenre"
                                        value={userInfo.favoriteGenre}
                                        onChange={handleInputChange}
                                        required
                                    />

                                    <button type="submit" className="btn">Save Changes</button>
                                    <button type="button" className="btn cancel" onClick={() => setShowForm(false)}>Close</button>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default UserProfile;
