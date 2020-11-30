import React, { useState, useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { loadStripe } from "@stripe/stripe-js";
import fetchBaseURL from "../axios";
import { IMAGE_BASE_URL, POSTER_SIZE, ticketPrice } from "../config";
import AppContext from "../context/context";
import "./PaymentSession.css";

const { REACT_APP_STRIPE_SK_PUBLIC } = process.env;
const stripePromise = loadStripe(REACT_APP_STRIPE_SK_PUBLIC);

const PaymentSession = () => {
  const [disabled, setDisabled] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const { t, i18n } = useTranslation();

  const { state, chosenMovie, chosenShowtime, chosenSeats } = useContext(
    AppContext
  );

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
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      // eslint-disable-next-line no-console
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
        {chosenShowtime && chosenShowtime.startAt ? (
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
              <label className="pay-labels" htmlFor="name">
                {t("namePerson")}
                <input
                  id="name"
                  className="pay-inputs"
                  name="name"
                  type="text"
                  placeholder="name"
                  required
                  onChange={(e) => setName(e.target.value)}
                />
              </label>
              <label className="pay-labels" htmlFor="email">
                {t("email")}
                <input
                  id="email"
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
        ) : (
          <h1> Please select a movie and showtime </h1>
        )}
      </div>
    </div>
  );
};

export default PaymentSession;
