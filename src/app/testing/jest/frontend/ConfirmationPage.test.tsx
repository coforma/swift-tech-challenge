import Page from "@/src/app/[id]/apply/confirmation/page";
import { act, render, screen } from "@testing-library/react";
import { axe } from "jest-axe";

const ConfirmationPage = Page({ params: { id: "123" } });

describe("Test Confirmation Page", () => {
  it("should render the confirmation page", async () => {
    render(ConfirmationPage);
    expect(
      screen.getByText("Successfully completed application for 123"),
    ).toBeVisible();
  });
});

describe("Test Homepage accessibility", () => {
  it("Should not have basic accessibility issues", async () => {
    await act(async () => {
      const { container } = render(ConfirmationPage);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
