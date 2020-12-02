import React, { Suspense } from "react";
import { render, act, waitFor, fireEvent } from "@testing-library/react";
import { WithProvider } from "../../mockTestData/data";
import PaymentSession from "../PaymentSession";

async function renderWrapper() {
  let component;

  act(() => {
    component = render(
      <WithProvider>
        <PaymentSession path="/" />
      </WithProvider>
    );
  });

  return component;
}

describe("PaymentSession testing", () => {
  test("PaymentSession renders", async () => {
    const { getByTestId } = await renderWrapper();
    const element = await waitFor(() => getByTestId("payment-session"));
    expect(element).toBeInTheDocument();
  });
});
