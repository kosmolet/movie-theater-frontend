/* eslint-disable no-unused-vars */
import React, { useState, useContext } from "react";
import { MovieContext } from "./MovieContext";

const MovieTest = ({ match }) => {
  const [movies, setMovies] = useContext(MovieContext);
  console.log(movies);
  console.log(match);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  return (
    <div>
      <h2>Test context</h2>
      <h2>
        id:
        {`${match.params}`}
      </h2>
    </div>
  );
};

export default MovieTest;
