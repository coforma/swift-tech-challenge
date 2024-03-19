import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import InstitutionDetails from "@/src/app/[id]/page";
import { InstitutionContext } from "@/src/app/components";
import { InstitutionContextShape } from "@/src/app/components/institutions/InstitutionProvider";
import { mockCollege } from "../setupJest";
import { act } from "react-dom/test-utils";

const testParams = {
  id: 0,
};

const testContext: InstitutionContextShape = {
  institutionsArray: [mockCollege],
  filteredInstitutions: [mockCollege],
  institutionsObject: {},
  setFilteredInstitutions: () => {},
};

const testDetailsPageComponent = () => (
  <InstitutionContext.Provider value={testContext}>
    <InstitutionDetails params={testParams} />
  </InstitutionContext.Provider>
);

describe("Test InstitutionDetails Page", () => {
  test("Check that page renders", () => {
    render(testDetailsPageComponent());
    expect(screen.getByText("Name of school")).toBeVisible();
    expect(screen.getByText("Outcomes")).toBeVisible();
    expect(screen.getByText("Admissions")).toBeVisible();
    expect(screen.getByText("Student body")).toBeVisible();
    expect(screen.getByText("Academics")).toBeVisible();
    expect(screen.getByText("Costs")).toBeVisible();
  });
});

describe("Test InstitutionDetails Page accessibility", () => {
  it("Should not have basic accessibility issues", async () => {
    await act(async () => {
      const { container } = render(testDetailsPageComponent());
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
