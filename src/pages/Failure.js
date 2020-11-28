import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import fetchBaseURL from "../axios";
import "./Success.css";

const Failure = () => {
  const [session, setSession] = useState({});
  const [order, setOrder] = useState({
    movieId: "",
    showtimeId: "",
    reservationId: "",
  });

  const location = useLocation();
  const sessionId = location.search.replace("?session_id=", "");

  const deleteCancelledReservation = async () => {
    try {
      const res = await fetchBaseURL.delete(
        `movies/${order.movieId}/showtimes/${order.showtimeId}/reservations/${order.reservationId}`
      );
      console.log(res);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e.message, "Reservation has been already removed");
    }
  };

  useEffect(() => {
    const fetchSession = async () => {
      const res = await fetchBaseURL.get(`checkout-session/${sessionId}`);
      const sessionData = await res.data;
      setSession(sessionData);

      setOrder({
        movieId: sessionData.metadata.movieId,
        showtimeId: sessionData.metadata.showtimeId,
        reservationId: sessionData.metadata.reservationId,
      });
    };
    fetchSession();
  }, [sessionId]);

  useEffect(() => {
    if (session.payment_status === "unpaid") {
      console.log(session.payment_status);
      deleteCancelledReservation();
    }
  }, [order]);

  return (
    <div className="sr-root">
      {console.log(session, "session")}
      <div className="sr-main">
        <div className="sr-payment-summary completed-view">
          <h1>
            Your payment was canceled. Please try to book tickets again or buy
            them in Moviestaden cinema house
          </h1>
          <p>
            If you have any questions, please email us
            <a
              className="linkEmail"
              href="https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=moviestaden@gmail.com"
              target="_blank"
              rel="noreferrer"
            >
              {" "}
              moviestaden@gmail.com
            </a>
          </p>
        </div>
        <div className="sr-section completed-view">
          <div className="sr-callout">
            <h4>View CheckoutSession response:</h4>
            <pre>{JSON.stringify(session, null, 2)}</pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Failure;
