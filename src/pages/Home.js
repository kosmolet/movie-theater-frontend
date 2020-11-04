/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import MovieRow from "../components/MovieRow";
import fetchMoviesRequests from "../requests";
import Banner from "../components/Banner";

function Movies() {
  return (
    <div className="row">
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

export default Movies;
