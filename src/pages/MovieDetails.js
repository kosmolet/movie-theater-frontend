/* eslint-disable react/self-closing-comp */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-one-expression-per-line */
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

  const {
    state,
    chosenMovie,
    setChosenMovie,
    setAvailableShowTime,
    setChosenShowTime,
  } = useContext(AppContext);
  const [movie1, setMovie] = useState(chosenMovie);

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
      const movie = await requestMovieWithShowtimes.data[0];
      setChosenMovie(movie);
      const requestShowtimesWithReservations = await fetchBaseURL.get(
        `/movies/${match.params.id}/showtimes`
      );
      const showtimes1 = await requestShowtimesWithReservations.data;
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

  useEffect(() => {
    setMovie(chosenMovie);
  }, []);

  const opts = {
    height: "550",
    width: "100%",
    playerVars: {
      autoplay: 1,
      modestbranding: 1,
      rel: 0,
      disablekb: 0,
      playIcon: true,
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

  const timeConvert = (num) => {
    const hours = Math.floor(num / 60);
    const minutes = num % 60;
    return `${hours}h${" "}${minutes}min${" "}`;
  };

  return (
    <div className="movie-details">
      {console.log("STORE MovDetails", state)}
      <header
        className="banner"
        style={{
          backgroundSize: "cover",
          backgroundImage: `url(
                    "https://image.tmdb.org/t/p/original/${chosenMovie?.backdrop_path}"
                )`,
          backgroundPosition: "center center",
        }}
      />
      <div className="poster-shadow"> </div>
      <div className="poster-img-wrapper">
        <img
          className="poster-img"
          src={`${IMAGE_BASE_URL}w185${chosenMovie?.poster_path}`}
          alt={`${chosenMovie?.title} poster`}
        />

        <div className="title-genres-duration">
          <h3>{chosenMovie.title}</h3>
          <div className="genres">
            {chosenMovie.genres ? (
              chosenMovie.genres.map((genre, index) => {
                if (index < 6) {
                  return `${genre?.name || genre} `;
                }
                return null;
              })
            ) : (
              <span>-</span>
            )}
          </div>

          <span className="duration">
            {timeConvert(chosenMovie.runtime)}
            {" | "}
          </span>
          <span className="year">
            From:{" "}
            {movie1.release_date ? movie1.release_date.slice(0, 10) : "soon"}
          </span>
        </div>
      </div>
      <div className="playpause">
        <input
          type="checkbox"
          onClick={() => handleShowTrailer(chosenMovie)}
          value="None"
          id="playpause"
          name="check"
        />
        <label htmlFor="playpause"></label>
      </div>

      <div className="youtube-trailer">
        {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
      </div>

      <div className="overview">{chosenMovie.overview}</div>
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
