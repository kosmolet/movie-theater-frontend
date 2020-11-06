/* eslint-disable react/jsx-indent */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useReducer } from "react";
import axios from "axios";
import dataFetchReducer from "./reducer";
import MovieCard from "../components/MovieCard";

const useDataApi = (initialUrl, initialData) => {
  const [url, setUrl] = useState(initialUrl);

  const [state, dispatch] = useReducer(dataFetchReducer, {
    isLoading: false,
    isError: false,
    data: initialData,
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_INIT" });
      try {
        const result = await axios(url);
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (error) {
        dispatch({ type: "FETCH_FAILURE" });
      }
    };

    fetchData();
  }, [url]);

  return [state, setUrl];
};

function Search() {
  const [query, setQuery] = useState("witches");
  const [{ data, isLoading, isError }, doFetch] = useDataApi(
    "https://api.themoviedb.org/3/search/movie?api_key=a09b1a41f069342e4fed2bc79105890f&query=the",
    {
      movies: [],
    }
  );

  return (
    <>
      <h2>hej hej</h2>
      <form
        onSubmit={(event) => {
          doFetch(
            `https://api.themoviedb.org/3/search/movie?api_key=a09b1a41f069342e4fed2bc79105890f&query=${query}`
          );

          event.preventDefault();
        }}
      >
        <input
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {isError && <div>Something went wrong ...</div>}

      {isLoading ? (
        <div>Loading ...</div>
      ) : (
        <ul>
          hej hej
          {console.log(data.results, "data.results")}
          {data.results !== undefined
            ? data.results.map((movie) => (
                <li key={movie.id}>
                  {movie.original_title}
                  <MovieCard movie={movie} />
                </li>
              ))
            : console.log(data, "data")}
        </ul>
      )}
    </>
  );
}

export default Search;
