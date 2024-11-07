import { useState } from "react";
import "./login_styles.css";
import { useNavigate } from "react-router-dom";

export default function UploadTrack() {
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate=useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    const track_id = e.target.track_id.value;
    const track_name = e.target.track_name.value;
    const genre = e.target.genre.value;
    const album_id = parseInt(e.target.album_id.value);
    const country = e.target.country.value;
    const duration = parseInt(e.target.duration.value);
    const artists = e.target.artists.value.split(",");
    const file = selectedFile;
    const data = new FormData();
    data.append("file", file);
    data.append("track_id", track_id);
    const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/upload`, {
      method: "POST",
      body: data,
    });
    console.log(res);
    if (res.status !== 201) {
      console.log("couldnt upload track");
      document.getElementById("usernameAlreadyExists").style.display =
          "block";
      return;
    }
    const res2 = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/tracks`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        track_id: track_id,
        track_name: track_name,
        genre: genre,
        album_id: album_id,
        country: country,
        duration: duration,
      }),
    });
    console.log(res2);
    if (res2.status !== 201) {
      console.log("couldnt create track");
      document.getElementById("usernameAlreadyExists").style.display =
          "block";
      return;
    }
    artists.forEach(async (artist) => {
      const artist_id = parseInt(artist);
      const res3 = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/track-creators`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          track_id: track_id,
          artist_id: artist_id,
        }),
      });
      if (res3.status !== 201) {
        console.log("couldnt create track");
        document.getElementById("usernameAlreadyExists").style.display =
            "block";
        return;
      }
    });
    alert("song uploaded successfully")
    navigate('/')
  };

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };
//   return (
//     <>
//       <form onSubmit={handleSubmit}>
//         <input type="text" name="track_id" placeholder="track id" />
//         <input type="text" name="track_name" placeholder="track name" />
//         <input type="text" name="genre" placeholder="genre" />
//         <input type="text" name="album_id" placeholder="album_id" />
//         <input type="text" name="duration" placeholder="duration" />
//         <input type="text" name="country" placeholder="country" />
//         <input
//           type="text"
//           name="artists"
//           placeholder="artist_ids [comma seperated]"
//         />
//         <input type="file" onChange={handleFileSelect} />
//         <button type="submit">Submit</button>
//       </form>
//     </>
//   );
  return (
    <div className="login-wrapper">
      <div className="login-container">
        <h3 className="login-title">Upload a new Song</h3>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              className="custom-input"
              type="text"
              name="track_id" placeholder="track id"
              required
            />
          </div>
          <div className="input-group">
            <input
              className="custom-input"
              type="text"
              name="track_name" placeholder="track name"
              required
            />
          </div>
          <div className="input-group">
            <input
              className="custom-input"
              type="text"
              name="genre" placeholder="genre"
              required
            />
          </div>
          <div className="input-group">
            <input
              className="custom-input"
              type="text"
              name="duration" placeholder="duration"
              required
            />
          </div>
          <div className="input-group">
            <input
              className="custom-input"
              type="text"
              name="album_id" placeholder="album id"
              required
            />
          </div>
          <div className="input-group">
            <input
              className="custom-input"
              type="text"
              name="country" placeholder="country"
              required
            />
          </div>
          <div className="input-group">
            <input
              className="custom-input"
              type="text"
              name="artists" placeholder="artist_ids [comma seperated]"
              required
            />
          </div>
          <div className="input-group">
            <input
              className="custom-input"
              type="file"
              name="track_file"
              onChange={handleFileSelect}
              required
            />
          </div>

          <div className="input-group">
            <button className="login-button" type="submit">
              Upload
            </button>
          </div>
        </form>
        <div
          className="error-message"
          id="usernameAlreadyExists"
          style={{ display: "none" }}
        >
          Unable to upload
        </div>
      </div>
    </div>
  );
}
