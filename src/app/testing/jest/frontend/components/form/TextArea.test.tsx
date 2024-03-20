import * as yup from "yup";
import { act, render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
// components
import { TextArea } from "@/src/app/components";
import { USWDSForm } from "@/src/app/components/form/USWDSForm";

const fieldSchema = yup.object().shape({
  "field-name": yup.string(),
});

const mockOnSubmit = jest.fn();

const notRequiredTextArea = (
  <USWDSForm
    initialValues={{ "field-name": "" }}
    validationSchema={fieldSchema}
    submit={mockOnSubmit}
  >
    <TextArea label={"field-label"} name={"field-name"} />
  </USWDSForm>
);

describe("Test TextArea", () => {
  test("TextArea is visible", async () => {
    await act(async () => {
      await render(await notRequiredTextArea);
    });
    expect(screen.getByText("field-label")).toBeVisible();
  });
});

describe("Test TextArea accessibility", () => {
  it("Should not have basic accessibility issues", async () => {
    await act(async () => {
      const { container } = render(notRequiredTextArea);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
