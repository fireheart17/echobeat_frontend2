import React, { useState, useEffect } from "react";
import QuickLinks from "./QuickLinks";
import SearchBar from "./SearchBar";

const Navbar = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    // Expand the navbar on page load
    setIsExpanded(true);
  }, []);

  return (
    <>
      <nav
        style={{
          position: "fixed",
          left: isExpanded? "2.5vw":"50%",
          top: "20px",
          backgroundColor: "rgb(175, 154, 122)",
          color: "white",
          padding: "0.5rem",
          // transition: "all 1s",
          borderRadius: isExpanded ? "10px" : "50%",
          width: isExpanded ? "95%" : "3rem",
          height: "48px",
          display: "flex",
          alignItems: "center",
          justifyContent: isExpanded ? "space-between" : "center",
          // overflow: "hidden",
        }}
      >
        <a
          style={{
            fontWeight: "bold",
            fontSize: "1.25rem",
            marginLeft: isExpanded ? "1rem" : "0",
            textDecoration:'none',
            color:"white",
            display:"block"
          }}
          href="/"
        >
          Echobeat
        </a>
        {isExpanded && (
  
          <div style={{ display: "flex", gap: "1rem", marginRight: "1rem",alignItems:'center' }}>
            <SearchBar />
            <QuickLinks />
            <a href="/" style={{ textDecoration: "none", color: "white" }}>
              Home
            </a>
            <a href="/charts" style={{ textDecoration: "none", color: "white" }}>
              Charts
            </a>
            <a href="/user" style={{ textDecoration: "none", color: "white" }}>
              User
            </a>
            <a href="/logout" style={{ textDecoration: "none", color: "white" }}>
              logout
            </a>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
