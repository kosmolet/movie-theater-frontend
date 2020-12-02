import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => (
  <div className="content-wrapper-not-found" data-testid="notfound-page">
    <div className="message-not-found">
      Page does not exist
      <Link to="/" className="button-404">
        Go back to the home page
      </Link>
    </div>
  </div>
);

export default NotFound;
