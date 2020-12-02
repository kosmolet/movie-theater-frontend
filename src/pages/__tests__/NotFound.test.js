import React, { Suspense } from "react";
import { render, act, waitFor, fireEvent } from "@testing-library/react";
import { WithProvider } from "../../mockTestData/data";
import NotFound from "../NotFound";

async function renderWrapper() {
  let component;

  act(() => {
    component = render(
      <WithProvider>
        <NotFound path="/" />
      </WithProvider>
    );
  });

  return component;
}

describe("NotFound testing", () => {
  test("NotFound renders", async () => {
    const { getByTestId } = await renderWrapper();
    const element = await waitFor(() => getByTestId("notfound-page"));
    expect(element).toBeInTheDocument();
  });
});
