import React from "react";
import "./App.css";
import fetchMoviesRequests from "./requests";
import MovieRow from "./pages/MovieRow";

function App() {
  return (
    <div className="App">
      <h1 className="App-header">This is Movie Theater!</h1>
      <MovieRow title="Trending Now" fetchUrl={fetchMoviesRequests.Trending} />
      <MovieRow
        title="Movies in Theater"
        fetchUrl={fetchMoviesRequests.MoviesInTheatres}
      />
    </div>
  );
}

export default App;
