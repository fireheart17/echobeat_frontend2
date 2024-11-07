// HomePage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import LikeButton from '../components/LikeButton';
import SearchBar from '../components/SearchBar';
import DeleteButton from '../components/DeleteButton';
import LikeButtonAlbum from '../components/LikeButtonAlbum';
import DeleteButtonPlaylist from '../components/DeleteButtonPlaylist';
import AddPlaylist from '../components/AddPlaylist';
import Cookies from "js-cookie";
import LikeButtonPlaylist from '../components/LikeButtonPlaylist';

const Demo = () => {
    // const navigate = useNavigate();
    // if (Cookies.get("token") == null) navigate("/login")
    
    // const token = Cookies.get("token");
    // console.log(token);
    return (
        <LikeButton track_id={'4mBmsPcPa1Eu4LDTHq55Ab'}/>
    );
};

export default Demo;
