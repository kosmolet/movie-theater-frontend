import {
  SET_DAY,
  SET_MOVIES,
  SET_CHOSEN_MOVIE,
  SET_AVAILABLE_SHOWTIME,
  SET_CHOSEN_SHOWTIME,
  ADD_SEAT,
  DELETE_SEAT,
  SET_CHOSEN_SEATS,
  CLEAR_CHOSEN_SEATS,
  SET_USER,
  SET_RESERVATION,
} from "./actions";

const reducer = (state, action) => {
  const getSeatIndex = () => {
    const seat = action.payload;
    return state.chosenSeats.indexOf(seat);
  };

  switch (action.type) {
    case SET_DAY:
      return { ...state, chosenDay: action.payload };
    case SET_MOVIES:
      return { ...state, moviesMdb: action.payload };
    case SET_CHOSEN_MOVIE:
      return { ...state, chosenMovie: action.payload };
    case SET_AVAILABLE_SHOWTIME:
      return { ...state, availableShowtime: action.payload };
    case SET_CHOSEN_SHOWTIME:
      return { ...state, chosenShowtime: action.payload };

    case ADD_SEAT:
      return { ...state, chosenSeats: [...state.chosenSeats, action.payload] };

    case DELETE_SEAT:
      return {
        ...state,
        chosenSeats: [
          ...state.chosenSeats.slice(0, getSeatIndex()),
          ...state.chosenSeats.slice(getSeatIndex() + 1),
        ],
      };
    case SET_CHOSEN_SEATS:
      return { ...state, chosenSeats: action.payload };

    case CLEAR_CHOSEN_SEATS:
      return { ...state, chosenSeats: [] };

    case SET_USER:
      return { ...state, user: action.payload };

    case SET_RESERVATION:
      return { ...state, reservation: action.payload };

    default:
      return state;
  }
};

export default reducer;
