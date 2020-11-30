import React from "react";
import { render, act, waitFor, fireEvent } from "@testing-library/react";
import MovieCard from "../MovieCard";

describe("MoviewCard testing", () => {
  let getByTestId;
  const movie = {
    title: "Spell",
    overview:
      "A father survives a plane crash in rural Appalachia, but becomes suspicious of the elderly couple who take him in to nurse him back to health with the ancient remedies.",
    popularity: 117,
    poster_path: "/4rjHhj1BAREc9zNFU8FheLJQdFf.jpg",
    backdrop_path: "/5gllGAa3c9UqeRI8r6GXiQJIEtp.jpg",
    runtime: 91,
    genres: ["Thriller ", "Horror"],
    release_date: "2020-10-30",
    tmdb_id: 621151,
    status: "Released",
  };

  beforeEach(() => {
    ({ getByTestId } = render(<MovieCard movie={{ movie }} />));
  });

  test("renders title", async () => {
    const element = getByTestId("movie-card");
    expect(element.innerHTML).toBe("<p>no poster</p>");
  });
});
