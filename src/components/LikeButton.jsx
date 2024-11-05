import React, { useEffect, useState } from 'react';
import './LikeButton.css';

const LikeButton = ({ token, track_id}) => {
const [user, setUser] = useState([]);
    console.log("token form button " + token);
    console.log("track from button " + track_id);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('http://localhost:8081/api/users/validate', {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!res.ok) {
                    // Handle non-200 status codes (optional)
                    throw new Error('Failed to fetch user data');
                }

                const data = await res.json(); // The response body will be a simple integer (user_id)
                if (Number.isInteger(data)) {
                    setUser(data); // Set the `id` state with the integer value returned
                } else {
                    console.error('Expected an integer user_id but received:', data);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData()
    }, []);
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
