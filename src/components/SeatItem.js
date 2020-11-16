import React, { useState } from "react";
import styled from "styled-components";
import empty from "../assets/emptychair.png";
import taken from "../assets/unavailablechair.png";
import chosen from "../assets/selectedchair.png";

const Seat = styled.div`
  width: 25px;
  height: 25px;
  background: url(${empty}) no-repeat center center;
  background-size: cover;
  margin-left: 24px;
  cursor: pointer;
  &:hover {
    background: url(${chosen}) no-repeat center center;
    background-size: cover;
  }
  &.taken {
    background: url(${taken}) no-repeat center center;
    background-size: cover;
    cursor: default;
    /* &:hover {
     background: url(${taken}) no-repeat center center cover;
    } */
  }
  &.chosen {
    background: url(${chosen}) no-repeat center center;
    background-size: cover;
  }
`;

const SeatItem = ({ seatNumber, isSelect, selectSeat }) => {
  const [isTaken, setSeatTacken] = useState(false);

  return (
    <Seat
      className={(isTaken && "taken") || (isSelect && "chosen")}
      onClick={() => selectSeat(seatNumber)}
      onKeyPress={() => selectSeat(seatNumber)}
      role="button"
      tabIndex="0"
    />
  );
};
export default SeatItem;
