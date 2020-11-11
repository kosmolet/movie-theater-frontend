import React from "react";
import styled from "styled-components";

const StyledSeat = styled.div`
  background-color: black;
  width: 100%;
  height: 100%;
  pading: 100px;
  border-radius: 15%;
  transition: 0.3s ease transform;
  :hover {
    cursor: pointer;
    transform: scale(0.95);
  }
`;
const Seat = () => {
  const onClick = () => {
    console.log("onclick");
  };
  return (
    <div>
      <h1>sadasd</h1>
      <StyledSeat onClick={onClick()} />
      <StyledSeat inputColor="#f8b500" onClick={onClick()} />
      <StyledSeat inputColor="#cacaca" />
      <h1>3434</h1>
    </div>
  );
};
export default Seat;
