import React, { useState, useEffect } from "react";
import "./SearchBar.css";

const SearchBar = ({ onSearch }) => {
  const [searchText, setSearchText] = useState("");

  const handleInput = (e) => {
    const text = e.target.value;
    setSearchText(text);
  };
  useEffect(() => {
    onSearch(searchText);
  }, [searchText]);

  return (
    <div className="search-bar">
      <div className="search-content">
        <input
          className="search-input"
          onChange={(e) => handleInput(e)}
          type="text"
          value={searchText}
          placeholder="Search movies"
        />
      </div>
    </div>
  );
};

export default SearchBar;
