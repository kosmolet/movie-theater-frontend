import days from "../config/WeekDays";

const dayOfWeek = new Date().getDay() === 0 ? 6 : new Date().getDay() - 1;

const initialState = {
  moviesTmdb: [],
  moviesMongo: [],
  chosenDay: { day: days[dayOfWeek], date: new Date() },
  dates: [],
  chosenMovie: {},
  chosenSeats: [],
  user: [],
};

export default initialState;
