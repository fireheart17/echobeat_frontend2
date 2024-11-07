import React, { useState } from "react";
import "./login_styles.css";
import Cookies from "js-cookie"; // Importing js-cookie
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    first_name: "",
    last_name: "",
    dob: "",
    gender: "",
  });
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    try {
      const response = await fetch("http://localhost:8081/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData), // Convert form data to JSON
      });
      if (response.ok) {
        alert("User Created Successfully");
        navigate("/login");
        // const data = await response.json();

        // // Set a cookie upon successful signup (e.g., setting a token)
        // Cookies.set('token', data.token, { expires: 7 }); // Example: token expiry of 7 days
        // alert('Signup successful: ' + data.message); // Customize as needed

        // Optionally, redirect the user to another page
        // navigate('/some-route'); // Use the navigate function from react-router-dom if needed
      } else {
        const errorMessage = await response.text();
        console.error("SignUp failed:", errorMessage);
        document.getElementById("usernameAlreadyExists").style.display =
          "block";
      }
    } catch (error) {
      console.error("Error during signup:", error);
      alert("Error during signup");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <h3 className="login-title">Sign Up</h3>

        {/* Signup Form */}
        <form onSubmit={handleSubmit}>
          {/* Username Input */}
          <div className="input-group">
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

          {/* First Name Input */}
          <div className="input-group">
            <input
              className="custom-input"
              type="text"
              id="first-name"
              name="first_name"
              placeholder="firstname"
              value={formData.first_name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Last Name Input */}
          <div className="input-group">
            <input
              className="custom-input"
              type="text"
              id="last-name"
              name="last_name"
              placeholder="lastname"
              value={formData.last_name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Date of Birth Input */}
          <div className="input-group">
          <label htmlFor="dob" className="custom-label">Date of Birth</label>
            <input
              className="custom-input"
              type="date"
              id="dob"
              name="dob"
              placeholder="lastname"
              value={formData.dob}
              onChange={handleChange}
              required
            />
          </div>

          {/* Gender Selection */}
          <div className="input-group">
            <select
              id="gender"
              name="gender"
              className="custom-input"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="" disabled hidden>
                Gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Signup Button */}
          <div className="input-group">
            <button className="login-button" type="submit">
              Sign up
            </button>
          </div>
        </form>
        <div
          className="error-message"
          id="usernameAlreadyExists"
          style={{ display: "none" }}
        >
          Username Already Exists
        </div>
        <a className="signup-link" href="/login">
          Already a user? login here
        </a>
        {/* Background Elements */}
        {/* <div className="background-container">
        <div className="inner-container">
          <div className="circle-left"></div>
          <div className="circle-right"></div>
        </div>
      </div> */}
      </div>
    </div>
  );
};

export default Signup;
