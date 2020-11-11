import React from "react";
import { Link } from "react-router-dom";
import "./MovieCard.css";
import { IMAGE_BASE_URL, POSTER_SIZE } from "../config";

const MovieCard = ({ movie }) => {
  return (
    <div className="movie-card-wrapper">
      {movie.poster_path ? (
        <Link to={`/movie/${movie?.id || movie?.tmdb_id}`}>
          <figure className="movie-card">
            {movie.name}
            <img
              key={movie?.id || movie?.tmdb_id}
              src={`${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}`}
              alt={`${movie.title} poster`}
            />
            <figcaption>{movie.title}</figcaption>
          </figure>
        </Link>
      ) : (
        <p>image coming soon</p>
      )}
    </div>
  );
};

export default MovieCard;
