// HomePage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import LikeButton from '../components/LikeButton';
import SearchBar from '../components/SearchBar';
import DeleteButton from '../components/DeleteButton';
import LikeButtonPlaylist from '../components/LikeButtonPlaylist';
import LikeButtonAlbum from '../components/LikeButtonAlbum';
import DeleteButtonPlaylist from '../components/DeleteButtonPlaylist';
import Cookies from "js-cookie";

const Demo = () => {
    // const navigate = useNavigate();
    // if (Cookies.get("token") == null) navigate("/login")
    
    // const token = Cookies.get("token");
    // console.log(token);
    return (
        <DeleteButtonPlaylist playlist_id={1} track_id={"1"}/>
    );
};

export default Demo;
