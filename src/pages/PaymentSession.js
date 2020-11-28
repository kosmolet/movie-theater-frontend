/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { loadStripe } from "@stripe/stripe-js";
import fetchBaseURL from "../axios";
import { IMAGE_BASE_URL, POSTER_SIZE, ticketPrice } from "../config";
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
  const [disabled, setDisabled] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  // const [reservationId, setReservationId] = useState("3244");
  const { t, i18n } = useTranslation();

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
  useEffect(() => {
    if (name.length < 2 || email.length < 5) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [name, email]);

  const createReservation = async () => {
    const res = await fetchBaseURL.post(
      `movies/${chosenMovie._id}/showtimes/${chosenShowtime._id}/reservations`,
      {
        username: name,
        email,
        isPaymentSucceed: false,
        seats: chosenSeats,
        totalPrice: chosenSeats.length * ticketPrice,
        showtime: chosenShowtime._id,
      }
    );
    return res.data;
  };

  const handleClick = async () => {
    const locale = i18n.language === "be" ? "ru" : i18n.language;
    const postReservation = await createReservation();
    const reservationId = await postReservation.data._id;
    const stripe = await stripePromise;
    const movieId = chosenMovie._id;
    const showtimeId = chosenShowtime._id;

    const response = await fetchBaseURL.post(`/checkout-session`, {
      email,
      name: `${chosenMovie?.title}`,
      images: `${IMAGE_BASE_URL}w185${chosenMovie?.poster_path}`,
      quantity: `${chosenSeats.length}`,
      locale,
      reservationId,
      movieId,
      showtimeId,
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
  return (
    <div className="content-wrapper">
      <header
        className="banner"
        style={{
          backgroundImage: `url(
                    "https://image.tmdb.org/t/p/original/${chosenMovie?.backdrop_path}"
                )`,
          backgroundSize: "cover",
          opacity: "0.2",
          backgroundPosition: "center center",
        }}
      />
      <div className="banner-shadow"> </div>
      {console.log(state)}
      <div className="payment-info-wrapper">
        <div className="payment-info-img">
          <img
            className="poster-img1"
            src={`${IMAGE_BASE_URL}${POSTER_SIZE}${chosenMovie?.poster_path}`}
            alt={`${chosenMovie?.title}movie`}
          />
        </div>
        <div className="payment-info-inputs">
          <p>{chosenMovie?.title}</p>
          <p>{chosenShowtime?.hallName}</p>
          <p>{chosenShowtime?.startAt.slice(0, 10)}</p>
          <p>{chosenShowtime?.startAt.slice(11, 16)}</p>

          <p className="seats-info">
            {`${t("seatsSelected")} 
            ${chosenSeats.toString()}`}
          </p>
          <p className="price-info">
            {`${t("totalCost")} 
             ${chosenSeats.length * ticketPrice} kr`}
          </p>

          <form className="pay-form">
            <label className="pay-labels">
              {t("namePerson")}
              <input
                className="pay-inputs"
                name="name"
                type="text"
                placeholder="name"
                required
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            <label className="pay-labels">
              {t("email")}
              <input
                className="pay-inputs"
                name="email"
                type="email"
                placeholder="your.mail@example.com"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <button
              className="pay-button"
              id="checkout-button"
              type="button"
              role="link"
              onClick={handleClick}
              disabled={disabled}
            >
              {t("confirmOrder")}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PaymentSession;
