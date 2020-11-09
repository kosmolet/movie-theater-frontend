/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./MovieDetails.css";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

const { REACT_APP_TMDB_API_KEY } = process.env;

const MovieDetails = ({ match }) => {
  const [movie, setMovie] = useState({});
  const [trailerUrl, setTrailerUrl] = useState("");

  useEffect(() => {
    const fetchMovie = async () => {
      const fetchItem = await fetch(
        `https://api.themoviedb.org/3/movie/${match.params.id}?api_key=${REACT_APP_TMDB_API_KEY}&language=en-US`
      );
      const movieItem = await fetchItem.json();
      setMovie(movieItem);
    };

    fetchMovie();
    console.log("match", match);
  }, [match]);

  const opts = {
    height: "450",
    width: "70%",
    playerVars: {
      autoplay: 1,
      modestbranding: 1,
      rel: 0,
    },
  };

  const handleClick = (forMovie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(forMovie?.title || "")
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((error) => console.log(`no trailer:  ${error}`));
    }
  };

  return (
    <div className="movie-details">
      {console.log("movie", movie)}
      <h3>{movie.title}</h3>
      <div className="youtube-trailer">
        {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
      </div>
      <div className="card-wrapper">
        <figure className="card">
          <img
            key={movie.id}
            src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
            alt={movie.name}
            onClick={() => handleClick(movie)}
          />
          <figcaption>{movie.title}</figcaption>
        </figure>
      </div>

      <div className="movie-description">
        <span className="score">Movie Score: {movie.vote_average}</span>
        <span className="year">Movie release_date: {movie.release_date} </span>
        <span className="duration">Movie duration: {movie.runtime}min </span>

        <div className="overview">{movie.overview}</div>

        <p className="genres">
          <span>Genres: </span>
          {movie.genres !== undefined
            ? movie.genres.map((genre, index) => {
                if (index < 6) return `${genre.name} `;
                return null;
              })
            : console.log(movie.genres, "movie.genres")}
        </p>
      </div>
      <div className="tickets-button">
        <Link to={`/movie/${movie.id}/booking`}>
          <button type="button">TICKETS</button>
        </Link>
      </div>
    </div>
  );
};

export default MovieDetails;
