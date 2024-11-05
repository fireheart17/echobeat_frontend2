import React, { useState } from 'react';
import './SearchBar.css';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [category, setCategory] = useState('songs'); // Default category
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setQuery(inputValue);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    if(category === 'songs') {
      try {
        await new Promise(resolve => setTimeout(resolve, 500));
  
        console.log('query:', query);
  
        const response = await fetch(`http://localhost:8081/api/tracks/search/${query}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setResults(data);
  
      } catch (err) {
        setError('No result Found!');
      }
    }
    setQuery(''); // Clear the input after search
    setResults([]); // Clear results after search
  };

  return (
    <div className="searchbar-bar-container">
      <form onSubmit={handleSubmit} className="searchbar-form">
        <select
          value={category}
          onChange={handleCategoryChange}
          className="searchbar-category-select"
        >
          <option value="songs">Songs</option>
          <option value="albums">Albums</option>
          <option value="artists">Artists</option>
        </select>
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Search..."
          className="searchbar-input"
        />
        <button type="submit" className="searchbar-button">
          Search
        </button>
      </form>

      {/* Display search results dropdown */}
      <p>{results.length}</p>
      {results.length > 0 && (
        <div className="searchbar-results">
          {results.map((result) => (
            <div key={result.track_id} className="searchbar-result-item">
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
