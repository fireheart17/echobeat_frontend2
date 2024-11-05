import React, { useState } from 'react';

const Search = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    if (query) {
      onSearch(query);
      // Don't clear the query so users can see what they searched for
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', justifyContent: 'center'}}>
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search..."
        style={{ padding: '10px', width: '250px', height: '30px', borderRadius: '4px', border: '1px solid #ccc' }}
      />
      <button 
        type="submit" 
        style={{backgroundColor: 'var(--color-100)', paddingRight: '10px', paddingLeft: '10px', marginLeft: '10px', height: '30px', borderRadius: '4px', cursor: 'pointer' }}
      >
        Search
      </button>
    </form>
  );
};

const SearchBar = () => {
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);


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
      <div style={{ maxWidth: '400px', margin: '0 auto' }}>
        <Search onSearch={handleSearch} />
        
        {/* Loading State */}
        {isLoading && (
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            Loading...
          </div>
        )}

        {/* Error State */}
        {error && (
          <div style={{ color: 'red', textAlign: 'center', marginTop: '20px' }}>
            {error}
          </div>
        )}

        {/* Results */}
        {!isLoading && !error && searchResults.length > 0 && (
          <div style={{ marginTop: '20px', padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
            {/* <h3>Search Results:</h3> */}
            <div style={{ display: 'grid', gap: '10px' }}>
              {searchResults.map((result) => (
                <div 
                  key={result.track_name}
                  style={{
                    padding: '10px',
                    backgroundColor:'var(--color-100)',
                    borderRadius: '4px',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                    fontSize: '14px',
                  }}
                >
                  {/* Display different information based on the type of result */}
                  {result.track_id && (
                    <>
                      <a style={{ fontWeight: 'bold', textDecoration:'none', color:'var(--color-200)'}} href='/'>{result.track_name}</a>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* No Results State */}
        {!isLoading && !error && Object.keys(searchResults).length === 0 && (
          <div style={{ textAlign: 'center', marginTop: '20px', color: '#666' }}>
            No results found.
          </div>
        )}
      </div>
    );
};
  
export default SearchBar;