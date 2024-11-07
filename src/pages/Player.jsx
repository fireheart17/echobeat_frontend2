import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { useParams } from "react-router-dom";
import "./Player.css";
import { useEffect, useState } from "react";
import CheckAuth from "../components/CheckAuth";
import useLikedSongs from "../components/useLikedSongs";
import LikeButton from "../components/LikeButton";
import Navbar from "../components/Navbar";

export default function Player() {
  const { id } = useParams();
  const [track, setTrack] = useState({
    track_name: "",
    genre: "",
    lyrics: "",
    like_count: 0,
    listen_count: 0,
    track_id: "",
  });

  const incrementListenCount = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/tracks/${id}/incrementListen`, {
        method: "PATCH", // Use PATCH for partial updates
      });

      if (response.ok) {
        console.log(`Listen count for track ${id} incremented successfully.`);
      } else {
        console.error("Failed to increment listen count.");
      }
    } catch (error) {
      console.error("Error incrementing listen count:", error);
    }
  };

  useEffect(()=>{
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/tracks/${id}`).then(res=>res.json()).then(track=>{setTrack(track)})
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
            <div className="track-name">{track.track_name} <LikeButton track_id={track.track_id}/></div>
            <div className="track-genre">{track.genre}</div>
          </div>
          <div className="track-player">
            <AudioPlayer
              src={`${process.env.REACT_APP_BACKEND_URL}/songs/track_${track.track_id}.mp3`}
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
