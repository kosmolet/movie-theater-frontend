/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState, useEffect, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";
import AppContext from "../context/context";
import "./SeatsSelection.css";
import SeatItem from "../components/SeatItem";
import SeatBox from "../components/SeatBox";
import { IMAGE_BASE_URL } from "../config";
import month from "../config/DaysOfMonth";
import days from "../config/WeekDays";

const SeatsSelection = () => {
  const { state, chosenMovie, chosenShowtime, setChosenSeats } = useContext(
    AppContext
  );
  const [selectedSeats, changeSelectedSeats] = useState([]);
  const [seatsLimit, setLimit] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [tacken, setTacken] = useState([]);
  const [time, setTime] = useState("");
  const [dmTime, setDateTime] = useState("");

  const dayOfWeek = (dateStr) => {
    const date = new Date(dateStr);
    const dayIndex = date.getDay() === 0 ? 6 : date.getDay() - 1;
    const day = days[dayIndex];
    return day;
  };

  const handleSelectSeat = (seatNumber) => {
    if (selectedSeats.includes(seatNumber)) {
      const allSelected = selectedSeats.filter((seat) => seat !== seatNumber);
      changeSelectedSeats(allSelected);
      setLimit(false);
    } else if (selectedSeats.length === 5) {
      setLimit(true);
    } else if (
      chosenShowtime.unavailableSeats &&
      chosenShowtime.unavailableSeats.includes(seatNumber)
    ) {
      setLimit(true);
      setTacken(tacken.concat(seatNumber));
    } else {
      const allSelected = [...selectedSeats, seatNumber];
      changeSelectedSeats(allSelected);
    }
  };

  const handleTakenSeats = () => {
    for (let i = 1; i <= 25; i += 1) {
      if (
        chosenShowtime.unavailableSeats &&
        chosenShowtime.unavailableSeats.includes(i)
      ) {
        setTacken(tacken.concat(i));
      }
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
          takenS={
            chosenShowtime.unavailableSeats &&
            chosenShowtime.unavailableSeats.includes(i)
          }
        />,
      ];
    }
    return cinemaHall;
  };

  useEffect(() => {
    setChosenSeats(selectedSeats);
    handleTakenSeats();
    setDisabled(!(selectedSeats.length > 0 && chosenShowtime.startAt));
    renderCinemaHall();
  }, [selectedSeats]);

  useEffect(() => {
    if (chosenShowtime.startAt !== undefined) {
      setTime(`${chosenShowtime?.startAt.slice(11, 16)} 
      ${dayOfWeek(chosenShowtime?.startAt)}`);
      setDateTime(`${chosenShowtime?.startAt.slice(8, 10)}
      ${month[chosenShowtime?.startAt.slice(5, 7) - 1]}`);
    } else {
      setDisabled(true);
    }
  }, [chosenShowtime]);

  return (
    <div className="content-wrapper">
      {console.log(chosenShowtime)}
      <div className="cinema-wrapper">
        <div className="screen" />
        <h6 className="title-hall">{chosenShowtime?.hallName}</h6>
        <div className="movie-on-seats">
          <h4 className="title-seats">{chosenMovie?.title}</h4>
          <img
            className="img-seats"
            src={`${IMAGE_BASE_URL}w185${chosenMovie?.poster_path}`}
            alt={`${chosenMovie.title} poster`}
          />
          <h6 className="time-seats">{time}</h6>
          <h6 className="time-seats">{dmTime}</h6>
        </div>
        <div className="cinema-hall-wrapper">{renderCinemaHall()}</div>
        <h3>Selected Seats:</h3>
        <span>
          {selectedSeats.map((i) => (
            <SeatBox
              key={uuidv4()}
              seatNumber={i}
              selectSeat={handleSelectSeat}
            />
          ))}
        </span>
        <Link to="/payment">
          <button type="button" className="pay-button" disabled={disabled}>
            Pay
          </button>
        </Link>
      </div>
    </div>
  );
};

export default SeatsSelection;
