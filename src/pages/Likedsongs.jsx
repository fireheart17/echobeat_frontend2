import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './PiyushChartstyles.css';
import "./Likedsongs.css";

const PlaylistPage = () => {
    const { userId } = useParams();  // Access userId from URL
    const [likedSongs, setLikedSongs] = useState([]);

    useEffect(() => {
        const fetchLikedSongs = async () => {
            try {
                const response = await fetch(`http://localhost:8081/api/likedSongs/userId/${userId}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setLikedSongs(data);
            } catch (error) {
                console.error('Error fetching liked songs:', error);
            }
        };

        if (userId) {
            fetchLikedSongs();
        }
    }, [userId]);  // Re-fetch if userId changes

    return (
        <div>
            {/* <Navbar /> */}
            <div className="play-container">
                <h1>Liked Songs</h1>
                <div className="song-list-container">
                    <ul>
                        {likedSongs.map((song, index) => (
                            <li
                                key={index}
                                onClick={() => window.location.href = `player.html?songId=${song.id}`}
                            >
                                <div>{song.track_name}</div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default PlaylistPage;
