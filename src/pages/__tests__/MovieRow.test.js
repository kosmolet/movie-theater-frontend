import React from "react";
import { render } from "@testing-library/react";
import MovieRow from "../MovieRow";

describe("MoviewRow testing", () => {
  let getByTestId;
  beforeEach(() => {
    ({ getByTestId } = render(<MovieRow />));
  });

  test("renders title", async () => {
    const title = getByTestId("test");
    expect(title.innerHTML).toBe("");
  });
});
