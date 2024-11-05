import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { useParams } from "react-router-dom";
import "./Player.css";
import { useEffect, useState } from "react";

export default function Player() {
  const { id } = useParams();
  console.log(id);
  const [track, setTrack] = useState({
    track_name: "",
    genre: "",
    lyrics: "",
    like_count: 0,
    listen_count: 0,
    track_id: "",
  });

  useEffect(()=>{
    fetch(`http://localhost:8081/api/tracks/${id}`).then(res=>res.json()).then(track=>{setTrack(track)})
  },[])

  return (
    <>
      <div className="track-wrapper">
        <div className="track-card">
          <div className="track-details">
            <div className="track-name">{track.track_name}</div>
            <div className="track-genre">{track.genre}</div>
          </div>
          <div className="track-player">
            <AudioPlayer
              src={`http://localhost:8081/songs/track_${track.track_id}.mp3`}
              style={{ borderRadius: "10px",backgroundColor:"var(--color-100)" }}
            />
          </div>
          {/* <div className="track-lyrics"><span style={{whiteSpace:'pre',maxHeight:'200px',overflowY:'scroll',display:'block',overflowX:'hidden',fontStyle:'italic'}}>{track.lyrics || "Lyrics to this song are not available"}</span></div> */}
        </div>
      </div>
    </>
  );
}
