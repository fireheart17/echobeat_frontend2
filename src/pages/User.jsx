import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './user_style.css';
import Navbar from './../components/Navbar';
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
    // const [token, setToken] = useState("");
    const [user, setUser] = useState(null);
    const navigate=useNavigate()
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch('http://localhost:8081/api/users/profile', {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${Cookies.get('token')}`,
                    },
                });
                if (!response.ok) {
                    navigate("/login");
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();  // Assuming the token is returned as plain text
                console.log(data);
                setUser(data);
            } catch (error) {
                console.error('Error fetching token:', error);
            }
        };

        fetchUser();
    }, []); 

    // useEffect(() => {
    //     const fetchUser = async () => {
    //         if (token) {
    //             try {
    //                 const response = await fetch('http://localhost:8081/api/users/profile', {
    //                     method: 'GET',
    //                     headers: {
    //                         'Authorization': `Bearer ${token}`,
    //                         'Content-Type': 'application/json'
    //                     }
    //                 });

    //                 if (!response.ok) {
    //                     throw new Error('Failed to fetch user profile');
    //                 }

    //                 const userData = await response.json();
    //                 setUser(userData);
    //             } catch (error) {
    //                 console.error('Error fetching user profile:', error);
    //             }
    //         }
    //     };

    //     fetchUser();
    // }, [token]);

    // console.log(user.first_name);

    if (!user) {
        console.log(user);
        return <p>Loading...</p>;
    }

    return (
        <div>
            

            <div className="profile-container">
            <div className="spacer" style={{height:'60px'}}></div>
                <div className="profile-header">
                    <div className="profile-pic">
                        <img src="https://avatars.githubusercontent.com/u/118014773?v=4" alt="User Picture" />
                    </div>
                    <div className="profile-info">
                        <h1>{user.firstName} {user.lastName}</h1>
                        <p><strong>Online:</strong> <span className="online-indicator">●</span></p>
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
                                    {/* <td>{userInfo.memberSince}</td> */}
                                </tr>
                                <tr>
                                    <td><strong>Years Listening:</strong></td>
                                    <td>3</td>
                                    {/* <td>{userInfo.yearsListening}</td> */}
                                </tr>
                                <tr>
                                    <td><strong>Birthday:</strong></td>
                                    <td>May 18, 1984</td>
                                    {/* <td>{userInfo.birthday}</td> */}
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
                                    {/* <td>{userInfo.hoursListened}</td> */}
                                </tr>
                                <tr>
                                    <td><strong>Favorite Artist:</strong></td>
                                    <td>Adele</td>
                                    {/* <td>{userInfo.favoriteArtist}</td> */}
                                </tr>
                                <tr>
                                    <td><strong>Favorite Genre:</strong></td>
                                    <td>Pop</td>
                                    {/* <td>{userInfo.favoriteGenre}</td> */}
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
