import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AppContext from "../context/context";
import "./BuyTicket.css";

const BuyTicket = ({ info }) => {
  const [message, setMessage] = useState("");
  const {
    state,
    chosenMovie,
    chosenShowtime,
    chosenSeats,
    clearSelectedSeats,
    addReservation,
  } = useContext(AppContext);

  useEffect(() => {
    console.log("Stor PAyment FINISH details", state);
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);

    if (query.get("success")) {
      setMessage("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      setMessage(
        "Order canceled -- continue to shop around and checkout when you're ready."
      );
    }
  }, []);
  return (
    <section>
      {console.log(info, "info")}
      <p>{message}</p>
    </section>
  );
};

export default BuyTicket;
