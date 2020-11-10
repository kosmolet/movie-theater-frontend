import React, { useState, useEffect } from "react";
import "./MovieRow.css";
import movieFetchBaseURL from "../axios";
import MovieCard from "./MovieCard";

const MovieRow = ({ title, fetchUrl }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const request = await movieFetchBaseURL.get(fetchUrl);
      const filteredMovies = request.data.results.filter(
        (i) => i.backdrop_path && i.poster_path
      );
      setMovies(filteredMovies);
      return request;
    };
    fetchData(fetchUrl);
  }, [fetchUrl]);

  return (
    <div className="movie-row-wrapper">
      <h2 data-testid="title-movie-row">{title}</h2>

      <div className="movie-row">
        {console.log("RowMovie", title, movies)}
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default MovieRow;
