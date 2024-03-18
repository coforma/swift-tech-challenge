import ConfirmationPage from "@/src/app/[id]/apply/confirmation/page";
import {
  InstitutionContext,
  InstitutionContextShape,
} from "@/src/app/components/institutions/InstitutionProvider";
import { act, render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { mockCollege } from "../setupJest";

const testParams = {
  id: 0,
};

const testContext: InstitutionContextShape = { institutionData: [mockCollege] };

const testConfirmationPageComponent = () => (
  <InstitutionContext.Provider value={testContext}>
    <ConfirmationPage params={testParams} />
  </InstitutionContext.Provider>
);

describe("Test Confirmation Page", () => {
  it("should render the confirmation page", async () => {
    render(testConfirmationPageComponent());
    expect(screen.getByText("Application submitted")).toBeVisible();
    expect(screen.getByText("Name of school")).toBeVisible();
    expect(
      screen.getByText(
        "You should receive an email confirmation from the school.",
      ),
    ).toBeVisible();
  });
});

describe("Test Homepage accessibility", () => {
  it("Should not have basic accessibility issues", async () => {
    await act(async () => {
      const { container } = render(testConfirmationPageComponent());
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
