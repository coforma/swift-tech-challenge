import { FilterModal, InstitutionContext } from "@/src/app/components";
import { InstitutionContextShape } from "@/src/app/components/institutions/InstitutionProvider";
import { render, screen } from "@testing-library/react";
import { mockCollege } from "../../../setupJest";

const mockCloseHandler = jest.fn();

jest.mock("formik");

const testContext: InstitutionContextShape = {
  institutionsArray: [mockCollege],
  filteredInstitutions: [mockCollege],
  institutionsObject: { 0: mockCollege },
  setFilteredInstitutions: () => {},
};

const testFilterModalComponent = () => (
  <InstitutionContext.Provider value={testContext}>
    <FilterModal closeHandler={mockCloseHandler} />
  </InstitutionContext.Provider>
);

describe("test FilterModal", () => {
  it("renders", () => {
    render(testFilterModalComponent());
    expect(screen.getByText("Filter schools")).toBeVisible();
  });
});
