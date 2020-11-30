import React from "react";
import "./Ticket.css";

const Ticket = ({ orderDetails }) => {
  return (
    <div className="ticket-wrapper">
      <div className="ticket cardLeft">
        <h1>Moviestaden Cinema</h1>
        <div className="title">
          <span>{`Movie: ${orderDetails?.movie}`}</span>
        </div>
        <div className="title">
          <span>{`${orderDetails?.hall}`}</span>
        </div>

        <div className="seat1">
          <span>{`Seats: ${orderDetails?.seats.toString()}`}</span>
        </div>
        <div className="time">
          <span>{`Time: ${orderDetails?.date} ${orderDetails?.time}`}</span>
        </div>
      </div>
      <div className="ticket cardRight">
        <div className="barcode"> </div>
        <div className="number">
          <h3>{orderDetails?.seats.toString()}</h3>
          <span>seats</span>
        </div>
      </div>
    </div>
  );
};

export default Ticket;
