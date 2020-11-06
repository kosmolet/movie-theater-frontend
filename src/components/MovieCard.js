/* eslint-disable no-unused-vars */
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { MovieContext } from "../store/MovieContext";
import "./MovieCard.css";

const MovieCard = ({ movie }) => {
  const [movies, setMovies] = useContext(MovieContext);

  return (
    <div className="movie-card-wrapper">
      {movie.poster_path ? (
        <Link to={`/movie/${movie.id}`}>
          <figure className="movie-card">
            {movie.name}
            <img
              key={movie.id}
              src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
              alt={`${movie.title} poster`}
            />
            <figcaption>{movie.title}</figcaption>
          </figure>
        </Link>
      ) : (
        <div className="no-movie-poster" />
      )}
    </div>
  );
};

export default MovieCard;
