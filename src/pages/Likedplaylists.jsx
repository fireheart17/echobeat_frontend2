// Playlist.jsx

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Playlist.css';
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import CheckAuth from "../components/CheckAuth";

const Song = () => {
    // const { id } = useParams(); // Capture playlist ID from URL
    const [playlists, setPlaylists] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [id, setId] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('http://localhost:8081/api/users/validate', {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${Cookies.get('token')}`,
                    },
                });

                if (!res.ok) {
                    // Handle non-200 status codes (optional)
                    throw new Error('Failed to fetch user data');
                }

                const data = await res.json(); // The response body will be a simple integer (user_id)

                // Assuming the API directly returns an integer user_id
                if (Number.isInteger(data)) {
                    setId(data); // Set the `id` state with the integer value returned
                } else {
                    console.error('Expected an integer user_id but received:', data);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData()
    }, []);

    // Fetch playlist data from the API and get artist details for each track
    useEffect(() => {
        const fetchPlaylistData = async () => {
            try {
                // Step 1: Fetch tracks for the playlist
                const response = await fetch(`http://localhost:8081/api/likedPlaylists/userId/${id}`);
                const playlistsData = await response.json();
                console.log(playlistsData);
                // const response1 = await fetch(`http://localhost:8081/api/playlistsTracks/playlist/${id}`);
                // const tracksDat = await response1.json();
                // console.log(tracksDat);
                // Step 2: For each track, fetch artist details
                const tracksWithArtists = await Promise.all(
                    playlistsData.map(async (playlist) => {
                        const response = await fetch(`http://localhost:8081/api/users/${id}`);
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        const token = await response.text();

                        const response2 = await fetch('http://localhost:8081/api/users/profile', {
                            method: 'GET',
                            headers: {
                                'Authorization': `Bearer ${token}`,
                                'Content-Type': 'application/json'
                            }
                        });

                        if (!response2.ok) {
                            throw new Error('Failed to fetch user profile');
                        }

                        const user = await response2.json();


                        // const userResponse = await fetch(`http://localhost:8081/api/getTrackArtists/${track.track_id}`);
                        // // console.log(artistResponse);
                        // const artistData = await artistResponse.json();
                        console.log(user);
                        // // Assuming you want to display the first artist's name if multiple artists are returned
                        const user_name = user
                            ? `${user.username}`
                            : "Unknown Artist";
                        console.log("hello" + user.user_name);
                        return {
                            playlistId: playlist.playlist_id,
                            playlistName: playlist.title,
                            userName: user_name,
                            duration: playlist.duration,
                        };
                    })
                );

                // Update state with combined track and artist data
                setPlaylists(tracksWithArtists);
            } catch (error) {
                console.error("Error fetching playlist data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPlaylistData();
    }, [id]);

    // Function to handle playing all songs
    // const playAllSongs = () => {
    //     songs.forEach(song => playSong(song.trackId));
    // };

    // // Dummy functions to illustrate maintaining existing functionality
    // const playSong = (trackId) => {
    //     console.log(`Playing song with ID: ${trackId}`);
    // };

    // const likeSong = (trackId) => {
    //     console.log(`Liking song with ID: ${trackId}`);
    // };

    // const addToQueue = (trackId) => {
    //     console.log(`Adding song with ID: ${trackId} to queue`);
    // };

    return (
        <>
            <CheckAuth />
            <div className="playlist-container">
                <h1>Liked Playlists</h1>
                <div className="action-buttons">
                    {/* <button className="play-all-btn" onClick={playAllSongs}>
                    Play All
                </button> */}
                </div>
                <div className="songs-container">
                    <div className="songs-header">
                        <div>#</div>
                        <div>Title</div>
                        <div>Creator</div>
                        <div className="header-duration">Duration</div>
                    </div>
                    {isLoading ? (
                        <p>Loading playlists...</p>
                    ) : (
                        playlists.map((playlist, index) => (
                            <a key={playlist.playlistId} href={`/playlist/${playlist.playlistId}`} className="song-link">
                                <div key={playlist.playlistId} className="song-row">
                                    <div className="song-number">{index + 1}</div>
                                    <div className="song-title">
                                        <span>{playlist.playlistName}</span>
                                    </div>
                                    <div className="song-artist">
                                        <span>{playlist.userName}</span>
                                    </div>
                                    <div className="song-duration">
                                        <span>{playlist.duration}</span>
                                    </div>
                                    {/* <button onClick={() => playSong(song.trackId)}>Play</button> */}
                                    {/* <button onClick={() => likeSong(song.trackId)}>Like</button> */}
                                    {/* <button onClick={() => addToQueue(song.trackId)}>Add to Queue</button> */}
                                </div>
                            </a>
                        ))
                    )}
                </div>
            </div>
        </>
    );
};

export default Song;
