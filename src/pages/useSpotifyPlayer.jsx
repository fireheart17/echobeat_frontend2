import { useState, useEffect } from 'react';

const useSpotifyPlayer = (accessToken) => {
  const [player, setPlayer] = useState(null);
  const [isPlayerReady, setIsPlayerReady] = useState(false);

  useEffect(() => {
    // Initialize the Spotify Web Playback SDK
    const init = () => {
      window.onSpotifyWebPlaybackSDKReady = () => {
        const player = new window.Spotify.Player({
          name: 'React Spotify Player',
          getOAuthToken: (cb) => {
            cb(accessToken);
          },
          volume: 0.5,
        });

        player.addListener('ready', ({ device_id }) => {
          console.log('The Spotify player is ready to play music!');
          setIsPlayerReady(true);
        });

        player.addListener('not_ready', ({ device_id }) => {
          console.log('Device ID has gone offline', device_id);
        });

        setPlayer(player);
      };
    };

    // Load the Spotify Web Playback SDK
    const loadScript = () => {
      const script = document.createElement('script');
      script.src = 'https://sdk.scdn.co/spotify-player.js';
      script.async = true;
      document.body.appendChild(script);
    };

    // Initialize and load the Spotify Web Playback SDK
    if (accessToken) {
      loadScript();
      init();
    }

    // Clean up the script tag when the component unmounts
    return () => {
      if (player) {
        player.disconnect();
      }
      const script = document.querySelector('script[src="https://sdk.scdn.co/spotify-player.js"]');
      if (script) {
        script.parentNode.removeChild(script);
      }
    };
  }, [accessToken]);

  return { player, isPlayerReady };
};

export default useSpotifyPlayer;