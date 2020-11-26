import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import BuyTicket from "./pages/BuyTicket";
import Footer from "./components/Footer";
import SeatsSelection from "./pages/SeatsSelection";
import NotFound from "./pages/NotFound";
import Ticket from "./components/Ticket";
import Store from "./context/store";
import Payment from "./pages/Payment";
import CheckoutForm from "./pages/CheckoutForm";
import PaymentSession from "./pages/PaymentSession";
import Success from "./pages/Success";

const { REACT_APP_STRIPE_SK_PUBLIC } = process.env;
const stripePromise = loadStripe(REACT_APP_STRIPE_SK_PUBLIC);

function App() {
  return (
    <Store>
      <Router>
        <div className="App">
          <Navbar />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/movie/:id" exact component={MovieDetails} />
            <Route path="/booking" exact component={SeatsSelection} />
            <Route path="/checkout" exact component={BuyTicket} />
            <Route path="/ticket" exact component={Ticket} />
            {/* <Elements stripe={stripePromise}>
              <Route path="/payment" exact component={CheckoutForm} />
            </Elements> */}
            {/* <Route path="/payment" exact component={Payment} /> */}
            {/* <Route path="/thankyou'" component={ThankYou} /> */}
            <Route path="/paymentsession" component={PaymentSession} />
            <Route path="/success" component={Success} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </Router>
      <Footer />
    </Store>
  );
}

export default App;
