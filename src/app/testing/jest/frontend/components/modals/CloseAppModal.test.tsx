import { render, screen } from "@testing-library/react";
import { CloseAppModal } from "@/src/app/components";

const mockCloseHandler = jest.fn();

const testCloseAppModalComponent = () => (
  <CloseAppModal closeHandler={mockCloseHandler} />
);

describe("test CloseAppModal", () => {
  it("renders", () => {
    render(testCloseAppModalComponent());
    expect(
      screen.getByText("Are you sure you want to close the application?"),
    ).toBeVisible();
    expect(
      screen.getByRole("link", { name: "Close application" }),
    ).toHaveAttribute("href", "/");
  });
});
