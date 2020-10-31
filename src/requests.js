const { REACT_APP_TMDB_API_KEY } = process.env;

const getCurrentDate = (days, separator = "-") => {
  const dateToFormat = new Date();
  dateToFormat.setDate(dateToFormat.getDate() + days);
  const date = dateToFormat.getDate();
  const month = dateToFormat.getMonth() + 1;
  const year = dateToFormat.getFullYear();
  return `${year}${separator}${
    month < 10 ? `0${month}` : `${month}`
  }${separator}${date < 10 ? `0${date}` : `${date}`}`;
};

const FROM_DATE = getCurrentDate(-21);
const TO_DATE = getCurrentDate(-7);

const fetchMoviesRequests = {
  MoviesInTheatres: `/discover/movie?api_key=${REACT_APP_TMDB_API_KEY}&primary_release_date.gte=${FROM_DATE}&primary_release_date.lte=${TO_DATE}&language=en-US`,
  Popular: `/discover/movie?api_key=${REACT_APP_TMDB_API_KEY}&sort_by=popularity.desc`,
  Trending: `/trending/all/week?api_key=${REACT_APP_TMDB_API_KEY}&language=en-US`,
  TopRated: `/movie/top_rated?api_key=${REACT_APP_TMDB_API_KEY}&language=en-US`,
  ActionMovies: `/movie?api_key=${REACT_APP_TMDB_API_KEY}&with_genres=28`,
  ComedyMovies: `/discover/movie?api_key=${REACT_APP_TMDB_API_KEY}&with_genres=35`,
  HorrorMovies: `/discover/movie?api_key=${REACT_APP_TMDB_API_KEY}&with_genres=27`,
  RomanceMovies: `/discover/movie?api_key=${REACT_APP_TMDB_API_KEY}&with_genres=10749`,
  Documentaries: `/discover/movie?api_key=${REACT_APP_TMDB_API_KEY}&with_genres=99`,
};

export default fetchMoviesRequests;
