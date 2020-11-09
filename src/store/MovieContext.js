import React, { useState, createContext, useEffect } from "react";
import movieFetchBaseURL from "../axios";
import { fetchMoviesRequests } from "../config";

export const MovieContext = createContext();

export const MovieProvider = (props) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUrl = fetchMoviesRequests.TopRated;

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const moviesData = await movieFetchBaseURL.get(fetchUrl);
        const filteredMovies = moviesData.data.results.filter(
          (i) => i.backdrop_path !== null && i.poster_path !== null
        );
        setMovies(filteredMovies);
        setLoading(false);
        console.log("Movies in Context", filteredMovies);
      } catch (e) {
        if (e) {
          // eslint-disable-next-line no-console
          console.log(e.message, "Movies have not been fetched in Context");
        }
      }
    };
    fetchMovies();
  }, [fetchUrl]);

  return (
    <MovieContext.Provider value={[loading, movies]}>
      {props.children}
    </MovieContext.Provider>
  );
};
