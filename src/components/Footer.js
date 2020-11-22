import React from "react";
import "./Footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <div className="footer">
      <section className="ft-main">
        <div className="ft-main-column">
          <h2 className="ft-title">Guests</h2>
          <ul>
            <li>
              <a href="https://github.com/">Customer service</a>
            </li>
            <li>
              <a href="https://github.com/">Questions and answers</a>
            </li>
            <li>
              <a href="https://github.com/">Pricing</a>
            </li>
            <li>
              <a href="https://github.com/">Book larger groups</a>
            </li>
            <li>
              <a href="https://github.com/">Leave feedback</a>
            </li>
          </ul>
        </div>
        <div className="ft-main-column">
          <h2 className="ft-title">Members</h2>
          <ul>
            <li>
              <a href="https://github.com/">Sign in</a>
            </li>
            <li>
              <a href="https://github.com/">Sign up</a>
            </li>
            <li>
              <a href="https://github.com/">About the membership</a>
            </li>
            <li>
              <a href="https://github.com/">Member news</a>
            </li>
          </ul>
        </div>
        <div className="ft-main-column">
          <h2 className="ft-title">About Moviestaden</h2>
          <ul>
            <li>
              <a href="https://github.com/">Press</a>
            </li>
            <li>
              <a href="https://github.com/">Job</a>
            </li>
            <li>
              <a href="https://github.com/">Social Media</a>
            </li>
          </ul>
        </div>
      </section>

      <div className="social-links">
        &copy; 2020 Moviestaden
        <a
          href="https://github.com/kosmolet"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faGithub} />
        </a>
      </div>
    </div>
  );
};

export default Footer;
