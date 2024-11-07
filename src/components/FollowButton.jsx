import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import "./FollowButton.css";

const FollowButton = ({ artist_id,fetch_artist }) => {
  const [userFollowsArtist,setUserFollowsArtist]=useState(false)
  const token = Cookies.get("token");
  console.log("token form button " + token);
  console.log("artist from button " + artist_id);
  const checkFollower=async ()=>{
    const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/checkfollower/${artist_id}`,
        {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      const resText=await res.text();
      setUserFollowsArtist(resText==="True");
  }
  useEffect(()=>{
    checkFollower()
  },[])
  const onClickHandler = async () => {

      if (!userFollowsArtist) {
        try {
          const res = await fetch(
            `${process.env.REACT_APP_BACKEND_URL}/api/addfollower/${artist_id}`,
            {
              method: "GET",
              headers: {
                "Authorization": `Bearer ${Cookies.get("token")}`,
              },
            }
          );
        //   const resJSON=await res.json()
        //   console.log(resJSON);

        } catch (error) {
          console.error("Error in adding follower");
        }
      } else {
        try {
            const res = await fetch(
              `${process.env.REACT_APP_BACKEND_URL}/api/followers/${artist_id}`,
              {
                method: "DELETE",
                headers: {
                  "Authorization": `Bearer ${Cookies.get("token")}`,
                },
              }
            );
          //   const resJSON=await res.json()
          //   console.log(resJSON);
  
          } catch (error) {
            console.error("Error in removing follower");
          }
      }
      await checkFollower()
      await fetch_artist()
  };

  return (
    <button className="follow-button" onClick={onClickHandler}>
        {userFollowsArtist?"Following":"Follow"}
    </button>
  );
};

export default FollowButton;
