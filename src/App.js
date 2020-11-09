import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import { MovieProvider } from "./store/MovieContext";
import BuyTicket from "./pages/BuyTicket";
import Payment from "./pages/Payment";
import Footer from "./components/Footer";
import Seats from "./components/Seats";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <MovieProvider>
      <Router>
        <div className="App">
          <Navbar />

          <Switch>
            <Route path="/seats" exact component={Seats} />
            <Route path="/" exact component={Home} />
            <Route path="/movie/:id" exact component={MovieDetails} />
            <Route path="/movie/:id/booking/" exact component={BuyTicket} />
            <Route
              path="/movie/:id/booking/:id/payment"
              exact
              component={Payment}
            />
            <Route component={NotFound} />
          </Switch>
        </div>
      </Router>
      <Footer />
    </MovieProvider>
  );
}

export default App;
