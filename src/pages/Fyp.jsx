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
  const [topPicks, setTopPicks] = useState([
    { id: 1, track_name: "Song A" },
    { id: 2, track_name: "Song B" },
  ]);

  const [newTracks, setNewTracks] = useState([
    { id: 3, track_name: "New Release A" },
    { id: 4, track_name: "New Release B" },
  ]);
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
