import { useEffect } from "react";
import Cookies from 'js-cookie'
import { useNavigate } from "react-router-dom";
export default function CheckAuth(){
    const navigate=useNavigate()
    useEffect(() => {
        if (Cookies.get("token") == null) navigate("/home")
        const fetchData=async ()=>{
          const res=await fetch(`http://localhost:8081/api/users/profile`,{
            method:"GET",
            headers:{
              Authorization:`Bearer ${Cookies.get("token")}`
            }
          })
          if(res.status!==200){
            console.log("user not found");
            navigate("/home");
          }
        }
        fetchData()
      }, []);
      return <></>;
}