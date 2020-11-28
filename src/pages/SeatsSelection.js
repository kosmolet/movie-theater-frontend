import React, { useState, useEffect, useContext } from "react";
import { useTranslation } from "react-i18next";
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
  const { chosenMovie, chosenShowtime, setChosenSeats } = useContext(
    AppContext
  );
  const [selectedSeats, changeSelectedSeats] = useState([]);
  const [seatsLimit, setLimit] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [tacken, setTacken] = useState([]);
  const [time, setTime] = useState("");
  const [dmTime, setDateTime] = useState("");
  const { t } = useTranslation();

  const dayOfWeek = (dateStr) => {
    const date = new Date(dateStr);
    const dayIndex = date.getDay() === 0 ? 6 : date.getDay() - 1;
    const day = days[dayIndex];
    return day;
  };

  const findReservedAndUnavailableSeats = () => {
    let seats = [];
    const { reservations } = chosenShowtime;
    if (reservations) {
      reservations.forEach((res) => {
        seats = seats.concat(res.seats);
      });
      seats = seats.concat(chosenShowtime.unavailableSeats);
      seats = [...new Set(seats)];
      setTacken(seats);
    }
  };

  const handleSelectSeat = (seatNumber) => {
    if (selectedSeats.includes(seatNumber)) {
      const allSelected = selectedSeats.filter((seat) => seat !== seatNumber);
      changeSelectedSeats(allSelected);
      setLimit(false);
    } else if (selectedSeats.length === 5) {
      setLimit(true);
    } else if (tacken.includes(seatNumber)) {
      setLimit(true);
      setTacken(tacken.concat(seatNumber));
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
          takenS={tacken.includes(i)}
        />,
      ];
    }
    return cinemaHall;
  };

  useEffect(() => {
    setChosenSeats(selectedSeats);
    findReservedAndUnavailableSeats();
    setDisabled(!(selectedSeats.length > 0 && chosenShowtime.startAt));
    renderCinemaHall();
  }, [selectedSeats]);

  useEffect(() => {
    if (chosenShowtime.startAt) {
      setTime(`${chosenShowtime?.startAt.slice(11, 16)} 
      ${dayOfWeek(chosenShowtime?.startAt)}`);
      setDateTime(`${chosenShowtime?.startAt.slice(8, 10)}
      ${month[chosenShowtime?.startAt.slice(5, 7) - 1]}`);
      findReservedAndUnavailableSeats();
    } else {
      setDisabled(true);
    }
  }, [chosenShowtime]);

  return (
    <div className="content-wrapper">
      <header
        className="banner"
        style={{
          backgroundImage: `url(
                    "https://image.tmdb.org/t/p/original/${chosenMovie?.backdrop_path}"
                )`,
          backgroundSize: "cover",
          opacity: "0.2",
          backgroundPosition: "center center",
        }}
      />
      <div className="banner-shadow"> </div>
      {console.log(chosenShowtime)}
      <div className="cinema-wrapper">
        <div className="cinema-seats-movie">
          <img
            className="img-seats"
            src={`${IMAGE_BASE_URL}w342${chosenMovie?.poster_path}`}
            alt={`${chosenMovie.title} poster`}
          />
          <h4 className="title-seats">{chosenMovie?.title}</h4>
          <h6 className="time-seats">{time}</h6>
          <h6 className="time-seats">{dmTime}</h6>
        </div>

        <div className="cinema-seats-hall">
          <div className="screen" />
          <h6 className="title-hall">{chosenShowtime?.hallName}</h6>
          <div className="cinema-hall-wrapper">{renderCinemaHall()}</div>
          <h3 className="selected-seats-title">{t("seatsSelected")}</h3>
          <span>
            {selectedSeats.map((i) => (
              <SeatBox
                key={uuidv4()}
                seatNumber={i}
                selectSeat={handleSelectSeat}
              />
            ))}
          </span>
          <Link to="/paymentsession">
            <button type="button" className="pay-button" disabled={disabled}>
              {t("proceedToPayment")}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SeatsSelection;
