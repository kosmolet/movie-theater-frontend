import React from "react";
import "./SeatBox.css";

const SeatBox = ({ seatNumber, selectSeat }) => {
  return (
    <div
      className="seat"
      onClick={() => selectSeat(seatNumber)}
      onKeyPress={() => selectSeat(seatNumber)}
      role="button"
      tabIndex="0"
    >
      {seatNumber}
    </div>
  );
};

export default SeatBox;
