/* eslint-disable react/jsx-boolean-value */
import React, { useState, useEffect } from "react";
import "./MovieRow.css";
import movieFetchBaseURL from "../axios";
import MovieCard from "./MovieCard";

const MovieRow = ({ title, fetchUrl }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const request = await movieFetchBaseURL.get(fetchUrl);
      const filteredMovies = request.data.results.filter(
        (i) => i.backdrop_path !== null && i.poster_path !== null
      );
      setMovies(filteredMovies);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  return (
    <div className="movie-row-wrapper">
      <h2>{title}</h2>

      <div className="movie-row">
        {movies.map((movie) => (
          <MovieCard movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default MovieRow;
