import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import fetchBaseURL from "../axios";
import "./Success.css";

const Failure = () => {
  const [session, setSession] = useState({});
  const [order, setOrder] = useState({
    movieId: "",
    showtimeId: "",
    reservationId: "",
  });
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const sessionId = location.search.replace("?session_id=", "");

  const deleteCancelledReservation = async () => {
    try {
      await fetchBaseURL.delete(
        `movies/${order.movieId}/showtimes/${order.showtimeId}/reservations/${order.reservationId}`
      );
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
      if (sessionData.locale) {
        i18n.changeLanguage(sessionData.locale);
      }
    };
    fetchSession();
  }, [sessionId]);

  useEffect(() => {
    if (session.payment_status === "unpaid") {
      deleteCancelledReservation();
    }
  }, [order]);

  return (
    <div className="content-wrapper-success">
      <div className="reservation-message">
        <div className="centered">
          <h1>{t("paymentCancelled")}</h1>
          <p>
            {t("emailUsCancell")}
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
      </div>
    </div>
  );
};

export default Failure;
