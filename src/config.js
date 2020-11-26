const TMDB_API_URL = "https://api.themoviedb.org/3/";
const IMAGE_BASE_URL = "http://image.tmdb.org/t/p/";
const { REACT_APP_TMDB_API_KEY } = process.env;
const { REACT_APP_BASE_URL } = process.env;
const ticketPrice = 125;
// Sizes: w300, w780, w1280, original
const BACKDROP_SIZE = "w1280";

// w92, w154, w185, w342, w500, w780, original
const POSTER_SIZE = "w342";

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

const FROM_DATE = getCurrentDate(-14);
const TO_DATE = getCurrentDate(7);

const FROM_DATE_UPCOMING = getCurrentDate(40);
const TO_DATE_UPCOMING = getCurrentDate(365);

const fetchMoviesRequests = {
  InTheaters: `${TMDB_API_URL}discover/movie?api_key=${REACT_APP_TMDB_API_KEY}&primary_release_date.gte=${FROM_DATE}&primary_release_date.lte=${TO_DATE}`,
  Popular: `${TMDB_API_URL}discover/movie?api_key=${REACT_APP_TMDB_API_KEY}&primary_release_date.gte=${FROM_DATE}&primary_release_date.lte=${TO_DATE}&sort_by=popularity.desc`,
  Upcoming: `${TMDB_API_URL}discover/movie?api_key=${REACT_APP_TMDB_API_KEY}&primary_release_date.gte=${FROM_DATE_UPCOMING}&primary_release_date.lte=${TO_DATE_UPCOMING}&language=en-US&sort_by=popularity.desc`,
  TopRated: `${TMDB_API_URL}movie/top_rated?api_key=${REACT_APP_TMDB_API_KEY}&with_genres=80&sort_by=popularity.desc`,
  Family: `${TMDB_API_URL}discover/movie?api_key=${REACT_APP_TMDB_API_KEY}&primary_release_date.gte=${FROM_DATE}&primary_release_date.lte=${TO_DATE}&with_genres=10751&sort_by=popularity.desc`,
  MovieSearch: `${TMDB_API_URL}search/movie?api_key=${REACT_APP_TMDB_API_KEY}&query=`,
  FetchFromDB: `${REACT_APP_BASE_URL}movies`,
};

export {
  TMDB_API_URL,
  REACT_APP_TMDB_API_KEY,
  IMAGE_BASE_URL,
  BACKDROP_SIZE,
  POSTER_SIZE,
  fetchMoviesRequests,
  ticketPrice,
};
