import React from "react";
import "./MovieRow.css";
import { v4 as uuidv4 } from "uuid";
import MovieCard from "./MovieCard";

const MovieRow = ({ title, movies }) => {
  return (
    <div className="movie-row-wrapper" key={uuidv4()}>
      <h2 data-testid="title-movie-row">{title}</h2>
      <div className="movie-row" key={uuidv4()}>
        {console.log("RowMovie", title, movies)}
        {movies.map((movie) => (
          <MovieCard key={uuidv4()} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default MovieRow;
