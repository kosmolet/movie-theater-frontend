// /* eslint-disable react/button-has-type */
// import React, { useContext, useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import "./Payment.css";
// import { loadStripe } from "@stripe/stripe-js";
// import { Elements } from "@stripe/react-stripe-js";
// import AppContext from "../context/context";
// import fetchBaseURL from "../axios";
// import BuyTicket from "./BuyTicket";

// const serviceID = process.env.REACT_APP_SERVICE_ID;
// const templateID = process.env.REACT_APP_TEMPLATE_ID;
// const emailUserID = process.env.REACT_APP_EMAILJS_USERID;
// const domainLink = process.env.REACT_APP_DOMAIN;
// const emailAPI = process.env.REACT_APP_EMAIL_API;

// const { REACT_APP_STRIPE_SK_PUBLIC } = process.env;

// const stripePromise = loadStripe(REACT_APP_STRIPE_SK_PUBLIC);
// stripePromise.then((data) => {
//   console.log(data);
// });

// const Payment = () => {
//   const {
//     state,
//     chosenMovie,
//     chosenShowtime,
//     chosenSeats,
//     clearSelectedSeats,
//     addReservation,
//   } = useContext(AppContext);

//   const [totalPrice, setTotalPrice] = useState(0);
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     const total = chosenShowtime.ticketPrice * chosenSeats.length;
//     setTotalPrice(total);
//   }, [chosenSeats]);

//   const handleClick = async (event) => {
//     console.log("Stor PAyment prod details", state);

//     const stripe = await stripePromise;

//     const response = await fetch(
//       "http://localhost:5005/api/v1/create-session",
//       {
//         method: "POST",
//       }
//     );

//     const session = await response.json();

//     // When the customer clicks on the button, redirect them to Checkout.
//     const result = await stripe.redirectToCheckout({
//       sessionId: session.id,
//     });

//     if (result.error) {
//       // If `redirectToCheckout` fails due to a browser or network
//       // error, display the localized error message to your customer
//       // using `result.error.message`.
//     }
//   };

//   return message ? (
//     <BuyTicket info={state} />
//   ) : (
//     // <ProductDisplay handleClick={handleClick} info={state} />
//     <section>
//       {console.log(state, "prod info state")}
//       <div className="productPayment">
//         <img
//           className="imgPayment"
//           src="https://i.imgur.com/EHyR2nP.png"
//           alt="The cover of Stubborn Attachments"
//         />
//         <div className="descriptionPayment">
//           <h3>Stubborn Attachments</h3>
//           <h5>$20.00</h5>
//         </div>
//       </div>
//       <button id="checkout-button" role="link" onClick={handleClick}>
//         Checkout
//       </button>
//     </section>
//   );
// };

// export default Payment;
