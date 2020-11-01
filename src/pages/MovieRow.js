/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import "./MovieRow.css";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";
import movieFetchBaseURL from "../axios";

const baseImageUrl = "https://image.tmdb.org/t/p/original/";

function MovieRow({ title, fetchUrl, isLargeRow }) {
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

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <div className="row">
      <h2 data-testid="test">{title}</h2>

      <div className="cards">
        {movies.map((movie) => (
          <figure className="card">
            <img
              key={movie.id}
              src={`${baseImageUrl}${movie.poster_path}`}
              alt={movie.name}
            />
            <figcaption>{movie.title}</figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}

export default MovieRow;