// Playlist.jsx

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Playlist.css';
import SearchSongs from '../components/SearchSongs';
import CheckAuth from "../components/CheckAuth";
import LikeButton from '../components/LikeButton';

const Playlist = () => {
    const { id } = useParams(); // Capture playlist ID from URL
    const [songs, setSongs] = useState([]);
    const [playlist, setPlaylist] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:8081/api/playlists/${id}`);
                const playlist = await response.json();
                setPlaylist(playlist);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData()
    }, [id]);

    // Fetch playlist data from the API and get artist details for each track
    const fetchPlaylistData = async () => {
        try {
            // Step 1: Fetch tracks for the playlist
            const response = await fetch(`http://localhost:8081/api/playlistsTracks/playlist/${id}`);
            const tracksData = await response.json();
            console.log("here " + tracksData);
            // Step 2: For each track, fetch artist details
            const tracksWithArtists = await Promise.all(
                tracksData.map(async (track) => {
                    const artistResponse = await fetch(`http://localhost:8081/api/getTrackArtists/${track.track_id}`);
                    // console.log(artistResponse);
                    const artistData = await artistResponse.json();
                    console.log(artistData);
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
                <h1>{playlist.title}</h1>
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
                        <div className="header-duration">Duration</div>
                    </div>
                    {isLoading ? (
                        <p>Loading songs...</p>
                    ) : (
                        songs.map((song, index) => (
                            <div key={song.trackId} className="song-row">
                                <div className="song-number">{index + 1}</div>
                                <a key={song.trackId} href={`/player/${song.trackId}`} className="song-link">
                                    <div className="song-title">
                                        <span>{song.trackName}</span>
                                    </div>
                                </a>
                                <div className="song-artist">
                                    <a key={song.trackId} href={`/artist/${song.artistId}`} className="song-link">
                                        <span>{song.artistName}</span>
                                    </a>
                                </div>
                                <div className="song-duration">
                                    <span>{song.duration}</span>
                                </div>
                                <div style = {{marginLeft:'40%'}}> <LikeButton track_id={song.trackId}/> </div>
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
