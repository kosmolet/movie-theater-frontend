import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import fetchBaseURL from "../axios";
import "./Success.css";

const Success = () => {
  const [session, setSession] = useState({});
  const [customerId, setCustomerId] = useState("");
  const [customer, setCustomer] = useState({});
  const location = useLocation();
  const sessionId = location.search.replace("?session_id=", "");

  useEffect(() => {
    const fetchSession = async () => {
      const res = await fetchBaseURL.get(`checkout-session/${sessionId}`);
      const sessionData = await res.data;
      setSession(sessionData);
      console.log(sessionData, "sessionData");

      setCustomerId(sessionData.customer);
      console.log(customerId, "customerID");
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

      console.log(customer, "customer");
    };
    fetchSession();
  }, [customerId]);

  return (
    <div className="sr-root">
      <div className="sr-main">
        <div className="sr-payment-summary completed-view">
          <h1>Thanks for your order!</h1>
          <p>
            Email with order details will be send to you! If you have any
            questions, please email
            <a href="moviestaden@gmail.com">moviestaden@gmail.com</a>
          </p>
        </div>
        <div className="sr-section completed-view">
          <div className="sr-callout">
            <h4>View CheckoutSession response:</h4>
            <pre>{JSON.stringify(session, null, 2)}</pre>
            <h4>View Customer response:</h4>
            <pre>{JSON.stringify(customer, null, 2)}</pre>
          </div>
          <Link to="/">Home</Link>
        </div>
      </div>
    </div>
  );
};

export default Success;
