// HomePage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import LikeButton from '../components/likeButton';
import Cookies from "js-cookie";

const Demo = () => {
    const navigate = useNavigate();
    if (Cookies.get("token") == null) navigate("/login")
    
    const token = Cookies.get("token");
    console.log(token);
    return (
        <LikeButton token = {token} track_id={"1"} />
    );
};

export default Demo;
