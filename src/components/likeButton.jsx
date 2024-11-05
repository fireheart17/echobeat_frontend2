import React, { useEffect, useState } from 'react';
import './likeButton.css';

const LikeButton = ({ token, track_id}) => {
const [user, setUser] = useState([]);
    console.log("token form button " + token);
    console.log("track from button " + track_id);
    useEffect(() => {
    const fetchData = async () => {
        try {
            const res = fetch('http://localhost:8081/api/users/validate', {
                method: 'GET',
                headers:{
                    Authorization:`Bearer ${token}`
                }
            });
            const data = res.json();
            setUser(data);
            console.log(data);
        } 
        catch (error) {
            console.error('Error in fetching the user');
        }
    }; fetchData()}, []);

  const onClickHandler = async() => {
    if (user && track_id) {
        const data = { user_id : user, track_id: track_id };
        console.log("User : " + user);
        console.log("Track : " + track_id);
        try{
            const res = await fetch('http://localhost:8081/api/likedSongs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
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
      className='likeButton'
    >
      ❤️
    </button>
  );
};

export default LikeButton;
