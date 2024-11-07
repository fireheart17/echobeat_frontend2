import React, { useState, useEffect } from 'react';
import './SearchBar.css';
import Cookies from "js-cookie";

const SearchBar = (props) => {
  const [user, setUser] = useState([]);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setQuery(inputValue);
  };

    const token = Cookies.get("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:8081/api/users/validate", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          // Handle non-200 status codes (optional)
          throw new Error("Failed to fetch user data");
        }

        const data = await res.json(); // The response body will be a simple integer (user_id)
        if (Number.isInteger(data)) {
          setUser(data); // Set the `id` state with the integer value returned
        } else {
          console.error("Expected an integer user_id but received:", data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  
  const handleSubmit = async(e) => {
    e.preventDefault();
      try {
        await new Promise(resolve => setTimeout(resolve, 500));
  
        const data = {title : query, duration : 0, user_id : user}
        try {
            const res = await fetch("http://localhost:8081/api/playlists/add/", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(data),
            });
          } catch (error) {
            console.error("Error in Putting the liked song");
        }
        console.log(data);
        props.fetchData();
      } catch (err) {
        setError('No result Found!');
      }
  };

  return (
    <div className="searchbar-bar-container">
      <form onSubmit={handleSubmit} className="searchbar-form">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Search..."
          className="searchbar-input"
        />
        <button type="submit" className="searchbar-button">
          Add
        </button>
      </form>

      {/* Display search results dropdown */}
      {results.length > 0 && (
        <div className="searchbar-results">
          {results}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
