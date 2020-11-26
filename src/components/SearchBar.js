import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import "./SearchBar.css";

const SearchBar = ({ onSearch }) => {
  const [searchText, setSearchText] = useState("");
  const { t } = useTranslation();

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
          placeholder={t("searchMovie")}
        />
      </div>
    </div>
  );
};

export default SearchBar;
