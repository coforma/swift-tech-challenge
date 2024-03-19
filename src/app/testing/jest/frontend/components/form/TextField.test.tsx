import { TextField } from "@/src/app/components";
import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";

const mockRegister = jest.fn();

const notRequiredTextField = (
  <TextField
    id={"field-id"}
    label={"field-label"}
    required={false}
    name={"field-name"}
    registerField={mockRegister}
  />
);

const requiredTextField = (
  <TextField
    id={"field-id"}
    label={"field-label"}
    required={true}
    name={"field-name"}
    registerField={mockRegister}
  />
);

const textFieldWithHint = (
  <TextField
    id={"field-id"}
    label={"field-label"}
    required={false}
    name={"field-name"}
    hint={{ id: "field-id", text: "This is a hint" }}
    registerField={mockRegister}
  />
);

describe("Test TextField", () => {
  test("TextField is visible", () => {
    render(notRequiredTextField);
    expect(screen.getByText("field-label")).toBeVisible();
  });

  test("TextField required star is visible", () => {
    render(requiredTextField);
    expect(screen.getByText("*")).toBeVisible();
  });
  test("TextField hint is visible", () => {
    render(textFieldWithHint);
    expect(screen.getByText("This is a hint")).toBeVisible();
  });

  test("TextField is registered", () => {
    render(notRequiredTextField);
    expect(mockRegister).toHaveBeenCalled();
  });
});

describe("Test TextField accessibility", () => {
  it("Should not have basic accessibility issues", async () => {
    const { container } = render(notRequiredTextField);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
