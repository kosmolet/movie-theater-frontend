import ticketPrices from "../config/TicketPrices";

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

const reducer = (state, action) => {
  const getSeatIndex = () => {
    const { row } = action.payload;
    const { seat } = action.payload;

    return state.chosenSeats.findIndex(
      (item) => item.row === row && item.seat === seat
    );
  };

  switch (action.type) {
    case SET_DAY:
      return { ...state, chosenDay: action.payload };

    case SET_DATES:
      return { ...state, dates: action.payload };

    case SET_CHOSEN_MOVIE:
      return { ...state, chosenMovie: action.payload };

    case SET_MOVIES:
      return { ...state, moviesMongo: [...state.moviesMongo, action.payload] };

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

    case SET_TICKET_TYPE:
      // eslint-disable-next-line no-case-declarations
      const newSeat = {
        ...state.chosenSeats[getSeatIndex()],
        ticketType: action.payload.ticketType,
        price: ticketPrices.get(action.payload.ticketType),
      };
      return {
        ...state,
        chosenSeats: [
          ...state.chosenSeats.slice(0, getSeatIndex()),
          newSeat,
          ...state.chosenSeats.slice(getSeatIndex() + 1),
        ],
      };

    case CLEAR_CHOSEN_SEATS:
      return { ...state, chosenSeats: [] };

    case SET_USER:
      return { ...state, user: action.payload };

    default:
      return state;
  }
};

export default reducer;
