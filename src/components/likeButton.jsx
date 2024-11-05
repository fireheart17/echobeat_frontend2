import React, { useState } from 'react';
import './likeButton.css';

const LikeButton = ({ token, track_id}) => {
const [user, setUser] = useState(null);
    try {
        const res = fetch('http://localhost:8081/api/users/validate', {
            method: 'GET',
            headers: {
            Authorization : `Bearer ${token}`,
            },
        });
        const result = res.json();
        const intResult = Number(result);
        setUser(intResult);
        console.log(intResult);
    } 
    catch (error) {
        console.error('Error in fetching the user');
    }
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
