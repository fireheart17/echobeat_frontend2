// Playlist.jsx

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Playlist.css';
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import CheckAuth from "../components/CheckAuth";
import Navbar from '../components/Navbar';


const Song = () => {
    // const { id } = useParams(); // Capture playlist ID from URL
    const [songs, setSongs] = useState([]);
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
                const response = await fetch(`http://localhost:8081/api/likedSongs/userId/${id}`);
                const tracksData = await response.json();
                console.log(tracksData);
                // const response1 = await fetch(`http://localhost:8081/api/playlistsTracks/playlist/${id}`);
                // const tracksDat = await response1.json();
                // console.log(tracksDat);
                // Step 2: For each track, fetch artist details
                const tracksWithArtists = await Promise.all(
                    tracksData.map(async (track) => {
                        const artistResponse = await fetch(`http://localhost:8081/api/getTrackArtists/${track.track_id}`);
                        // console.log(artistResponse);
                        const artistData = await artistResponse.json();
                        console.log(artistData[0]);
                        // Assuming you want to display the first artist's name if multiple artists are returned
                        const artist_name = artistData.length > 0
                            ? `${artistData[0].artist_name}`
                            : "Unknown Artist";
                        const artist_id = artistData.length > 0
                            ? `${artistData[0].artist_id}`
                            : 0;
                        return {
                            trackId: track.track_id,
                            trackName: track.track_name,
                            artistName: artist_name,
                            artistId: artist_id,
                            genre: track.genre,
                        };
                    })
                );

                // Update state with combined track and artist data
                setSongs(tracksWithArtists);
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
            <div className="spacer" style={{height:'60px'}}></div>
                <h1>Liked Songs</h1>
                <div className="action-buttons">
                    {/* <button className="play-all-btn" onClick={playAllSongs}>
                    Play All
                </button> */}
                </div>
                <div className="songs-container">
                    <div className="songs-header">
                        <div>#</div>
                        <div>Title</div>
                        <div>Artist</div>
                        <div className="header-duration">Genre</div>
                    </div>
                    {isLoading ? (
                        <p>Loading songs...</p>
                    ) : (
                        songs.map((song, index) => (
                            <a key={song.trackId} href={`/player/${song.trackId}`} className="song-link">
                                <div key={song.trackId} className="song-row">
                                    <div className="song-number">{index + 1}</div>
                                    <div className="song-title">
                                        <span>{song.trackName}</span>
                                    </div>
                                    <div className="song-artist">
                                        <a key={song.trackId} href={`/artist/${song.artistId}`} className="song-link">
                                            <span>{song.artistName}</span>
                                        </a>
                                    </div>
                                    <div className="song-duration">
                                        <span>{song.genre}</span>
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
            <Navbar />
        </>
    );
};

export default Song;
