/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

function Navbar() {
  const [show, handleShow] = useState(false);
  const [searchBox, setSearchBox] = useState(false);

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
          <input
            className="searchInput"
            onBlur={() => setSearchBox(false)}
            type="search"
            placeholder="Type movie title..."
            maxLength="100"
          />
        </div>
      </div>
      {/* <div className="searchBox">
        <input
          className="searchInput"
          type="text"
          name=""
          placeholder="Search"
        />
        <button type="button" className="searchButton" href="#">
          <i className="material-icons">search</i>
        </button>
      </div> */}
    </div>
  );
}

export default Navbar;
