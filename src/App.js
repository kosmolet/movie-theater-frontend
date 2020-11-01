import React from "react";
import "./App.css";
import fetchMoviesRequests from "./requests";
import MovieRow from "./pages/MovieRow";

function App() {
  return (
    <div className="App">
      <h1 className="App-header">This is Movie Theater!</h1>

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
