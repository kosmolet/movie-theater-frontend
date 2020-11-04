/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useEffect, useContext } from "react";
import "./Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { MovieContext } from "../store/MovieContext";
import MovieCard from "./MovieCard";

function Navbar() {
  const [show, handleShow] = useState(false);
  const [searchBox, setSearchBox] = useState(false);
  const [loading, movies] = useContext(MovieContext);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const dynamicSearch = () => {
    return movies.filter((movie) =>
      movie.original_title.toLowerCase().includes(query.toLowerCase())
    );
  };

  const onChange = (e) => {
    e.preventDefault();
    setQuery(e.target.value);
    setResults(dynamicSearch());
    console.log("searchResults:", results);
  };

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        handleShow(true);
      } else handleShow(false);
    });

    return () => {
      window.removeEventListener("scroll", handleShow);
    };
  }, []);

  const toggleSearchBox = () => {
    setSearchBox(true);
  };

  return (
    <div className={`nav ${show && "nav-black"}`}>
      <span className="logo"> Moviestad </span>
      <div className="header-options">
        <div className={`${searchBox ? "searchBox" : "searchIcon"}`}>
          <span
            className="icon"
            onClick={toggleSearchBox}
            onKeyDown={toggleSearchBox}
          >
            <FontAwesomeIcon icon={faSearch} />
          </span>
          <div className="input-wrapper">
            <input
              className="searchInput"
              onBlur={() => setSearchBox(false)}
              onChange={onChange}
              value={query}
              type="search"
              placeholder="Type movie title..."
              maxLength="100"
            />
          </div>
        </div>
        {results.length > 0 && (
          <ul className="results">
            {results.map((movie) => (
              <li key={movie.id}>
                <MovieCard movie={movie} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Navbar;
