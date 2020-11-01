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

const FROM_DATE = getCurrentDate(-14);
const TO_DATE = getCurrentDate(7);

const FROM_DATE_UPCOMING = getCurrentDate(8);
const TO_DATE_UPCOMING = getCurrentDate(21);

const fetchMoviesRequests = {
  InTheaters: `/discover/movie?api_key=${REACT_APP_TMDB_API_KEY}&primary_release_date.gte=${FROM_DATE}&primary_release_date.lte=${TO_DATE}`,
  Popular: `/discover/movie?api_key=${REACT_APP_TMDB_API_KEY}&primary_release_date.gte=${FROM_DATE}&primary_release_date.lte=${TO_DATE}&sort_by=popularity.desc`,
  Upcoming: `/discover/movie?api_key=${REACT_APP_TMDB_API_KEY}&primary_release_date.gte=${FROM_DATE_UPCOMING}&primary_release_date.lte=${TO_DATE_UPCOMING}&language=en-US&sort_by=popularity.desc`,
  TopRated: `/movie/top_rated?api_key=${REACT_APP_TMDB_API_KEY}&with_genres=80&sort_by=popularity.desc`,
  Family: `/discover/movie?api_key=${REACT_APP_TMDB_API_KEY}&primary_release_date.gte=${FROM_DATE}&primary_release_date.lte=${TO_DATE}&with_genres=10751&sort_by=popularity.desc`,
};

export default fetchMoviesRequests;
