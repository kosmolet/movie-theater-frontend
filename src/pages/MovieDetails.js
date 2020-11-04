/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./MovieDetails.css";

const MovieDetails = ({ match }) => {
  const [movie, setMovie] = useState({});
  const { REACT_APP_TMDB_API_KEY } = process.env;
  const fetchMovie = async () => {
    const fetchItem = await fetch(
      `https://api.themoviedb.org/3/movie/${match.params.id}?api_key=${REACT_APP_TMDB_API_KEY}&language=en-US`
    );
    const movieItem = await fetchItem.json();
    setMovie(movieItem);
    console.log("movieItem", movieItem);
  };

  useEffect(() => {
    fetchMovie();
    console.log("match", match);
  }, []);

  return (
    <div className="movie-details">
      <h2>
        id:
        {`${match.params.id}`}
      </h2>
      <h2>{movie.title}</h2>
      <h6>{movie.overview}</h6>
      {console.log(movie)}
      {/* {movie.genres.map((genre) => (
        <li>{genre.name}</li>
      ))} */}
      <Link to={`/movie/${movie.id}/booking`}>
        <button type="button">TICKETS</button>
      </Link>

      <div className="card">
        <figure className="card">
          <img
            key={movie.id}
            src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
            alt={movie.name}
          />
          <figcaption>{movie.title}</figcaption>
        </figure>
      </div>
    </div>
  );
};

export default MovieDetails;
