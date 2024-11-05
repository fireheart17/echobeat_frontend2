import React, { useState } from "react";
import Cookies from "js-cookie"; // Import js-cookie
import "./login_styles.css";
import { useNavigate } from "react-router-dom";
// import './colors.css';

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8081/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        console.log(response);
        const token = await response.text();
        Cookies.set("token", token); // Store the token in cookies
        navigate("/");
      } else {
        const errorMessage = await response.text();
        console.error("Login failed:", errorMessage);
        document.getElementById("userDoesNotExistWarning").style.display =
          "block";
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("Error during login");
    }
  };

  return (
    <>
      <div className="login-wrapper">
        <div className="login-container">
          <h3 className="login-title">Login</h3>
          <form onSubmit={handleSubmit}>
            {/* Username Input */}
            <div className="input-group">
              <label htmlFor="username" style={{ color: "black" }}>
                Username
              </label>
              <input
                className="custom-input"
                type="text"
                id="username"
                name="username"
                placeholder="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>

            {/* Password Input */}
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                className="custom-input"
                type="password"
                id="password"
                name="password"
                placeholder="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            {/* Login Button */}
            <button className="login-button" type="submit">
              Log In
            </button>
          </form>

          {/* Invalid Credentials Message (Hidden by default) */}
          <div
            className="error-message"
            id="userDoesNotExistWarning"
            style={{ display: "none" }}
          >
            Invalid credentials
          </div>

          <a className="signup-link" href="/signup">
            Create an account
          </a>
        </div>
      </div>
    </>
  );
}

export default Login;
