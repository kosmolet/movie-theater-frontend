/* eslint-disable react/self-closing-comp */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable dot-notation */
/* eslint-disable object-shorthand */
/* eslint-disable react/button-has-type */
/* eslint-disable no-lonely-if */
import React, { useState, useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import emailjs from "emailjs-com";
import CardSection from "./CardSection";
import fetchBaseURL from "../axios";
import AppContext from "../context/context";
import "./CheckoutForm.css";
import { IMAGE_BASE_URL } from "../config";

const {
  REACT_APP_EMAILJS_USERID,
  REACT_APP_TEMPLATE_ID,
  REACT_APP_SERVICE_ID,
} = process.env;

export default function CheckoutForm() {
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [name, setName] = useState("noname");
  const [email, setEmail] = useState("no@email.com");
  const { t } = useTranslation();
  const {
    state,
    chosenMovie,
    chosenShowtime,
    chosenSeats,
    clearSelectedSeats,
    addReservation,
  } = useContext(AppContext);

  const stripe = useStripe();
  const elements = useElements();
  const templateParams = {
    to_email: email,
    to_name: name,
    movie: chosenMovie.title,
    date: chosenShowtime.startAt.slice(0, 10),
    time: chosenShowtime.startAt.slice(11, 16),
    seats: chosenSeats.toString(),
    hall: chosenShowtime.hallName,
  };
  const sendEmail = () => {
    emailjs
      .send(
        REACT_APP_SERVICE_ID,
        REACT_APP_TEMPLATE_ID,
        templateParams,
        REACT_APP_EMAILJS_USERID
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (err) => {
          console.log(err.text);
        }
      );
  };

  const createReservation = async (movieId, showtimeId) => {
    const res = await fetchBaseURL.post(
      `movies/${movieId}/showtimes/${showtimeId}/reservations`,
      {
        username: name,
        email: email,
        isPaymentSucceed: true,
        seats: chosenSeats,
        totalPrice: chosenSeats.length * 20,
        showtime: showtimeId,
      }
    );
    return res.data;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    const res = await fetchBaseURL.post("/create-payment-intent", {
      email: email,
      name: name,
      items: chosenSeats.length,
    });

    const clientSecret = await res.data["client_secret"];

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          email: email,
          name: name,
        },
      },
    });

    if (result.error) {
      setError(` ${result.error.message}`);
      setProcessing(false);
      setSucceeded(false);
    } else {
      if (result.paymentIntent.status === "succeeded") {
        console.log(result);
        console.log("state PaymentSuccess", state);
        setError(null);
        setDisabled(true);
        setProcessing(false);
        setSucceeded(true);
        createReservation(chosenMovie._id, chosenShowtime._id);
        sendEmail();
      }
    }
  };

  useEffect(() => {
    if (name.length < 2 || email.length < 5) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
    console.log(disabled);
  }, [name, email]);

  useEffect(() => {
    setDisabled(true);
  }, []);

  return (
    <div className="content-wrapper">
      <header
        className="banner"
        style={{
          backgroundImage: `url(
                    "https://image.tmdb.org/t/p/original/${chosenMovie?.backdrop_path}"
                )`,
          backgroundSize: "cover",
          opacity: "0.3",
          backgroundPosition: "center center",
        }}
      />
      <div className="banner-shadow"> </div>
      <div className="poster-img-wrapper">
        <img
          className="poster-img"
          src={`${IMAGE_BASE_URL}w185${chosenMovie?.poster_path}`}
          alt={`${chosenMovie?.title} poster`}
        />
        <div className="img-info-wrapper">
          <h3>{chosenMovie.title}</h3>

          <span className="seats-info">
            {`${t("seatsSelected")} 
          ${chosenSeats.toString()}`}
          </span>
          <br />
          <span className="price-info">
            {`${t("totalCost")} 
          ${chosenSeats.length * 20} SEK`}
          </span>
        </div>
      </div>
      <div className="checkout-wrapper">
        {console.log("StoreCheckoutBefore", state)}
        <form onSubmit={handleSubmit} className="pay-form">
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
          <label className="pay-labels-email">{t("cardPerson")}</label>
          <CardSection />
          <p
            className={
              error ? "result-message-error" : "result-message-error hidden"
            }
          >
            {error}
            {t("errorPayment")}
          </p>
          <button className="payment-button" disabled={disabled}>
            {t("confirmOrder")}
          </button>
          <p className={succeeded ? "result-message" : "result-message hidden"}>
            {t("donePayment")}
          </p>
        </form>
      </div>
    </div>
  );
}
