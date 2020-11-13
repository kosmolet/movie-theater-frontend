import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Banner.css";

const Banner = ({ movies }) => {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    const randomMovie =
      movies[Math.floor(Math.floor(Math.random() * movies.length - 1))];
    if (randomMovie) {
      setMovie(randomMovie);
    } else {
      setMovie(movies[0]);
    }
  }, [movies]);

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
          <Link to={`/movie/${movie?.id || movie?.tmdb_id}`}>
            <button type="button" className="btn-grad">
              Buy Ticket
            </button>
          </Link>
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
