import React, { useReducer } from "react";
import AppContext from "./context";
import reducer from "./reducer";
import initialState from "./state";

import {
  SET_DAY,
  SET_MOVIES,
  SET_CHOSEN_MOVIE,
  SET_AVAILABLE_SHOWTIME,
  SET_CHOSEN_SHOWTIME,
  ADD_SEAT,
  DELETE_SEAT,
  SET_TICKET_TYPE,
  CLEAR_CHOSEN_SEATS,
  SET_USER,
  SET_RESERVATION,
  SET_CHOSEN_SEATS,
} from "./actions";

const Store = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setDay = (day) => {
    dispatch({
      type: SET_DAY,
      payload: day,
    });
  };

  const setMoviesMdb = (movies) => {
    dispatch({
      type: SET_MOVIES,
      payload: movies,
    });
  };

  const setChosenMovie = (movie) => {
    dispatch({
      type: SET_CHOSEN_MOVIE,
      payload: movie,
    });
  };

  const setAvailableShowTime = (showtimes) => {
    dispatch({
      type: SET_AVAILABLE_SHOWTIME,
      payload: showtimes,
    });
  };

  const setChosenShowTime = (showtime) => {
    dispatch({
      type: SET_CHOSEN_SHOWTIME,
      payload: showtime,
    });
  };

  const addSeat = (seat) => {
    dispatch({
      type: ADD_SEAT,
      payload: seat,
    });
  };

  const deleteSeat = (seat) => {
    dispatch({
      type: DELETE_SEAT,
      payload: seat,
    });
  };
  const setChosenSeats = (seats) => {
    dispatch({
      type: SET_CHOSEN_SEATS,
      payload: seats,
    });
  };
  // update it
  const selectTicketType = (seat, ticketType) => {
    dispatch({
      type: SET_TICKET_TYPE,
      payload: seat,
      ticketType,
    });
  };

  const clearSelectedSeats = () => {
    dispatch({
      type: CLEAR_CHOSEN_SEATS,
    });
  };

  const setUser = (user) => {
    dispatch({
      type: SET_USER,
      payload: user,
    });
  };

  const addReservation = (reservation) => {
    dispatch({
      type: SET_RESERVATION,
      payload: reservation,
    });
  };

  return (
    <AppContext.Provider
      value={{
        state,
        chosenDay: state.chosenDay,
        moviesMdb: state.moviesMdb,
        chosenMovie: state.chosenMovie,
        availableShowtime: state.availableShowtime,
        chosenShowtime: state.chosenShowtime,
        chosenSeats: state.chosenSeats,
        user: state.user,
        reservation: state.reservation,
        setDay,
        setChosenMovie,
        setMoviesMdb,
        setAvailableShowTime,
        setChosenShowTime,
        addSeat,
        deleteSeat,
        setChosenSeats,
        selectTicketType,
        clearSelectedSeats,
        setUser,
        addReservation,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default Store;
