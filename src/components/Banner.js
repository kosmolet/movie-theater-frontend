import React, { useState, useEffect, useContext } from "react";
// import movieFetchBaseURL from "../axios";
// import { fetchMoviesRequests } from "../config";
import { MovieContext } from "../store/MovieContext";
import "./Banner.css";

const Banner = () => {
  const [movie, setMovie] = useState([]);
  const [moviesContext] = useContext(MovieContext);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const request = await movieFetchBaseURL.get(
  //       fetchMoviesRequests.InTheaters
  //     );
  //     const filteredMovies = request.data.results.filter(
  //       (i) => i.backdrop_path
  //     );
  //     setMovie(
  //       filteredMovies[
  //         Math.floor(Math.floor(Math.random() * filteredMovies.length - 1))
  //       ]
  //     );
  //   };
  //   fetchData();
  // }, []);

  useEffect(() => {
    setMovie(
      moviesContext[
        Math.floor(Math.floor(Math.random() * moviesContext.length - 1))
      ]
    );
  }, [moviesContext]);

  const truncateString = (str, num) => {
    return str?.length > num ? `${str.substr(0, num - 1)}...` : str;
  };

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url(
                    "https://image.tmdb.org/t/p/original/${movie?.backdrop_path}"
                )`,
        backgroundPosition: "center center",
      }}
    >
      <div className="banner_contents">
        <h1 className="banner_title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div className="banner_buttons">
          <button type="button" className="banner_button">
            Play
          </button>
          <button type="button" className="btn-grad">
            Buy Ticket
          </button>
        </div>
        <h1 className="banner_description">
          {truncateString(movie?.overview, 150)}
        </h1>
      </div>

      <div className="banner_shadow"> </div>
    </header>
  );
};

export default Banner;
