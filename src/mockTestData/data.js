import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18nForTests";
import Store from "../context/store";

export const getTestStore = () => {
  return {
    dispatch: () => {},
    state: {
      moviesMdb: [
        {
          title: "Spell",
          overview: "A father survives a plane crash in rural Appalachia..",
          popularity: 117,
          poster_path: "/4rjHhj1BAREc9zNFU8FheLJQdFf.jpg",
          backdrop_path: "/5gllGAa3c9UqeRI8r6GXiQJIEtp.jpg",
          runtime: 91,
          genres: ["Thriller ", "Horror"],
          release_date: "2020-10-30",
          tmdb_id: 621151,
          status: "Released",
        },
        {
          title: "Dune",
          overview: "Paul Atreides, a brilliant and gifted young man born",
          poster_path: "/9HNZTw2D3cM1yA08FF5SeWEO9eX.jpg",
          backdrop_path: "/wP0X5iQrlt7ojPmWouYPfy8AQtx.jpg",
          runtime: 101,
          genres: ["Action", "Adventure", "Science Fiction"],
          release_date: "2020-11-11",
          tmdb_id: 438631,
          status: "Released",
        },
      ],
      chosenMovie: {
        backdrop_path: "/yHtB4KHNigx3ZoxDvQbW2SOXGfq.jpg",
        createdAt: "2020-11-21T14:51:54.958Z",
        genres: ["Fantasy", "Family", "Adventure"],
        overview: "overwiew x",
        popularity: 140,
        poster_path: "/ehAKuE48okTuonq6TpsNQj8vFTC.jpg",
        release_date: "2020-10-26T00:00:00.000Z",
        runtime: 103,
        showtimes: [
          {
            city: "Stockholm",
            createdAt: "2020-11-22T03:52:34.777Z",
            endAt: "2020-12-07T18:30:00.000Z",
            hallName: "Stockholm Cinema Hall",
            movie: "5fb9298af4299e6edcaaa4da",
            reservations: [
              "5fc1ab6cb2dee51facded09b",
              "5fc1b62fab062f1c4c9b466b",
              "5fc1df23c6972808e05339b0",
            ],
            startAt: "2020-12-07T16:30:00.000Z",
            ticketPrice: 20,
            unavailableSeats: [15],
            updatedAt: "2020-11-28T05:24:51.349Z",
            _id: "5fb9e082dbbcf7683c5a5234",
          },
        ],
        status: "Released",
        title: "Wolfwalkers",
        tmdb_id: 441130,
        updatedAt: "2020-11-29T22:35:27.820Z",
        _id: "5fb9298af4299e6edcaaa4da",
      },
      availableShowtime: [
        {
          city: "Stockholm",
          createdAt: "2020-11-22T03:52:34.777Z",
          endAt: "2020-12-07T18:30:00.000Z",
          hallName: "Stockholm Cinema Hall",
          movie: "5fb9298af4299e6edcaaa4da",
          reservations: [
            "5fc1ab6cb2dee51facded09b",
            "5fc1b62fab062f1c4c9b466b",
            "5fc1df23c6972808e05339b0",
          ],
          startAt: "2020-12-07T16:30:00.000Z",
          ticketPrice: 20,
          unavailableSeats: [15],
          updatedAt: "2020-11-28T05:24:51.349Z",
          _id: "5fb9e082dbbcf7683c5a5234",
        },
      ],
      chosenShowtime: {
        city: "Stockholm",
        createdAt: "2020-11-22T03:52:34.777Z",
        endAt: "2020-12-07T18:30:00.000Z",
        hallName: "Stockholm Cinema Hall",
        movie: "5fb9298af4299e6edcaaa4da",
        reservations: [],
        startAt: "2020-12-07T16:30:00.000Z",
        ticketPrice: 20,
        unavailableSeats: [15],
        updatedAt: "2020-11-28T05:24:51.349Z",
        _id: "5fb9e082dbbcf7683c5a5234",
      },
      chosenSeats: [13, 14],
    },
  };
};

export const WithProvider = (props) => {
  return (
    <Store>
      <I18nextProvider i18n={i18n}>
        <Router>{props.children}</Router>
      </I18nextProvider>
    </Store>
  );
};
