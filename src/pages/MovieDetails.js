/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable prettier/prettier */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState, useEffect, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";
import "./MovieDetails.css";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";
import fetchBaseURL from "../axios";
import AppContext from "../context/context";
import {
  TMDB_API_URL,
  IMAGE_BASE_URL,
  BACKDROP_SIZE,
  POSTER_SIZE,
} from "../config";

const { REACT_APP_TMDB_API_KEY } = process.env;

const MovieDetails = ({ match }) => {
  const [trailerUrl, setTrailerUrl] = useState("");
  const [data, setDbData] = useState({});
  const {
    state,
    chosenMovie,
    setChosenMovie,
    setAvailableShowTime,
    setChosenShowTime,
  } = useContext(AppContext);

  const setMovieInfoAndShowtime = async () => {
    setChosenMovie({});
    if (match.params.id.length < 15) {
      const request = await fetch(
        `${TMDB_API_URL}movie/${match.params.id}?api_key=${REACT_APP_TMDB_API_KEY}`
      );
      const movie = await request.json();
      setChosenMovie(movie);
    } else {
      const requestMovieWithShowtimes = await fetchBaseURL.get(
        `/movies/${match.params.id}/showtimes`
      );
      const movie = requestMovieWithShowtimes.data[0];
      setChosenMovie(movie);
      const requestShowtimesWithReservations = await fetchBaseURL.get(
        `/movies/${match.params.id}/showtimes`
      );
      const showtimes1 = requestShowtimesWithReservations.data;
      setAvailableShowTime(showtimes1);
    }
  };

  const setShowTimeAndReservations = async (showtimeId) => {
    console.log(showtimeId, "showtime");
    const reservationsInShowTime = await fetchBaseURL.get(
      `/movies/${match.params.id}/showtimes/${showtimeId}/reservations`
    );
    console.log(reservationsInShowTime);
    setChosenShowTime(reservationsInShowTime.data[0]);
  };

  useEffect(() => {
    setMovieInfoAndShowtime();
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

  const handleShowTrailer = (forMovie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(forMovie?.title || "")
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
        })
        // eslint-disable-next-line no-console
        .catch((error) => console.log(`no trailer:  ${error}`));
    }
  };

  return (
    <div className="movie-details">
      {console.log("STORE movieDetails", state)}
      <h3>{chosenMovie.title}</h3>
      <div className="youtube-trailer">
        {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
      </div>
      <div className="card-wrapper">
        <figure className="card">
          <img
            key={uuidv4()}
            src={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${chosenMovie.backdrop_path}`}
            alt={chosenMovie.name}
            onClick={() => handleShowTrailer(chosenMovie)}
          />
          <figcaption>{chosenMovie.title}</figcaption>
        </figure>
      </div>

      <div className="movie-description">
        <span className="score">
          Movie Score:{" "}
          {chosenMovie.vote_average ? chosenMovie.vote_average : `7.7 `}
        </span>
        <span className="year">
          Movie release_date: {chosenMovie.release_date}{" "}
        </span>
        <span className="duration">
          Movie duration: {chosenMovie.runtime}min{" "}
        </span>

        <div className="overview">{chosenMovie.overview}</div>

        <p className="genres">
          <span>Genres: </span>
          {chosenMovie.genres !== undefined ? (
            chosenMovie.genres.map((genre, index) => {
              if (index < 6) return `${genre.name || genre[index]} `;
              return null;
            })
          ) : (
            <span>-</span>
          )}
        </p>
      </div>

      <div className="showtime">
        <span> Showtimes: </span>
        {chosenMovie.showtimes !== undefined ? (
          chosenMovie.showtimes.map((showtime) => (
            <div key={uuidv4()}>
              {showtime.startAt.slice(0, 10)} {showtime.startAt.slice(11, 16)}{" "}
              <Link to="/booking">
                <button
                  id={showtime._id}
                  className="tickets-button"
                  type="button"
                  onClick={(e) => setShowTimeAndReservations(e.target.id)}
                  key={uuidv4()}
                >
                  TICKETS
                </button>
              </Link>
            </div>
          ))
        ) : (
          <span>Showtimes are not available for this movie</span>
        )}
      </div>
    </div>
  );
};

export default MovieDetails;
