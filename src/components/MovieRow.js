import React, { useState, useEffect } from "react";
import "./MovieRow.css";
// import movieFetchBaseURL from "../axios";
import { fetchMoviesRequests } from "../config";
import MovieCard from "./MovieCard";
// import { fetchMoviesRequests, TMDB_API_URL } from "../config";

const MovieRow = ({ title, fetchUrl }) => {
  const [movies, setMovies] = useState([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const request = await movieFetchBaseURL.get(fetchUrl);
  //     const filteredMovies = request.data.results.filter(
  //       (i) => i.backdrop_path && i.poster_path
  //     );
  //     setMovies(filteredMovies);
  //     return request;
  //   };
  //   fetchData(fetchUrl);
  // }, [fetchUrl]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${fetchUrl}`);
        const resJson = await response.json();
        const filteredMovies =
          fetchUrl !== fetchMoviesRequests.FetchFromDB
            ? resJson.results.filter((i) => i.backdrop_path && i.poster_path)
            : resJson;
        setMovies(filteredMovies);
        console.log(resJson, filteredMovies, "filtered on row");
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e.message, "Movies have not been fetched in Row");
      }
    };
    fetchData(fetchUrl);
  }, [fetchUrl]);

  return (
    <div
      className="movie-row-wrapper"
      key={`div_${new Date().getTime().toString()}`}
    >
      <h2 data-testid="title-movie-row">{title}</h2>

      <div className="movie-row" key={`div_${new Date().getTime().toString()}`}>
        {console.log("RowMovie", title, movies)}
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default MovieRow;
