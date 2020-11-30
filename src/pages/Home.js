import React, { useState, useEffect, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { useTranslation } from "react-i18next";
import MovieRow from "../components/MovieRow";
import Banner from "../components/Banner";
import MovieCard from "../components/MovieCard";
import SearchBar from "../components/SearchBar";
import AppContext from "../context/context";
import useFetchMovies from "../hooks/useFetchMovies";
import "./Home.css";

const Home = () => {
  const [moviesFound, setFoundMovies] = useState([]);
  const { t } = useTranslation();
  const [
    allMovies,
    allMoviesFromDb,
    moviesTopRated,
    moviesFamily,
    moviesUpcoming,
  ] = useFetchMovies();
  const [searchText, setText] = useState("");
  const { setMoviesMdb } = useContext(AppContext);

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
    <div className="home-wrapper" data-testid="home-page">
      <Banner movies={allMoviesFromDb} />
      <SearchBar onSearch={onSearch} />
      {moviesFound.length > 0 ? (
        <div className="movie-row-wrapper">
          <h2>{t("titleMovieRow.found")}</h2>
          <div className="movie-row-found">
            {moviesFound.map((movie) => (
              <MovieCard key={uuidv4()} movie={movie} />
            ))}
          </div>
        </div>
      ) : (
        <p> </p>
      )}
      <MovieRow
        key={uuidv4()}
        title={t("titleMovieRow.nowInTheater")}
        movies={allMoviesFromDb}
      />
      <MovieRow
        key={uuidv4()}
        title={t("titleMovieRow.commingSoon")}
        movies={moviesUpcoming}
      />
      <MovieRow
        key={uuidv4()}
        title={t("titleMovieRow.retro")}
        movies={moviesTopRated}
      />
      <MovieRow
        key={uuidv4()}
        title={t("titleMovieRow.family")}
        movies={moviesFamily}
      />
    </div>
  );
};

export default Home;
