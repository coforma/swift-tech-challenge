import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import ErrorPage from "@/src/app/error/page";
import { act } from "react-dom/test-utils";

describe("Test Error Page", () => {
  test("Check that page renders", () => {
    render(<ErrorPage />);
    expect(screen.getByText("There was an error")).toBeVisible();
    expect(
      screen.getByRole("link", { name: "Visit homepage" }),
    ).toHaveAttribute("href", "/");
  });
});

describe("Test Error page accessibility", () => {
  it("Should not have basic accessibility issues", async () => {
    const { container } = render(<ErrorPage />);
    await act(async () => {
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
