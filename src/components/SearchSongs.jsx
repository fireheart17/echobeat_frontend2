import React, { useState } from 'react';
import './SearchSong.css';

const Search = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    handleSubmit(e);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query) {
      onSearch(query);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search..."
        className="search-input"
      />
    </form>
  );
};

const SearchBar = (props) => {
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);

  const handleClick = async (track_id) => {
    const data = { playlist_id: props.playlist_id, track_id: track_id };
    console.log("playlist : " + props.playlist_id);
    console.log("track : " + track_id);

    try {
      const res = await fetch('http://localhost:8081/api/playlistsTracks/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = res;
      setResponse(result);
      await props.fetchData();
      console.log(result);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSearch = async (query) => {
    setIsLoading(true);
    setError(null);

    try {
      await new Promise(resolve => setTimeout(resolve, 500));

      console.log('query:', query);

      const response = await fetch(`http://localhost:8081/api/tracks/search/${query}`);
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setSearchResults(data);

    } catch (err) {
      setError('No result Found!');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="search-bar-container">
      <Search onSearch={handleSearch} />
      
      {isLoading && <div className="loading-text">Loading...</div>}

      {error && <div className="error-text">{error}</div>}

      {!isLoading && !error && searchResults.length > 0 && (
        <div className="search-results">
          <div style={{ display: 'grid', gap: '10px' }}>
            {searchResults.map((result) => (
              <div 
                key={result.track_name}
                className="result-item"
                onClick={() => handleClick(result.track_id)}
              >
                {result.track_id && (
                  <div 
                    className="result-item-title" 
                  >
                    {result.track_name}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
