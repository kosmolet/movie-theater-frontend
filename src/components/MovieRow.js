import React from "react";
import Carousel from "react-elastic-carousel";
import "./MovieRow.css";
import { v4 as uuidv4 } from "uuid";
import MovieCard from "./MovieCard";

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2, itemsToScroll: 2 },
  { width: 768, itemsToShow: 3 },
  { width: 1200, itemsToShow: 4 },
];

const MovieRow = ({ title, movies }) => {
  return (
    <div className="movie-row-wrapper" key={uuidv4()}>
      <h2 data-testid="title-movie-row">{title}</h2>

      <div className="movie-row" key={uuidv4()}>
        <Carousel breakPoints={breakPoints}>
          {console.log("RowMovie", title, movies)}
          {movies.map((movie) => (
            <MovieCard key={uuidv4()} movie={movie} />
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default MovieRow;
