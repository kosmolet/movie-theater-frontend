import React from "react";
import "./Ticket.css";

const Ticket = () => {
  return (
    <div>
      <div className="ticket-wrapper">
        <div className="ticket cardLeft">
          <h1>
            Moviestad
            <span>Cinema</span>
          </h1>
          <div className="title">
            <h4>Frozen 3</h4>
            <span>movie</span>
          </div>
          <div className="name">
            <h4>Buyer Name</h4>
            <span>name</span>
          </div>
          <div className="seat">
            <h2>11</h2>
            <span>seat</span>
          </div>
          <div className="time">
            <h2>12:00</h2>
            <span>time</span>
          </div>
        </div>
        <div className="ticket cardRight">
          <div className="eye"> </div>
          <div className="number">
            <h3>156</h3>
            <span>seat</span>
          </div>
          <div className="barcode"> </div>
        </div>
      </div>
    </div>
  );
};

export default Ticket;
