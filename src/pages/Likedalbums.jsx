import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './PiyushChartstyles.css';
import "./Likedsongs.css";

const LikedAlbumsPage = () => {
    const { userId } = useParams();  // Access userId from URL
    const [likedAlbums, setLikedAlbums] = useState([]);

    useEffect(() => {
        const fetchLikedAlbums = async () => {
            try {
                const response = await fetch(`http://localhost:8081/api/likedAlbums/userId/${userId}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setLikedAlbums(data);
            } catch (error) {
                console.error('Error fetching liked albums:', error);
            }
        };

        if (userId) {
            fetchLikedAlbums();
        }
    }, [userId]);  // Re-fetch if userId changes

    return (
        <div>
            {/* <Navbar /> */}
            <div className="play-container">
                <h1>Liked Albums</h1>
                <div className="song-list-container">
                    <ul>
                        {likedAlbums.map((album, index) => (
                            <li
                                key={index}
                                onClick={() => window.location.href = `player.html?songId=${album.album_id}`}
                            >
                                <div>{album.title}</div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default LikedAlbumsPage;
