import React, { useReducer } from "react";
import AppContext from "./context";
import reducer from "./reducer";
import initialState from "./state";

import {
  SET_MOVIES,
  SET_CHOSEN_MOVIE,
  SET_DAY,
  SET_DATES,
  ADD_SEAT,
  DELETE_SEAT,
  SET_TICKET_TYPE,
  CLEAR_CHOSEN_SEATS,
  SET_USER,
} from "./actions";

const Store = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addMovies = (moviesMongo) => {
    dispatch({
      type: SET_MOVIES,
      payload: moviesMongo,
    });
  };

  return (
    <AppContext.Provider
      value={{ moviesMongo: state.moviesMongo, state, addMovies }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default Store;
