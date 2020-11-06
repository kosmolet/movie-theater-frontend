/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useReducer } from "react";
// export const initialState = {
//   loading: true,
//   movies: [],
//   errorMessage: null,
// };

// export const reducer = (state, action) => {
//   switch (action.type) {
//     case "SEARCH_MOVIES_SUCCESS":
//       return {
//         loading: false,
//         movies: action.payload,
//         errorMessage: null,
//       };
//     default:
//       return state;
//   }
// };
const dataFetchReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_INIT":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case "FETCH_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };
    case "FETCH_FAILURE":
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    default:
      throw new Error();
  }
};

export default dataFetchReducer;
