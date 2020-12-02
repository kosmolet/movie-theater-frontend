import React, { Suspense } from "react";
import { render, act, waitFor, fireEvent } from "@testing-library/react";
import { WithProvider } from "../../mockTestData/data";
import Success from "../Success";

async function renderWrapper() {
  let component;

  act(() => {
    component = render(
      <WithProvider>
        <Success path="/" />
      </WithProvider>
    );
  });

  return component;
}

describe("Success testing", () => {
  test("Success renders", async () => {
    const { getByTestId } = await renderWrapper();
    const element = await waitFor(() => getByTestId("success-page"));
    expect(element).toBeInTheDocument();
  });
});
