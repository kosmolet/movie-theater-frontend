/* eslint-disable no-unused-vars */
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { MovieContext } from "../store/MovieContext";

const MovieCard = ({ movie }) => {
  const [movies, setMovies] = useContext(MovieContext);
  console.log("movieCardProp", movie);
  console.log("movieCardContext", MovieContext);
  return (
    <div className="movie-card">
      <div className="movie-poster-wrapper">
        {movie.poster_path ? (
          //   <img
          //     src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
          //     alt={`${movie.title} Poster`}
          //   />
          <Link to={`/movie/${movie.id}`}>
            <figure className="card">
              {movie.name}
              {console.log(movie.name)}
              <img
                key={movie.id}
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={`${movie.title} Poster`}
              />
              <figcaption>{movie.title}</figcaption>
            </figure>
          </Link>
        ) : (
          <div className="no-movie-poster" />
        )}
      </div>
    </div>
  );
};

export default MovieCard;
