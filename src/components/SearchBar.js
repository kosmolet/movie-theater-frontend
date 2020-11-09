import React, { useState } from "react";

import {
  StyledSearchBar,
  StyledSearchBarContent,
} from "./styles/StyledSearchBar";

const SearchBar = ({ onSearch }) => {
  const [searchText, setSearchText] = useState("");

  const handleInput = (e) => {
    const text = e.target.value;
    setSearchText(text);
  };

  const handleEnterKeyPressed = (e) => {
    if (e.key === "Enter") {
      onSearch(searchText);
    }
  };

  return (
    <StyledSearchBar>
      <StyledSearchBarContent>
        <input
          className="input"
          onChange={handleInput}
          onKeyPress={handleEnterKeyPressed}
          type="text"
          value={searchText}
          placeholder="Search your movies"
        />
      </StyledSearchBarContent>
    </StyledSearchBar>
  );
};

export default SearchBar;
