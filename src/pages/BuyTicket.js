import React from "react";
import { Link } from "react-router-dom";
import "./BuyTicket.css";

const BuyTicket = () => {
  const movie = { id: 724989 };
  return (
    <div>
      hej
      <Link to={`/movie/${movie.id}/booking/${movie.id}/payment`}>
        <button type="button"> pay </button>
      </Link>
    </div>
  );
};

export default BuyTicket;
