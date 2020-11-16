import React, { useState, useEffect, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import MovieRow from "../components/MovieRow";
import Banner from "../components/Banner";
import MovieCard from "../components/MovieCard";
import SearchBar from "../components/SearchBar";
import AppContext from "../context/context";
import "./Home.css";
import useFetchMovies from "../hooks/useFetchMovies";

const Movies = () => {
  const [moviesFound, setFoundMovies] = useState([]);
  const [
    allMovies,
    allMoviesFromDb,
    moviesTopRated,
    moviesFamily,
    moviesUpcoming,
    moviesPopular,
  ] = useFetchMovies();
  const [searchText, setText] = useState("");
  const { state, setMoviesMdb } = useContext(AppContext);

  useEffect(() => {
    if (searchText.length > 1) {
      const filteredMovies = allMovies.filter((movie) =>
        movie.title.toLowerCase().includes(searchText.toLowerCase())
      );
      setFoundMovies(filteredMovies);
    } else {
      setFoundMovies([]);
    }
  }, [allMovies, searchText]);

  const onSearch = (text) => {
    setText(text);
  };

  useEffect(() => {
    setMoviesMdb(allMoviesFromDb);
  }, [allMoviesFromDb]);

  return (
    <div className="row">
      {console.log(state, "STOREhomeAppContext")}
      <Banner movies={allMoviesFromDb} />
      <SearchBar onSearch={onSearch} />
      {moviesFound.length > 0 ? (
        <div className="movie-row-wrapper">
          <h2>Movies found:</h2>
          <div className="movie-row-found" key={uuidv4()}>
            {moviesFound.map((movie) => (
              <MovieCard key={uuidv4()} movie={movie} />
            ))}
          </div>
        </div>
      ) : (
        <p> </p>
      )}
      <MovieRow key={uuidv4()} title="Buy Ticket" movies={allMoviesFromDb} />
      <MovieRow key={uuidv4()} title="Coming Soon" movies={moviesUpcoming} />
      <MovieRow key={uuidv4()} title="Popular now" movies={moviesPopular} />
      <MovieRow key={uuidv4()} title="Top Rated" movies={moviesTopRated} />
      <MovieRow key={uuidv4()} title="Family" movies={moviesFamily} />
    </div>
  );
};

export default Movies;
