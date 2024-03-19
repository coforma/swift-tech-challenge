import { TextArea } from "@/src/app/components";
import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";

const mockRegister = jest.fn();

const notRequiredTextArea = (
  <TextArea
    id={"field-id"}
    label={"field-label"}
    required={false}
    name={"field-name"}
    registerField={mockRegister}
  />
);

const requiredTextArea = (
  <TextArea
    id={"field-id"}
    label={"field-label"}
    required={true}
    name={"field-name"}
    registerField={mockRegister}
  />
);

const textAreaWithHint = (
  <TextArea
    id={"field-id"}
    label={"field-label"}
    required={false}
    name={"field-name"}
    hint={{ id: "field-id", text: "This is a hint" }}
    registerField={mockRegister}
  />
);

describe.skip("Test TextArea", () => {
  test("TextArea is visible", () => {
    render(notRequiredTextArea);
    expect(screen.getByText("field-label")).toBeVisible();
  });

  test("TextArea required star is visible", () => {
    render(requiredTextArea);
    expect(screen.getByText("field-label *")).toBeVisible();
  });
  test("TextArea hint is visible", () => {
    render(textAreaWithHint);
    expect(screen.getByText("This is a hint")).toBeVisible();
  });

  test("TextArea is registered", () => {
    render(notRequiredTextArea);
    expect(mockRegister).toHaveBeenCalled();
  });
});

describe.skip("Test TextArea accessibility", () => {
  it("Should not have basic accessibility issues", async () => {
    const { container } = render(notRequiredTextArea);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
