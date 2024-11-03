// // PlayList.jsx
// import React,{useState,useEffect} from 'react';
// import {useParams} from 'react-router-dom';
// import { Play, Clock, Heart, Share2, MoreHorizontal } from 'lucide-react';
// import './Playlist.css';

// const PlayList = () => {
//   const songs = [
//     {
//       id: 1,
//       title: "Midnight Rain",
//       artist: "Taylor Swift",
//       album: "Midnights",
//       duration: "3:24",
//       coverArt: "/api/placeholder/60/60"
//     },
//     {
//       id: 2,
//       title: "Blinding Lights",
//       artist: "The Weeknd",
//       album: "After Hours",
//       duration: "3:20",
//       coverArt: "/api/placeholder/60/60"
//     },
//     {
//       id: 3,
//       title: "As It Was",
//       artist: "Harry Styles",
//       album: "Harry's House",
//       duration: "2:47",
//       coverArt: "/api/placeholder/60/60"
//     },
//     {
//       id: 4,
//       title: "Anti-Hero",
//       artist: "Taylor Swift",
//       album: "Midnights",
//       duration: "3:20",
//       coverArt: "/api/placeholder/60/60"
//     }
//   ];

//   return (
//     <div className="playlist-container">
//       <div className="playlist-content">
//         {/* Hero Section */}
//         <div className="hero-section">
//           <div className="cover-art-container">
//             <img 
//               src="/api/placeholder/300/300" 
//               alt="Playlist Cover" 
//               className="cover-art"
//             />
//             <div className="cover-art-overlay">
//               <Play size={48} color="white" />
//             </div>
//           </div>
          
//           <div className="playlist-info">
//             <span className="playlist-label">PLAYLIST</span>
//             <h1 className="playlist-title">My Favorite Tracks</h1>
//             <div className="playlist-meta">
//               <img 
//                 src="/api/placeholder/30/30" 
//                 alt="User" 
//                 className="user-avatar"
//               />
//               <span className="creator-name">Created by You</span>
//               <span className="meta-separator">•</span>
//               <span className="songs-count">4 songs</span>
//             </div>
//           </div>
//         </div>

//         {/* Action Buttons */}
//         <div className="action-buttons">
//           <button className="play-all-btn">
//             <Play size={20} />
//             Play All
//           </button>
//           <button className="icon-btn">
//             <Heart size={24} />
//           </button>
//           <button className="icon-btn">
//             <Share2 size={24} />
//           </button>
//         </div>

//         {/* Songs List */}
//         <div className="songs-container">
//           {/* Header */}
//           <div className="songs-header">
//             <div className="header-number">#</div>
//             <div className="header-title">TITLE</div>
//             <div className="header-album">ALBUM</div>
//             <div className="header-artist">ARTIST</div>
//             <div className="header-duration">
//               <Clock size={16} />
//             </div>
//           </div>

//           {/* Songs */}
//           {songs.map((song, index) => (
//             <div key={song.id} className="song-row">
//               <div className="song-number">
//                 <span className="number">{index + 1}</span>
//                 <Play className="play-icon" size={16} />
//               </div>
              
//               <div className="song-title">
//                 <img 
//                   src={song.coverArt} 
//                   alt={song.title}
//                   className="song-cover"
//                 />
//                 <span className="title-text">{song.title}</span>
//               </div>
              
//               <div className="song-album">{song.album}</div>
//               <div className="song-artist">{song.artist}</div>
              
//               <div className="song-duration">
//                 <Heart size={16} className="heart-icon" />
//                 <span>{song.duration}</span>
//                 <MoreHorizontal size={20} className="more-icon" />
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PlayList;
// Playlist.jsx

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Playlist.css';

const Playlist = () => {
    const { id } = useParams(); // Capture playlist ID from URL
    const [songs, setSongs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch playlist data from the API
    useEffect(() => {
        const fetchPlaylistData = async () => {
            try {
                const response = await fetch(`/api/playlistsTracks/playlist/${id}`);
                const data = await response.json();
                setSongs(data);
            } catch (error) {
                console.error("Error fetching playlist data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPlaylistData();
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
                    <div>Album</div>
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
                            <div className="song-album">
                                <span>{song.albumName}</span>
                            </div>
                            <div className="song-duration">
                                <span>{song.duration}</span>
                            </div>
                            <button onClick={() => playSong(song.trackId)}>Play</button>
                            <button onClick={() => likeSong(song.trackId)}>Like</button>
                            <button onClick={() => addToQueue(song.trackId)}>Add to Queue</button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Playlist;
