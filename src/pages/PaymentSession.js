import React, { useState, useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { loadStripe } from "@stripe/stripe-js";
import fetchBaseURL from "../axios";
import { IMAGE_BASE_URL, ticketPrice } from "../config";
import AppContext from "../context/context";
import "./PaymentSession.css";

const { REACT_APP_STRIPE_SK_PUBLIC } = process.env;
const stripePromise = loadStripe(REACT_APP_STRIPE_SK_PUBLIC);

const Message = ({ message }) => (
  <section>
    <p>{message}</p>
  </section>
);
const PaymentSession = () => {
  const [message, setMessage] = useState("");
  const { t } = useTranslation();
  const {
    state,
    chosenMovie,
    chosenShowtime,
    chosenSeats,
    clearSelectedSeats,
    addReservation,
  } = useContext(AppContext);

  // useEffect(() => {
  //   // Check to see if this is a redirect back from Checkout
  //   const query = new URLSearchParams(window.location.search);
  //   if (query.get("success")) {
  //     console.log("successed");
  //     setMessage("Order placed! You will receive an email confirmation.");
  //   }
  //   if (query.get("canceled")) {
  //     console.log("cancelled");
  //     setMessage(
  //       "Order canceled -- continue to shop around and checkout when you're ready."
  //     );
  //   }
  // }, []);

  const handleClick = async (event) => {
    const stripe = await stripePromise;

    const response = await fetchBaseURL.post(`/checkout-session`, {
      name: `${chosenMovie?.title}`,
      images: `${IMAGE_BASE_URL}w185${chosenMovie?.poster_path}`,
      quantity: `${chosenSeats.length}`,
    });

    const session = await response.data;
    console.log(session, "response session");
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      console.log(result.error);
    }
  };
  return message ? (
    <Message message={message} />
  ) : (
    <section>
      {console.log(state)}
      <div className="product">
        <img
          src={`${IMAGE_BASE_URL}w185${chosenMovie?.poster_path}`}
          alt={`${chosenMovie?.title}movie`}
        />
        <div className="description">
          <h3>{`${chosenMovie?.title}`}</h3>
          <h5>{`${chosenSeats.length * ticketPrice} kr`}</h5>
        </div>
      </div>
      <button
        id="checkout-button"
        type="button"
        role="link"
        onClick={handleClick}
      >
        Checkout
      </button>
    </section>
  );
};

export default PaymentSession;
