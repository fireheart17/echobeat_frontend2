import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "./artist_styles.css";
// import "./style.css";

const ArtistProfile = () => {
    const { artistId } = useParams();  // Access artistId from URL
    const [artist, setArtist] = useState(null);
    const [tracks, setTracks] = useState([]);
    const [albums, setAlbums] = useState([]);
    const [activeSection, setActiveSection] = useState('overview');  // Add activeSection state

    useEffect(() => {
        const fetchArtist = async () => {
            try {
                const response = await fetch(`http://localhost:8081/api/artists/${artistId}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setArtist(data);
            } catch (error) {
                console.error('Error fetching artist data:', error);
            }
        };

        if (artistId) {
            fetchArtist();
        }
    }, [artistId]);  // Re-fetch if artistId changes

    useEffect(() => {
        const fetchAlbums = async () => {
            try {
                const response = await fetch(`http://localhost:8081/api/artistalbums/${artistId}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setAlbums(data);
            } catch (error) {
                console.error('Error fetching albums:', error);
            }
        };

        if (artistId) {
            fetchAlbums();
        }
    }, [artistId]);  // Re-fetch if artistId changes

    useEffect(() => {
        const fetchTracks = async () => {
            try {
                const response = await fetch(`http://localhost:8081/api/artisttracks/${artistId}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setTracks(data);
            } catch (error) {
                console.error('Error fetching tracks:', error);
            }
        };

        if (artistId) {
            fetchTracks();
        }
    }, [artistId]);  // Re-fetch if artistId changes

    const showSection = (section) => {
        setActiveSection(section);
    };

    return (
        <div>
            <header>
                {/* Assuming fragments/navbar is another React component */}
                {/* <Navbar /> */}
            </header>

            <section className="profile-section">
                <div className="profile-container">
                    <div className="profile-info">
                        <img
                            src="https://avatars.githubusercontent.com/u/118014773?v=4"
                            alt="User Image"
                            className="profile-img"
                        />
                        <div className="profile-details">
                            <h2>{`${artist?.first_name} ${artist?.last_name}`}</h2>
                            <p className="followers">{`#Followers: ${artist?.follower_count}`}</p>
                            <p className="global-rank">{`Global Rank: ${artist?.global_rank}`}</p>
                            <p className="country">{`Country: ${artist?.country}`}</p>
                            <button className="follow-btn">Follow</button>
                        </div>
                    </div>
                    <div className="profile-nav">
                        <ul>
                            <li>
                                <a
                                    href="#"
                                    className={activeSection === 'overview' ? 'active' : ''}
                                    onClick={() => showSection('overview')}
                                >
                                    Overview
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className={activeSection === 'songs' ? 'active' : ''}
                                    onClick={() => showSection('songs')}
                                >
                                    Songs
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className={activeSection === 'albums' ? 'active' : ''}
                                    onClick={() => showSection('albums')}
                                >
                                    Albums
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            {activeSection === 'overview' && (
                <section className="about-section" id="overview">
                    <h3>{`About ${artist?.first_name}`}</h3>
                    <div className="about-container">{artist?.about}</div>
                </section>
            )}

            {activeSection === 'songs' && (
                <section id="songs">
                    <div className="song-list-container">
                        <ul id="songList">
                            {tracks?.map((track, index) => (
                                <li key={index} className="song">
                                    <div>{track?.track_name}</div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>
            )}

            {activeSection === 'albums' && (
                <section id="albums">
                    <div className="album-list-container">
                        <ul id="albumList">
                            {albums?.map((album, index) => (
                                <li key={index} className="album">
                                    <a href={`/albums/${album.id}`} className="nlink">
                                        <div>{album?.title}</div>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>
            )}

            <footer>
                <p>&copy; 2024 EchoBeat</p>
            </footer>
        </div>
    );
};

export default ArtistProfile;
