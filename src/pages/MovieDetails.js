/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect, useContext } from "react";
import { useTranslation } from "react-i18next";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";
import "./MovieDetails.css";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";
import fetchBaseURL from "../axios";
import AppContext from "../context/context";
import { TMDB_API_URL, IMAGE_BASE_URL } from "../config";
import days from "../config/WeekDays";

const { REACT_APP_TMDB_API_KEY } = process.env;

const MovieDetails = ({ match }) => {
  const [trailerUrl, setTrailerUrl] = useState("");
  const [itemsDropdown, setDropdownItems] = useState([]);
  const [dropdownValue, setDropdownValue] = useState("All");
  const [ddResShowtimes, setddResShowtimes] = useState([]);
  const { t } = useTranslation();
  const {
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

  const timeConvert = (num) => {
    const hours = Math.floor(num / 60);
    const minutes = num % 60;
    return `${hours}${t("h")}${" "}${minutes}${t("min")}${" "}`;
  };

  const beautifyDate = (date) => {
    return `${date.slice(8, 10)}/${date.slice(5, 7)} - ${dayOfWeek(date)}`;
  };
  const setDropDownValues = (showtimesArr) => {
    if (showtimesArr.length > 0) {
      const datesArr = showtimesArr.map((showtime) =>
        showtime.startAt.slice(0, 10)
      );
      const uniqueDates = datesArr.filter(
        (value, index) => datesArr.indexOf(value) === index
      );
      const dropItems = uniqueDates.map((date) => ({
        label: `${beautifyDate(date)}`,
        value: date,
      }));
      setDropdownItems(dropItems);
      if (dropItems) {
        setDropdownValue(dropItems[0].value);
      }
    }
  };

  const refreshShowtimes = () => {
    return availableShowtime.filter((item) => {
      return item.startAt.slice(0, 10) === dropdownValue;
    });
  };
  useEffect(() => {
    setddResShowtimes(refreshShowtimes());
  }, [dropdownValue]);

  const setShowTimeAndReservations = async (showtimeId) => {
    const reservationsInShowTime = await fetchBaseURL.get(
      `/movies/${match.params.id}/showtimes/${showtimeId}/reservations`
    );
    await setChosenShowTime(reservationsInShowTime.data[0]);
  };

  useEffect(() => {
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
        setAvailableShowTime(showtimesInFuture);
        setDropDownValues(showtimesInFuture);
      }
    };
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

  return (
    <div className="content-wrapper">
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
      <div className="banner-shadow"> </div>
      <div className="poster-img-wrapper">
        <img
          className="poster-img"
          src={`${IMAGE_BASE_URL}w185${chosenMovie?.poster_path}`}
          alt={`${chosenMovie?.title} poster`}
        />

        <div className="img-info-wrapper">
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
            {t("from")}
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
        <label className="label-movie-details" htmlFor="playpause" />
      </div>

      <div className="youtube-trailer">
        {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
      </div>

      <div className="overview">{chosenMovie.overview}</div>
      <select
        className="dropdown-selector"
        onChange={(e) => {
          setDropdownValue(e.target.value);
        }}
      >
        {itemsDropdown.map(({ label, value }) => (
          <option className="dropdown-selection" key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
      <div className="showtimes">
        <span className="showtime-title">{t("showtimes")}</span>
        {ddResShowtimes.length > 0 ? (
          ddResShowtimes.map((showtime) => (
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
                  {t("selectSeats")}
                </button>
              </Link>
            </div>
          ))
        ) : (
          <div>
            <div key={uuidv4()} className="showtime">
              <span className="showtime-time">{t("noShowtimes")}</span>
              <div className="gif">
                <iframe
                  title="gif"
                  src="https://giphy.com/embed/J2aYPy0Fd8oPNITB6u"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  className="giphy-embed"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieDetails;
