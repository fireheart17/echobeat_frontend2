import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './PiyushChartstyles.css';
import "./Likedsongs.css";

const LikedPodcastsPage = () => {
    const { userId } = useParams();  // Access userId from URL
    const [likedPodcasts, setLikedPodcasts] = useState([]);

    useEffect(() => {
        const fetchLikedPodcasts = async () => {
            try {
                const response = await fetch(`http://localhost:8081/api/likedPodcasts/userId/${userId}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setLikedPodcasts(data);
            } catch (error) {
                console.error('Error fetching liked podcasts:', error);
            }
        };

        if (userId) {
            fetchLikedPodcasts();
        }
    }, [userId]);  // Re-fetch if userId changes

    return (
        <div>
            {/* <Navbar /> */}
            <div className="play-container">
                <h1>Liked Podcasts</h1>
                <div className="song-list-container">
                    <ul>
                        {likedPodcasts.map((podcast, index) => (
                            <li
                                key={index}
                                onClick={() => window.location.href = `player.html?songId=${podcast.podcast_id}`}
                            >
                                <div>{podcast.podcast_name}</div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default LikedPodcastsPage;
