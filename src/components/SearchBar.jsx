import React, { useState } from 'react';
const Search = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('songs'); // Default category

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query) {
      onSearch(query, category); // Pass both query and category to the parent component
      setQuery(''); // Clear the input after search
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', justifyContent: 'center'}}>
      <select
        value={category}
        onChange={handleCategoryChange}
        style={{ backgroundColor : 'var(--color-100)', borderRadius: '2px', height: '30px', border: '1px solid #ccc', marginRight: '10px' }}
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
        style={{ padding: '10px', width: '250px', height: '30px', borderRadius: '4px', border: '1px solid #ccc' }}
      />
      <button type="submit" style={{backgroundColor : 'var(--color-100)', paddingRight: '10px', paddingLeft: '10px', marginLeft: '10px', height: '30px', borderRadius: '4px', cursor: 'pointer' }}>
        Search
      </button>
    </form>
  );
};

const SearchBar = () => {
    const handleSearch = (query, category) => {
      console.log(`Searching for ${query} in category: ${category}`);
      // You can add your search logic here based on query and category
    };
  
    return (
      <div>
        <Search onSearch={handleSearch} />
        {/* Additional content can go here */}
      </div>
    );
  };
  
export default SearchBar;
