/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/jsx-closing-tag-location */
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
import days from "../config/WeekDays";

const { REACT_APP_TMDB_API_KEY } = process.env;

const MovieDetails = ({ match }) => {
  const [trailerUrl, setTrailerUrl] = useState("");
  const [dropdown, setDropdown] = useState("All");
  const [itemsDropdown, setDropdownItems] = useState([]);

  const {
    state,
    availableShowtime,
    chosenMovie,
    setChosenMovie,
    setAvailableShowTime,
    setChosenShowTime,
  } = useContext(AppContext);

  const dayOfWeek = (dateStr) => {
    const date = new Date(dateStr);
    const dayIndex = date.getDay() === 0 ? 6 : date.getDay() - 1;
    const day = days[dayIndex];
    return day;
  };

  const beautifyDate = (date) => {
    return `${date.slice(8, 10)}/${date.slice(5, 7)} - ${dayOfWeek(date)}`;
  };
  const setDropDownValues = (showtimesArr) => {
    const datesArr = showtimesArr.map((showtime) =>
      showtime.startAt.slice(0, 10)
    );
    const uniqueDates = datesArr.filter(
      (value, index) => datesArr.indexOf(value) === index
    );
    const dropItems = uniqueDates.map((date) => ({
      label: `${date} ${dayOfWeek(date)}`,
      value: date,
    }));
    console.log(dayOfWeek(uniqueDates[0]));
    setDropdownItems(dropItems);
  };

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
      const showtimesArr = await requestShowtimesWithReservations.data[0]
        .showtimes;
      const showtimesInFuture = showtimesArr.filter(
        (showtimesArrItem) => new Date(showtimesArrItem.startAt) > new Date()
      );
      showtimesInFuture.sort((a, b) => {
        return new Date(a.startAt) - new Date(b.startAt);
      });
      console.log(showtimesInFuture);
      setAvailableShowTime(showtimesInFuture);

      setDropDownValues(showtimesInFuture);
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
    height: "550px",
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
            {chosenMovie.release_date
              ? chosenMovie.release_date.slice(0, 10)
              : "soon"}
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
      <select
        className="dropdown-selector"
        onChange={(e) => {
          setDropdown(e.target.value);
        }}
      >
        {itemsDropdown.map(({ label, value }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
      {console.log(dropdown, "in drop")}
      <div className="showtimes">
        <span className="showtime-title"> Showtimes: </span>
        {availableShowtime ? (
          availableShowtime.map((showtime) => (
            <div key={uuidv4()} className="showtime">
              <span className="showtime-time">
                {showtime.startAt.slice(11, 16)}
              </span>
              {beautifyDate(showtime.startAt)}
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
