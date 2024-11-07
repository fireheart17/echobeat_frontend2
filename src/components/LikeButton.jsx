import React, { useEffect, useState } from "react";
import "./LikeButton.css";
import Cookies from "js-cookie";
import useLikedSongs from "./useLikedSongs";

const LikeButton = ({ track_id }) => {
  const [user, setUser] = useState([]);
  const [likedSongs, fetchLikedSongs] = useLikedSongs();
  const token = Cookies.get("token");
  console.log("bool " + likedSongs.includes(track_id));
  console.log("all  ", likedSongs);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/users/validate`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          // Handle non-200 status codes (optional)
          throw new Error("Failed to fetch user data");
        }

        const data = await res.json(); // The response body will be a simple integer (user_id)
        if (Number.isInteger(data)) {
          setUser(data); // Set the `id` state with the integer value returned
        } else {
          console.error("Expected an integer user_id but received:", data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  const onClickHandler = async () => {
    if (user && track_id) {
      const data = { user_id: user, track_id: track_id };
      console.log("User : " + user);
      console.log("Track : " + track_id);
      if (likedSongs.includes(track_id)) {
        try {
          const res = await fetch(
            `${process.env.REACT_APP_BACKEND_URL}/api/likedSongs/${user}/${track_id}`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(data),
            }
          );
        } catch (error) {
          console.error("Error in Deleting the liked song");
        }
      } else {
        try {
          const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/likedSongs`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          });
        } catch (error) {
          console.error("Error in Putting the liked song");
        }
      }
    } else {
      console.warn("User or Track ID is missing!");
    }
    await fetchLikedSongs();
  };

  return (
    <div onClick={onClickHandler}>
      <div className="like-button">
        {likedSongs.includes(track_id) ? <>&#10084;</> : <>&#9825;</>}
      </div>
    </div>
  );
};

export default LikeButton;
