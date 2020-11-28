/* eslint-disable consistent-return */
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import emailjs from "emailjs-com";
import fetchBaseURL from "../axios";
import "./Success.css";

const Success = () => {
  const [session, setSession] = useState({});
  const [unpaid, setUnpaid] = useState(false);
  const [customerId, setCustomerId] = useState("");
  const [order, setOrder] = useState({
    movieId: "",
    showtimeId: "",
    reservationId: "",
  });
  const [customer, setCustomer] = useState({});
  const location = useLocation();
  const sessionId = location.search.replace("?session_id=", "");

  const patchReservation = async () => {
    try {
      const paymentDate = new Date(
        session.line_items.data[0].price.created * 1000
      );
      console.log(paymentDate);
      const res = await fetchBaseURL.patch(
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
      setCustomerId(sessionData.customer);
    };
    fetchSession();
  }, [sessionId]);

  useEffect(() => {
    const fetchSession = async () => {
      const res = await fetchBaseURL.get(
        `checkout-session/customers/${customerId}`
      );
      const customerData = await res.data;
      setCustomer(customerData);
    };
    fetchSession();
  }, [customerId]);

  useEffect(() => {
    if (session.payment_status === "paid") {
      patchReservation();
      setUnpaid(false);
    } else {
      setUnpaid(true);
    }
  }, [order]);
  /*
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
*/

  return unpaid ? (
    <div className="sr-root">this reservation is unpaid</div>
  ) : (
    <div className="sr-root">
      {console.log(session, "session")}
      <div className="sr-main">
        <div className="sr-payment-summary completed-view">
          <h1>
            {`Thanks for your order! Your reservation ID is ${order.reservationId}`}
          </h1>
          <p>
            Email with order details will be send to you soon! If you have any
            questions, please email us
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
            <h4>View Customer response:</h4>
            <pre>{JSON.stringify(customer, null, 2)}</pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Success;
