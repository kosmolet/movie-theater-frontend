import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import BuyTicket from "./pages/BuyTicket";
import Footer from "./components/Footer";
import SeatsSelection from "./pages/SeatsSelection";
import NotFound from "./pages/NotFound";
import Ticket from "./components/Ticket";
import Store from "./context/store";

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
            <Route component={NotFound} />
          </Switch>
        </div>
      </Router>
      <Footer />
    </Store>
  );
}

export default App;
