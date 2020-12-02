import React, { Suspense } from "react";
import { render, act, waitFor, fireEvent } from "@testing-library/react";
import { WithProvider } from "../../mockTestData/data";
import Home from "../Home";

async function renderWrapper() {
  let component;

  act(() => {
    component = render(
      <WithProvider>
        <Home path="/" />
      </WithProvider>
    );
  });

  return component;
}

describe("home testing", () => {
  test("home-page renders", async () => {
    const { getByTestId } = await renderWrapper();
    const element = await waitFor(() => getByTestId("home-page"));
    expect(element).toBeInTheDocument();
  });
});
