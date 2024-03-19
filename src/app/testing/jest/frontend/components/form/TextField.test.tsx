import * as yup from "yup";
import { act, render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
// components
import { TextField } from "@/src/app/components";
import { USWDSForm } from "@/src/app/components/form/USWDSForm";

const fieldSchema = yup.object().shape({
  "field-name": yup.string(),
});

const mockOnSubmit = jest.fn();

const notRequiredTextField = (
  <USWDSForm
    initialValues={{ "field-name": "" }}
    validationSchema={fieldSchema}
    submit={mockOnSubmit}
  >
    <TextField label={"field-label"} required={false} name={"field-name"} />
  </USWDSForm>
);

const requiredTextField = (
  <USWDSForm
    initialValues={{ "field-name": "" }}
    validationSchema={fieldSchema}
    submit={mockOnSubmit}
  >
    <TextField label={"field-label"} required={true} name={"field-name"} />
  </USWDSForm>
);

describe("Test TextField", () => {
  test("TextField is visible", async () => {
    await act(async () => {
      await render(await notRequiredTextField);
    });
    expect(screen.getByText("field-label")).toBeVisible();
  });

  test("TextField required star is visible", async () => {
    await act(async () => {
      await render(await requiredTextField);
    });
    expect(screen.getByText("*")).toBeVisible();
  });
});

describe("Test TextField accessibility", () => {
  it("Should not have basic accessibility issues", async () => {
    await act(async () => {
      const { container } = render(requiredTextField);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
