import React, { useReducer } from "react";
import AppContext from "./context";
import reducer from "./reducer";
import days from "../config/WeekDays";
// import {
//   SET_MOVIES,
//   SET_CHOSEN_MOVIE,
//   SET_DAY,
//   SET_DATES,
//   ADD_SEAT,
//   DELETE_SEAT,
//   SET_TICKET_TYPE,
//   CLEAR_CHOSEN_SEATS,
//   SET_USER,
// } from "./actions";

const dayOfWeek = new Date().getDay() === 0 ? 6 : new Date().getDay() - 1;

const initialState = {
  chosenDay: { day: days[dayOfWeek], date: new Date() },
  dates: [],
  movies: [],
  chosenMovie: {},
  chosenSeats: [],
  user: [],
};

const Store = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={[state, dispatch]}>
      {children}
    </AppContext.Provider>
  );
};

export default Store;
