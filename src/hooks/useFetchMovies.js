import { useState, useEffect } from "react";
import { fetchMoviesRequests } from "../config";
import fetchBaseURL from "../axios";

const useFetchMovies = () => {
  const [allMovies, setMoviesTmdb] = useState([]);
  const [allMoviesFromDb, setMoviesDb] = useState([]);
  const [moviesTopRated, setTopRated] = useState([]);
  const [moviesFamily, setFamily] = useState([]);
  const [moviesUpcoming, setUpcoming] = useState([]);
  const [moviesPopular, setPopular] = useState([]);

  const fetchMoviesDb = async () => {
    try {
      const request = await fetchBaseURL.get("/movies");
      const moviesDb = request.data;
      setMoviesDb(moviesDb);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e.message, "Movies have not been fetched from DB");
    }
  };

  const fetchMoviesTmdb = async () => {
    const urls = [
      fetchMoviesRequests.TopRated,
      fetchMoviesRequests.Family,
      fetchMoviesRequests.Upcoming,
      fetchMoviesRequests.Popular,
    ];
    try {
      const request = await Promise.all(urls.map((e) => fetch(e)));
      const resJson = await Promise.all(request.map((e) => e.json()));
      const filteredMovies = await Promise.all(
        resJson.map((e) =>
          e.results.filter((i) => i.backdrop_path && i.poster_path)
        )
      );
      const resDB = await fetch(fetchMoviesRequests.FetchFromDB);
      const resDBJson = await resDB.json();
      const moviesAll = [
        ...filteredMovies[0],
        ...filteredMovies[1],
        ...filteredMovies[2],
        ...filteredMovies[3],
        ...resDBJson,
      ];
      setTopRated(filteredMovies[0]);
      setFamily(filteredMovies[1]);
      setUpcoming(filteredMovies[2]);
      setPopular(filteredMovies[3]);
      const uniqueMovies = [
        ...new Map(moviesAll.map((o) => [o.title, o])).values(),
      ];
      setMoviesTmdb(uniqueMovies);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e.message, "Movies have not been fetched");
    }
  };

  useEffect(() => {
    fetchMoviesDb();
    fetchMoviesTmdb();
  }, []);

  return [
    allMovies,
    allMoviesFromDb,
    moviesTopRated,
    moviesFamily,
    moviesUpcoming,
    moviesPopular,
  ];
};

export default useFetchMovies;
