import React, { Suspense } from "react";
import { render, act, waitFor, fireEvent } from "@testing-library/react";
import { WithProvider } from "../../mockTestData/data";
import Failure from "../Failure";

async function renderWrapper() {
  let component;

  act(() => {
    component = render(
      <WithProvider>
        <Failure path="/" />
      </WithProvider>
    );
  });

  return component;
}

describe("Failure testing", () => {
  test("Failure renders", async () => {
    const { getByTestId } = await renderWrapper();
    const element = await waitFor(() => getByTestId("failure-page"));
    expect(element).toBeInTheDocument();
  });
});
