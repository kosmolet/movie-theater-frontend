import React from "react";
import "./App.css";
import fetchMoviesRequests from "./requests";
import MovieRow from "./pages/MovieRow";
import Banner from "./pages/Banner";
import Navbar from "./pages/Navbar";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Banner />
      <MovieRow
        title="Movies in Theater"
        fetchUrl={fetchMoviesRequests.InTheaters}
      />
      <MovieRow title="Coming Soon" fetchUrl={fetchMoviesRequests.Upcoming} />
      <MovieRow title="Top Rated" fetchUrl={fetchMoviesRequests.TopRated} />
      <MovieRow title="Family" fetchUrl={fetchMoviesRequests.Family} />
    </div>
  );
}

export default App;
