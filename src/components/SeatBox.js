import React from "react";
import "./SeatBox.css";

const SeatBox = ({ seatNumber, isSelect, selectSeat }) => {
  const selected = {
    color: "#f37474",
    borderColor: "#f37474",
  };

  return (
    <div
      className="seat"
      onClick={() => selectSeat(seatNumber)}
      onKeyPress={() => selectSeat(seatNumber)}
      role="button"
      tabIndex="0"
      style={isSelect ? selected : null}
    >
      {seatNumber}
    </div>
  );
};

export default SeatBox;
