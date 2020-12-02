import React, { Suspense } from "react";
import { render, act, waitFor, fireEvent } from "@testing-library/react";
import { WithProvider } from "../../mockTestData/data";
import SeatsSelection from "../SeatsSelection";

async function renderWrapper() {
  let component;

  act(() => {
    component = render(
      <WithProvider>
        <SeatsSelection path="/" />
      </WithProvider>
    );
  });

  return component;
}

describe("SeatsSelection testing", () => {
  test("SeatsSelection renders", async () => {
    const { getByTestId } = await renderWrapper();
    const element = await waitFor(() => getByTestId("seatselection-page"));
    expect(element).toBeInTheDocument();
  });
});
