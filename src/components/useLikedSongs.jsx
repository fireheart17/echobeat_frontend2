import Cookies from 'js-cookie'
import { useEffect, useState } from 'react';


export default function useLikedSongs(){
    const [likedSongs,setLikedSongs] = useState([]);

    const fetchLikedSongs=async ()=>{
        const response = await fetch(`http://localhost:8081/api/likedSongsFromToken`,
            {
                method:"GET",
            headers:{
              Authorization:`Bearer ${Cookies.get("token")}`
            }
            }
        );
        const res = await response.json();
        // console.log("likedSongs " + res);
        setLikedSongs(res)
    }

    useEffect(() => {
        fetchLikedSongs().then(res => { console.log(res) });
    }, []);

    return [likedSongs,fetchLikedSongs];
}