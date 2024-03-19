// 445027: id for American InterContinental University
const SELECTED_INSTITUTION_ROUTE = "/445027/apply";

describe("Test application page accessibility", () => {
  it("Should not have any a11y issues on the application page", () => {
    cy.visit(SELECTED_INSTITUTION_ROUTE);
    // make sure info loads
    cy.get(".application_header-title").should("be.visible");
    cy.runAccessibilityTests();
  });
});
