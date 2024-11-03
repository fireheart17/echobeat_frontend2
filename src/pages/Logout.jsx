import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const navigate = useNavigate();
  useEffect(() => {
    Cookies.remove("token");
    navigate("/login");
  }, []);
  return <>logging out...</>;
}
