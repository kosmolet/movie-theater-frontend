import React from "react";
import { render } from "@testing-library/react";
import MovieRow from "../MovieRow";

describe("MoviewRow testing", () => {
  let getByTestId;
  beforeEach(() => {
    ({ getByTestId } = render(<MovieRow title="Family" movies={[]} />));
  });

  test("renders title", async () => {
    const title = getByTestId("movie-row-title");
    expect(title.innerHTML).toBe("Family");
  });
});
