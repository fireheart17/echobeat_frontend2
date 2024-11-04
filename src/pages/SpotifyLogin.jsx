import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
const CLIENT_ID = "1073d00824564b6a9c78518d6b87da68";
const REDIRECT_URI = "http://localhost:3000/spotify_auth"; // e.g., http://localhost:3000/callback
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";
const SCOPES = [
  "user-read-playback-state",
  "user-modify-playback-state",
  "streaming",
  "user-read-email",
  "user-read-private",
].join(" ");

function SpotifyAuth() {
  const [accessToken, setAccessToken] = useState(null);
  const navigate = useNavigate();

  // Function to build the Spotify authorization URL
  const getAuthUrl = () => {
    console.log(SCOPES);
    return `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${encodeURIComponent(
      REDIRECT_URI
    )}&scope=${encodeURIComponent(SCOPES)}`;
  };

  // Function to handle the authorization code from the redirect
  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get("code");
    if (code) {
      getAccessToken(code);
    }
  }, []);

  // Function to get the access token
  const getAccessToken = async (code) => {
    if (accessToken !== null) return;
    const body = new URLSearchParams();
    body.append("grant_type", "authorization_code");
    body.append("code", code);
    body.append("redirect_uri", REDIRECT_URI);

    try {
      const response = await fetch(TOKEN_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${btoa(
            `${CLIENT_ID}:4b7d5a305477432994c145ca6533b034`
          )}`,
        },
        body: body.toString(),
      });

      const data = await response.json();
      setAccessToken(data.access_token);
      if (data.access_token) {
        Cookies.set("spotify_token", data.access_token);
        // return navigate(`/token/${data.access_token}`);
        return navigate("/");
      }
    } catch (error) {
      console.error("Error fetching the access token", error);
    }
  };

  return (
    <div>
      <a href={getAuthUrl()}>Login with Spotify</a>
    </div>
  );
}

export default SpotifyAuth;
