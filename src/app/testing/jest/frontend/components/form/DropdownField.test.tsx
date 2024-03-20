import * as yup from "yup";
import { act, render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
// components
import { DropdownField } from "@/src/app/components";
import { USWDSForm } from "@/src/app/components/form/USWDSForm";
// types
import { stateOptions } from "@/src/app/types";

const fieldSchema = yup.object().shape({
  "state-name": yup.string(),
});

const mockOnSubmit = jest.fn();

const notRequiredDropdownField = (
  <USWDSForm
    initialValues={{ "field-name": "" }}
    validationSchema={fieldSchema}
    submit={mockOnSubmit}
  >
    <DropdownField
      id={"field-id"}
      label={"field-label"}
      name={"field-name"}
      options={stateOptions}
    />
  </USWDSForm>
);

describe("Test DropdownField", () => {
  test("DropdownField is visible", async () => {
    await act(async () => {
      await render(await notRequiredDropdownField);
    });
    expect(screen.getByText("field-label")).toBeVisible();
  });
});

describe("Test DropdownField accessibility", () => {
  it("Should not have basic accessibility issues", async () => {
    await act(async () => {
      const { container } = render(notRequiredDropdownField);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
