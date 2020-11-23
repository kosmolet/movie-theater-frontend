import React from "react";
import Carousel from "react-elastic-carousel";
import "./MovieRow.css";
import MovieCard from "./MovieCard";

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2, itemsToScroll: 1 },
  { width: 768, itemsToShow: 3 },
  { width: 1200, itemsToShow: 4 },
];

const MovieRow = ({ title, movies }) => {
  return (
    <div className="movie-row-wrapper">
      <h2 data-testid="movie-row-title">{title}</h2>
      <div className="movie-row">
        <Carousel breakPoints={breakPoints}>
          {movies.map((movie) => (
            <MovieCard key={movie?.id || movie?._id} movie={movie} />
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default MovieRow;
