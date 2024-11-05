// Playlist.jsx

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Playlist.css';
import SearchSongs from '../components/SearchSongs';
import CheckAuth from "../components/CheckAuth";

const Playlist = () => {
    const { id } = useParams(); // Capture playlist ID from URL
    const [songs, setSongs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch playlist data from the API and get artist details for each track
    const fetchPlaylistData = async () => {
        try {
            // Step 1: Fetch tracks for the playlist
            const response = await fetch(`http://localhost:8081/api/playlistsTracks/playlist/${id}`);
            const tracksData = await response.json();
            // console.log(tracksData);
            // Step 2: For each track, fetch artist details
            const tracksWithArtists = await Promise.all(
                tracksData.map(async (track) => {
                    const artistResponse = await fetch(`http://localhost:8081/api/getTrackArtists/${track.track_id}`);
                    // console.log(artistResponse);
                    const artistData = await artistResponse.json();
                    console.log(artistData);
                    // Assuming you want to display the first artist's name if multiple artists are returned
                    const artist_name = artistData.length > 0
                        ? `${artistData[0].first_name} ${artistData[0].last_name}`
                        : "Unknown Artist";

                    return {
                        trackId: track.track_id,
                        trackName: track.track_name,
                        artistName: artist_name,
                        duration: track.duration,
                    };
                })
            );

            // Update state with combined track and artist data
            setSongs(tracksWithArtists);
            return "success";
        } catch (error) {
            console.error("Error fetching playlist data:", error);
        } finally {
            setIsLoading(false);
        }
    };
    useEffect(() => {
        fetchPlaylistData().then(res => { console.log(res) });
    }, [id]);

    // Function to handle playing all songs
    const playAllSongs = () => {
        songs.forEach(song => playSong(song.trackId));
    };

    // Dummy functions to illustrate maintaining existing functionality
    const playSong = (trackId) => {
        console.log(`Playing song with ID: ${trackId}`);
    };

    const likeSong = (trackId) => {
        console.log(`Liking song with ID: ${trackId}`);
    };

    const addToQueue = (trackId) => {
        console.log(`Adding song with ID: ${trackId} to queue`);
    };

    return (
        <>
            <CheckAuth />
            <div className="playlist-container">
                <h1>Playlist</h1>
                <div className="action-buttons">
                    <button className="play-all-btn" onClick={playAllSongs}>
                        Play All
                    </button>
                </div>
                <div className="songs-container">
                    <div className="songs-header">
                        <div>#</div>
                        <div>Title</div>
                        <div>Artist</div>
                        <div className="header-duration">Duration</div>
                    </div>
                    {isLoading ? (
                        <p>Loading songs...</p>
                    ) : (
                        songs.map((song, index) => (
                            <div key={song.trackId} className="song-row">
                                <div className="song-number">{index + 1}</div>
                                <div className="song-title">
                                    <span>{song.trackName}</span>
                                </div>
                                <div className="song-artist">
                                    <span>{song.artistName}</span>
                                </div>
                                <div className="song-duration">
                                    <span>{song.duration}</span>
                                </div>
                                {/* <button onClick={() => playSong(song.trackId)}>Play</button> */}
                                {/* <button onClick={() => likeSong(song.trackId)}>Like</button> */}
                                {/* <button onClick={() => addToQueue(song.trackId)}>Add to Queue</button> */}
                            </div>
                        ))
                    )}
                </div>

                <div style={{ marginTop: '40px' }}><SearchSongs playlist_id={id} fetchData={fetchPlaylistData} /></div>
            </div>
        </>
    );
};

export default Playlist;
