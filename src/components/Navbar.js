import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { useTranslation } from "react-i18next";

function Navbar() {
  const [show, handleShow] = useState(false);
  const { i18n } = useTranslation();

  const handleClick = (lang) => {
    i18n.changeLanguage(lang);
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

  return (
    <div className={`nav ${show && "nav-black"}`}>
      <Link to="/">
        <span className="logo"> Moviestaden </span>
      </Link>

      <div className="switch-lang-div">
        <button
          className="switch-lang-buttons"
          type="button"
          onClick={() => handleClick("en")}
        >
          EN
        </button>
        <button
          className="switch-lang-buttons"
          type="button"
          onClick={() => handleClick("sv")}
        >
          SV
        </button>
        <button
          className="switch-lang-buttons"
          type="button"
          onClick={() => handleClick("ru")}
        >
          RU
        </button>
        <button
          className="switch-lang-buttons"
          type="button"
          onClick={() => handleClick("be")}
        >
          BY
        </button>
      </div>
    </div>
  );
}

export default Navbar;
