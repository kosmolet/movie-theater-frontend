import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import Footer from "./components/Footer";
import SeatsSelection from "./pages/SeatsSelection";
import NotFound from "./pages/NotFound";
import Ticket from "./components/Ticket";
import Store from "./context/store";
import PaymentSession from "./pages/PaymentSession";
import Success from "./pages/Success";
import Failure from "./pages/Failure";

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
            <Route path="/ticket" exact component={Ticket} />
            <Route path="/paymentsession" component={PaymentSession} />
            <Route path="/success" component={Success} />
            <Route path="/failure" component={Failure} />
            <Route path="/ticket" component={Ticket} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </Router>
      <Footer />
    </Store>
  );
}

export default App;
