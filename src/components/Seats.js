/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import styled from "styled-components";

const StyledSeat = styled.div`
  background-color: ${(props) => props.inputColor || "#3C3C3C"};
  width: 100%;
  height: 100%;
  border-radius: 15%;
  transition: 0.3s ease transform;
  :hover {
    cursor: pointer;
    transform: scale(0.95);
  }
`;

const Seats = () => {
  // const [isTacken, setTaken] = useState(false);

  return (
    <div className="seats">
      <h1>hej</h1>
      <StyledSeat inputColor="#cacaca" />
      <StyledSeat inputColor="#cacaca" />
      <StyledSeat inputColor="#cacaca" />
    </div>
  );
};

export default Seats;
