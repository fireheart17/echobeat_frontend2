import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { useParams } from "react-router-dom";
import "./Player.css";
import { useEffect, useState } from "react";
import CheckAuth from "../components/CheckAuth";
import useLikedSongs from "../components/useLikedSongs";
import LikeButton from "../components/LikeButton";
import Navbar from "../components/Navbar";
import LikeButtonPodcast from "../components/LikeButtonPodcast";

export default function Player() {
  const { id } = useParams();
  const [podcast, setPodcast] = useState({
    podcast_name: "",
    genre: "",
    lyrics: "",
    like_count: 0,
    listen_count: 0,
    podcast_id: 0,
    duration:0,
    country:"None",
  });

  const incrementListenCount = async () => {
    try {
      const response = await fetch(`http://localhost:8081/api/podcasts/${id}/incrementListen`, {
        method: "PATCH", // Use PATCH for partial updates
      });

      if (response.ok) {
        console.log(`Listen count for Playlist ${id} incremented successfully.`);
      } else {
        console.error("Failed to increment listen count.");
      }
    } catch (error) {
      console.error("Error incrementing listen count:", error);
    }
  };

  useEffect(()=>{
    fetch(`http://localhost:8081/api/podcasts/${id}`).then(res=>res.json()).then(podcast=>{setPodcast(podcast)})
  },[])

  const handlePlay = () => {
    incrementListenCount();
  };

  return (
    <>
    <CheckAuth />
      <div className="track-wrapper">
        <div className="track-card">
          <div className="track-details">
            <div className="track-name">{podcast.podcast_name} <LikeButtonPodcast podcast_id={podcast.podcast_id}/></div>
            <div className="track-genre">{podcast.genre}</div>
          </div>
          <div className="track-player">
            <AudioPlayer
              src={`http://localhost:8081/songs/track_${podcast.podcast_id}.mp3`}
              style={{ borderRadius: "10px",backgroundColor:"var(--color-100)" }}
              onPlay={handlePlay}
            />
          </div>
          {/* <div className="track-lyrics"><span style={{whiteSpace:'pre',maxHeight:'200px',overflowY:'scroll',display:'block',overflowX:'hidden',fontStyle:'italic'}}>{track.lyrics || "Lyrics to this song are not available"}</span></div> */}
        </div>
      </div>
      <Navbar />
    </>
  );
}
