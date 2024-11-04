import React, { useState, useEffect } from 'react';
import  useSpotifyPlayer  from './useSpotifyPlayer';
import Cookies from 'js-cookie'

const SpotifyWebPlayer = () => {
    const accessToken = Cookies.get("spotify_token");
  const trackId = "01zkbVsJQrtL1kwefeULG8";
  const { player, isPlayerReady } = useSpotifyPlayer(accessToken);

  useEffect(() => {
    if (isPlayerReady && player) {
      player.connect().then(() => {
        player.loadAndPlay(trackId);
      });
    }
  }, [isPlayerReady, player, trackId]);

  return (
    <div className="spotify-web-player">
      {isPlayerReady ? (
        <iframe
          src={`https://open.spotify.com/embed/track/${trackId}`}
          width="100%"
          height="380"
          frameBorder="0"
          allowFullScreen=""
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          title="Spotify Web Player"
        />
      ) : (
        <div>Loading Spotify Web Player...</div>
      )}
    </div>
  );
};

export default SpotifyWebPlayer;