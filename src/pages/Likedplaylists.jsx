import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './PiyushChartstyles.css';
import "./Likedsongs.css";

const LikedPlaylistPage = () => {
    const { userId } = useParams();  // Access userId from URL
    const [likedPlaylists, setLikedPlaylists] = useState([]);

    useEffect(() => {
        const fetchLikedPlaylists = async () => {
            try {
                const response = await fetch(`http://localhost:8081/api/likedPlaylists/userId/${userId}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setLikedPlaylists(data);
            } catch (error) {
                console.error('Error fetching liked playlists:', error);
            }
        };

        if (userId) {
            fetchLikedPlaylists();
        }
    }, [userId]);  // Re-fetch if userId changes

    return (
        <div>
            {/* <Navbar /> */}
            <div className="play-container">
                <h1>Liked Playlists</h1>
                <div className="song-list-container">
                    <ul>
                        {likedPlaylists.map((playlist, index) => (
                            <li
                                key={index}
                                onClick={() => window.location.href = `player.html?songId=${playlist.playlist_id}`}
                            >
                                <div>{playlist.title}</div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default LikedPlaylistPage;
