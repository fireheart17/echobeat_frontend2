import React, { useEffect, useState } from "react";
import "./LikeButton.css";
import Cookies from "js-cookie";
import useLikedSongs from "./UserLikedPodcasts";

const LikeButton = ({ podcast_id }) => {
  const [user, setUser] = useState([]);
  const [likedSongs, fetchLikedSongs] = useLikedSongs();
  const token = Cookies.get("token");
  console.log("bool " + likedSongs.includes(podcast_id));
  console.log("all  ", likedSongs);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:8081/api/users/validate", {
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
    if (user && podcast_id) {
      const data = { user_id: user, podcast_id: podcast_id };
      console.log("User : " + user);
      console.log("Podcast : " + podcast_id);
      if (likedSongs.includes(podcast_id)) {
        try {
          const res = await fetch(
            `http://localhost:8081/api/liked-podcasts/${user}/${podcast_id}`,
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
          const res = await fetch("http://localhost:8081/api/liked-podcasts", {
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
      console.warn("User or Podcast ID is missing!");
    }
    await fetchLikedSongs();
  };

  return (
    <div onClick={onClickHandler}>
      <div className="like-button">
        {likedSongs.includes(podcast_id) ? <>&#10084;</> : <>&#9825;</>}
      </div>
    </div>
  );
};

export default LikeButton;
