import React, { useState, useContext } from "react";
import MovieRow from "../components/MovieRow";
import { fetchMoviesRequests } from "../config";
import Banner from "../components/Banner";
import MovieCard from "../components/MovieCard";
import SearchBar from "../components/SearchBar";
import { MovieContext } from "../store/MovieContext";
import "./Home.css";

function Movies() {
  const [movies, setMovies] = useState([]);
  const [moviesContext, dbMovies] = useContext(MovieContext);
  const [searchText, setText] = useState(" ");

  console.log(moviesContext, dbMovies, "HOME CONTEXT");
  /* 
  // to search from all movies in tmdb
  const onSearch = async (text) => {
    const request = await movieFetchBaseURL.get(
      `${fetchMoviesRequests.MovieSearch}${text}`
    );
    const filteredMovies = request.data.results.filter(
      (i) => i.backdrop_path && i.poster_path
    );
    setMovies(filteredMovies);
    setText(text);
  };
  */

  const onSearch = (text) => {
    const filteredMovies = moviesContext.filter((movie) =>
      movie.title.toLowerCase().includes(text.toLowerCase())
    );
    setMovies(filteredMovies);
    setText(text);
  };

  return (
    <div className="row">
      <Banner />
      <SearchBar onSearch={onSearch} />
      {console.log("SearchText:", searchText)}
      {console.log("MoviesFound:", movies)}
      {movies.length > 0 ? (
        <div className="movie-row-wrapper">
          <h2>Movies found:</h2>
          <div className="movie-row-found">
            {movies.map((movie) => (
              <MovieCard movie={movie} />
            ))}
          </div>
        </div>
      ) : (
        <p> </p>
      )}
      <MovieRow
        title="Movies in Theater"
        fetchUrl={fetchMoviesRequests.InTheaters}
      />
      <MovieRow title="Coming Soon" fetchUrl={fetchMoviesRequests.Upcoming} />
      <MovieRow title="Top Rated" fetchUrl={fetchMoviesRequests.TopRated} />
      <MovieRow title="Family" fetchUrl={fetchMoviesRequests.Family} />
    </div>
  );
}

export default Movies;
