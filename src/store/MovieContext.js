import React, { useState, createContext, useEffect } from "react";
import { fetchMoviesRequests } from "../config";
import fetchBaseURL from "../axios";

export const MovieContext = createContext();

export const MovieProvider = (props) => {
  const [allMovies, setMovies] = useState([]);
  const [allmoviesDb, setMoviesDb] = useState([]);

  const moviesDB = async () => {
    try {
      const request = await fetchBaseURL.get("/movies");
      const moviesDb = request.data;
      console.log(moviesDb, "Movies from DB");
      setMoviesDb(moviesDb);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e.message, "Movies have not been fetched from DB");
    }
  };

  const fetchMovies = async () => {
    const urls = [
      fetchMoviesRequests.TopRated,
      fetchMoviesRequests.Family,
      fetchMoviesRequests.Upcoming,
      fetchMoviesRequests.Popular,
    ];
    try {
      const res = await Promise.all(urls.map((e) => fetch(e)));
      const resJson = await Promise.all(res.map((e) => e.json()));
      const filteredMovies = await Promise.all(
        resJson.map((e) =>
          e.results.filter((i) => i.backdrop_path && i.poster_path)
        )
      );
      const resDB = await fetch(fetchMoviesRequests.FetchFromDB);
      const resDBJson = await resDB.json();
      console.log("DBMoviesJson", resDBJson);
      const moviesAll = [
        ...filteredMovies[0],
        ...filteredMovies[1],
        ...filteredMovies[2],
        ...filteredMovies[3],
        ...resDBJson,
      ];
      const uniqueMovies = [
        ...new Map(moviesAll.map((o) => [o.title, o])).values(),
      ];
      setMovies(uniqueMovies);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e.message, "Movies have not been fetched in Context");
    }
  };

  useEffect(() => {
    fetchMovies();
    moviesDB();
  }, []);

  return (
    <MovieContext.Provider value={[allMovies, allmoviesDb]}>
      {props.children}
    </MovieContext.Provider>
  );
};
