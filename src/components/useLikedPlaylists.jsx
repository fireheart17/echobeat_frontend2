import Cookies from 'js-cookie'
import { useEffect, useState } from 'react';


export default function useLikedSongs(){
    const [likedPlaylists,setLikedPlaylists] = useState([]);

    const fetchLikedPlaylists=async ()=>{
        const response = await fetch(`http://localhost:8081/api/likedPlaylistsFromToken`,
            {
                method:"GET",
            headers:{
              Authorization:`Bearer ${Cookies.get("token")}`
            }
            }
        );
        if(response.status===200){
            const res = await response.json();
            // console.log("likedSongs " + res);
            setLikedPlaylists(res)
        }
    }

    useEffect(() => {
        fetchLikedPlaylists().then(res => { console.log(res) });
    }, []);

    return [likedPlaylists,fetchLikedPlaylists];
}