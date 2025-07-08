import React from 'react';

const SearchBar = ({ onSearch, search }) => {
  
  return (
    <input 
      type="search"
      placeholder="Search by name or email..."
      value={search}
      onChange={(e) => onSearch(e.target.value)}
      style={{ padding: '8px', margin: '10px 0', width: '25vw' ,border:" 2px solid #d1d5db"}}
    />

    
    
   
  );
  
  
};

export default SearchBar;
