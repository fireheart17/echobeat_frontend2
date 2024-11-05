import React, { useState, useEffect } from "react";

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
          left: "2.5vw",
          top: "20px",
          backgroundColor: "rgb(175, 154, 122)",
          color: "white",
          padding: "0.5rem",
          transition: "all 2s",
          borderRadius: isExpanded ? "10px" : "50%",
          width: isExpanded ? "95%" : "3rem",
          height: "48px",
          display: "flex",
          alignItems: "center",
          justifyContent: isExpanded ? "space-between" : "center",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            fontWeight: "bold",
            fontSize: "1.25rem",
            marginLeft: isExpanded ? "1rem" : "0",
          }}
        >
          Echobeat
        </div>
        {isExpanded && (
          <div style={{ display: "flex", gap: "1rem", marginRight: "1rem" }}>
            <a href="/" style={{ textDecoration: "none", color: "white" }}>
              Home
            </a>
            <a href="/" style={{ textDecoration: "none", color: "white" }}>
              About
            </a>
            <a href="/" style={{ textDecoration: "none", color: "white" }}>
              Contact
            </a>
          </div>
        )}
      </nav>
      <div className="spacer" style={{height:'30px'}}></div>
    </>
  );
};

export default Navbar;
