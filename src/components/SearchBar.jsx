import { useRef } from 'react';

function SearchBar({ onSearch, searchTerm }) {
  const ref = useRef();

  return (
    <div className="search-container">
      <input
        ref={ref}
        value={searchTerm}
        onChange={(e)=>onSearch(e.target.value)}
        placeholder="Search country..."
      />
      {searchTerm && (
        <button onClick={() => onSearch('')}>✕</button>
      )}
    </div>
  );
}

export default SearchBar;