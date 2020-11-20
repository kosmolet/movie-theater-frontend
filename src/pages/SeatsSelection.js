/* eslint-disable consistent-return */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/self-closing-comp */
import React, { useState, useEffect, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";
import AppContext from "../context/context";
import "./SeatsSelection.css";
import SeatItem from "../components/SeatItem";
import SeatBox from "../components/SeatBox";

const SeatsSelection = () => {
  const {
    state,
    chosenMovie,
    clearSelectedSeats,
    chosenSeats,
    setChosenSeats,
    setChosenShowTime,
  } = useContext(AppContext);
  const [selectedSeats, changeSelectedSeats] = useState([]);
  const [seatsLimit, setLimit] = useState(false);

  const handleSelectSeat = (seatNumber) => {
    if (selectedSeats.includes(seatNumber)) {
      const allSelected = selectedSeats.filter((seat) => seat !== seatNumber);
      changeSelectedSeats(allSelected);
      setLimit(false);
    } else if (selectedSeats.length === 5) {
      setLimit(true);
    } else {
      const allSelected = [...selectedSeats, seatNumber];
      changeSelectedSeats(allSelected);
    }
  };
  const renderCinemaHall = () => {
    let cinemaHall = [];
    let isSelect;

    for (let i = 1; i <= 25; i += 1) {
      if (selectedSeats.includes(i)) {
        isSelect = true;
      } else {
        isSelect = false;
      }

      cinemaHall = [
        ...cinemaHall,
        <SeatItem
          key={uuidv4()}
          seatNumber={i}
          isSelect={isSelect}
          selectSeat={handleSelectSeat}
        />,
      ];
    }
    return cinemaHall;
  };

  useEffect(() => {
    setChosenSeats(selectedSeats);
  }, [selectedSeats]);

  return (
    <div className="booking-wrapper">
      <div>
        <h3>{chosenMovie.title}</h3>
      </div>
      <div className="screen"></div>
      <div className="cinema-hall-wrapper">{renderCinemaHall()}</div>
      <Link to="/payment">
        <button type="button">checkout</button>
      </Link>

      <h3>
        Selected Seats:
        <br />
        {selectedSeats.map((i) => (
          <SeatBox
            key={uuidv4()}
            seatNumber={i}
            selectSeat={handleSelectSeat}
          />
        ))}
      </h3>
      {console.log("STORE SeatsSelection", state)}
    </div>
  );
};

export default SeatsSelection;
