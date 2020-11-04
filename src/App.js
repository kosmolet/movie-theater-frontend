import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import { MovieProvider } from "./store/MovieContext";
import BuyTicket from "./pages/BuyTicket";
import Payment from "./pages/Payment";

function App() {
  return (
    <MovieProvider>
      <Router>
        <div className="App">
          <Navbar />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/movie/:id" exact component={MovieDetails} />
            <Route path="/movie/:id/booking/" exact component={BuyTicket} />
            <Route
              path="/movie/:id/booking/:id/payment"
              exact
              component={Payment}
            />
          </Switch>
        </div>
      </Router>
    </MovieProvider>
  );
}

export default App;
