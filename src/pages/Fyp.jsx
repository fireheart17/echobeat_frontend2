// App.js
import React, { useEffect, useState } from "react";
import "./Fyp.css"; // Plain CSS file
import Navbar from "./../components/Navbar";
import HeroSection from "./../components/HeroSection";
// import Menu from './../components/Menu';
import MainCard from "./../components/MainCard";
import { Navigate, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
const App = () => {
  // Example state for demonstration
  const navigate = useNavigate();
  const [name,setName]=useState("")
  const [topPicks, setTopPicks] = useState([]);

  const [newTracks, setNewTracks] = useState([]);
  useEffect(() => {
    if (Cookies.get("token") == null) navigate("/login")
    const fetchData=async ()=>{
      const res=await fetch(`http://localhost:8081/api/users/profile`,{
        method:"GET",
        headers:{
          Authorization:`Bearer ${Cookies.get("token")}`
        }
      })
      if(res.status===200){
        const resJSON=await res.json()
        setName(resJSON['first_name'])
        
      }else{
        console.log("user not found");
        navigate("/login");
      }
    }
    fetchData()
  }, []);

  useEffect(() => {
    const fetchData=async ()=>{
      const res=await fetch(`http://localhost:8081/api/toppicks`,{
        method:"GET"
      })
      if(res.status===200){
        const resJSON=await res.json()
        setTopPicks(resJSON)
        console.log(resJSON);
        
      }else{
        console.log("top picks not found");
      }
    }
    fetchData()
  }, []);
  useEffect(() => {
    const fetchData=async ()=>{
      const res=await fetch(`http://localhost:8081/api/newtracks`,{
        method:"GET"
      })
      if(res.status===200){
        const resJSON=await res.json()
        setNewTracks(resJSON)
        console.log(resJSON);
        
      }else{
        console.log("top picks not found");
      }
    }
    fetchData()
  }, []);

  return (
    <div>
      <Navbar />
      <HeroSection name={name}/>
      <div className="wrapper">
        <MainCard title="Top Picks" items={topPicks} />
        <MainCard title="New Releases" items={newTracks} />
      </div>
    </div>
  );
};

export default App;


// player
// search bar implement (songs , playlist, podcast, artist)
// user profile changes
// for artist add upload functionality
// normalize tables
