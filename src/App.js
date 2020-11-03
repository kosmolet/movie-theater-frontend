import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import MovieTest from "./pages/MovieTest";
import { MovieProvider } from "./pages/MovieContext";

function App() {
  return (
    <MovieProvider>
      <Router>
        <div className="App">
          <Navbar />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/test" exact component={MovieTest} />
            <Route path="/movie/:id" component={MovieDetails} />
          </Switch>
        </div>
      </Router>
    </MovieProvider>
  );
}

export default App;
