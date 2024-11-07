import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Navbar from './../components/Navbar';
import Cookies from "js-cookie";
import './user_style.css';

const UserProfile = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/users/profile`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${Cookies.get('token')}`,
                    },
                });
                if (!response.ok) {
                    navigate("/login");
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setUser(data);
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        };

        fetchUser();
    }, [navigate]);

    if (!user) {
        return <p>Loading...</p>;
    }

    // Determine subscription type based on subscription_id
    const subscriptionType = (user.subscription_id === 1 || user.subscription_id === null) ? "Free" : "Premium";

    return (
        <div>
            <div className="profile-container">
                <div className="spacer" style={{height:'60px'}}></div>
                <div className="profile-header">
                    <div className="profile-pic">
                        <img src="https://avatars.githubusercontent.com/u/118014773?v=4" alt="User" />
                    </div>
                    <div className="profile-info">
                        <h1>{user.firstName} {user.lastName}</h1>
                        <p>
                            <strong>Online:</strong> <span className="online-indicator">●</span>
                            <span style={{ marginLeft: '400px', fontWeight: 'bold', color: '#555' }}><h7>Subscription Type : </h7>{subscriptionType}</span>
                        </p>
                    </div>
                </div>

                <div className="profile-stats">
                    <div className="about-me">
                        <h2>About Me</h2>
                        <table className="info-table">
                            <tbody>
                                <tr>
                                    <td><strong>Member since:</strong></td>
                                    <td>April 26, 2015</td>
                                </tr>
                                <tr>
                                    <td><strong>Years Listening:</strong></td>
                                    <td>3</td>
                                </tr>
                                <tr>
                                    <td><strong>Birthday:</strong></td>
                                    <td>May 18, 1984</td>
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
                                    <td>1,024 hours</td>
                                </tr>
                                <tr>
                                    <td><strong>Favorite Artist:</strong></td>
                                    <td>Adele</td>
                                </tr>
                                <tr>
                                    <td><strong>Favorite Genre:</strong></td>
                                    <td>Pop</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <Navbar />
        </div>
    );
};

export default UserProfile;
