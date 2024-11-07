import React, { useEffect, useState } from 'react';
import './DeleteButton.css';

const DeleteButtonPlaylist = (props) => {
    console.log("Playlist form button " + props.playlist_id);
    console.log("track from button " + props.track_id);
  const onClickHandler = async() => {
    if (props.playlist_id && props.track_id) {
        const data = { playlist_id : props.playlist_id, track_id: props.track_id };
        console.log("Playlist : " + props.playlist_id);
        console.log("Track : " + props.track_id);
        try{
            const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/playlistsTracks/${props.playlist_id}/${props.track_id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            console.log("yes");
            await props.fetchData();
        }
        catch(error){
            console.error('Error in Putting the liked song');
        }
    } else {
      console.warn("User or Track ID is missing!");
    }
  };

  return (
    <button 
      onClick={onClickHandler}
      className='DeleteButton'
    >
        &#8722;
    </button>
  );
};

export default DeleteButtonPlaylist;
