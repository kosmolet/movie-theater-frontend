import days from "../config/WeekDays";

const dayOfWeek = new Date().getDay() === 0 ? 6 : new Date().getDay() - 1;

const initialState = {
  chosenDay: { day: days[dayOfWeek], date: new Date() },
  moviesMdb: [],
  chosenMovie: {},
  availableShowtime: [],
  chosenShowtime: {},
  chosenSeats: [],
  user: {},
  reservation: {},
};

export default initialState;
