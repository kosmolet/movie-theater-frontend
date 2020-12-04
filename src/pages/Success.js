import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import emailjs from "emailjs-com";
import fetchBaseURL from "../axios";
import "./Success.css";
import Ticket from "../components/Ticket";

const {
  REACT_APP_EMAILJS_USERID,
  REACT_APP_TEMPLATE_ID,
  REACT_APP_SERVICE_ID,
} = process.env;

const Success = () => {
  const [session, setSession] = useState({});
  const [unpaid, setUnpaid] = useState(false);
  const { t, i18n } = useTranslation();
  const [order, setOrder] = useState({
    movieId: "",
    showtimeId: "",
    reservationId: "",
  });

  const location = useLocation();
  const sessionId = location.search.replace("?session_id=", "");
  const [orderDetails, setOrderDetails] = useState({
    to_email: "",
    to_name: "",
    movie: "",
    date: "",
    time: "",
    seats: "",
    hall: "",
  });

  const getReservationInfoAndSendMAil = async () => {
    try {
      const res = await fetchBaseURL.get(
        `movies/${order.movieId}/showtimes/${order.showtimeId}/reservations/${order.reservationId}`
      );
      const reservation = await res.data[0];
      const shtime = await fetchBaseURL.get(
        `movies/${order.movieId}/showtimes/${order.showtimeId}/reservations`
      );
      const showtime = await shtime.data[0];
      const movieRes = await fetchBaseURL.get(`movies/${order.movieId}`);
      const movie = await movieRes.data;

      const templateParams = {
        to_email: reservation.email,
        to_name: reservation.username,
        movie: movie.title,
        date: showtime.startAt.slice(0, 10),
        time: showtime.startAt.slice(11, 16),
        seats: reservation.seats.toString(),
        hall: showtime.hallName,
      };
      setOrderDetails(templateParams);
      if (reservation.isEmailSend === false) {
        const resEmail = await emailjs.send(
          REACT_APP_SERVICE_ID,
          REACT_APP_TEMPLATE_ID,
          templateParams,
          REACT_APP_EMAILJS_USERID
        );
        if (resEmail.status === 200) {
          await fetchBaseURL.patch(
            `movies/${order.movieId}/showtimes/${order.showtimeId}/reservations/${order.reservationId}`,
            {
              isEmailSend: true,
            }
          );
        }
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e.message, "error on attempt to get reservation");
    }
  };

  const patchReservation = async () => {
    try {
      const paymentDate = new Date(
        session.line_items.data[0].price.created * 1000
      );
      await fetchBaseURL.patch(
        `movies/${order.movieId}/showtimes/${order.showtimeId}/reservations/${order.reservationId}`,
        {
          isPaymentSucceed: true,
          stripeCustomerId: session.customer,
          stripeCheckoutSessionId: session.id,
          stripeAmountCharged: session.amount_total,
          stripePaymentIntentId: session.payment_intent,
          stripePaymentCreateAt: paymentDate,
        }
      );
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e.message, "Reservation has not been updated");
    }
  };

  useEffect(() => {
    const fetchSession = async () => {
      const res = await fetchBaseURL.get(`checkout-session/${sessionId}`);
      const sessionData = await res.data;
      setSession(sessionData);

      if (
        sessionData.metadata.movieId &&
        sessionData.metadata.showtimeId &&
        sessionData.metadata.reservationId
      ) {
        setOrder({
          movieId: sessionData.metadata.movieId,
          showtimeId: sessionData.metadata.showtimeId,
          reservationId: sessionData.metadata.reservationId,
        });
      }
      if (sessionData.locale) {
        i18n.changeLanguage(sessionData.locale);
      }
    };
    fetchSession();
  }, [sessionId]);

  useEffect(() => {
    const processOrder = async () => {
      if (session.payment_status === "paid") {
        patchReservation();
        setUnpaid(false);
        getReservationInfoAndSendMAil();
      } else {
        setUnpaid(true);
      }
    };
    processOrder();
  }, [order]);

  return unpaid ? (
    <div data-testid="success-page" className="sr-root">
      {t("unpaidReservation")}
    </div>
  ) : (
    <div className="content-wrapper-success" data-testid="success-page">
      <div className="reservation-message">
        <div className="centered">
          <h1>{` ${t("thanksForOrder")} ${order.reservationId}`}</h1>
          <p>
            {t("emailUs")}
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
      <div className="ticket-section-success">
        <Ticket orderDetails={orderDetails} />
      </div>
    </div>
  );
};

export default Success;
