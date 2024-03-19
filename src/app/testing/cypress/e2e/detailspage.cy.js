const SELECTED_INSTITUTION_ROUTE = "/445027";

// 445027: id for American InterContinental University
describe("Test details page", () => {
  it("should show expected sections", () => {
    cy.visit(SELECTED_INSTITUTION_ROUTE);
    // make sure info loads
    cy.get(".card_header-title").should("be.visible");
    cy.get(
      ":nth-child(2) > .usa-card__container > .card_details_header-title",
    ).should("contain", "Outcomes");
    cy.get(
      ":nth-child(3) > .usa-card__container > .card_details_header-title",
    ).should("contain", "Admissions");
    cy.get(
      ":nth-child(4) > .usa-card__container > .card_details_header-title",
    ).should("contain", "Student body");
    cy.get(
      ":nth-child(5) > .usa-card__container > .card_details_header-title",
    ).should("contain", "Academics");
    cy.get(
      ":nth-child(6) > .usa-card__container > .card_details_header-title",
    ).should("contain", "Costs");
  });

  it("Should show apply button", () => {
    cy.visit(SELECTED_INSTITUTION_ROUTE);
    // Find apply button
    cy.get(".card_banner-apply-button").should("be.visible");
  });
});

describe("Test details page accessibility", () => {
  it("Should not have any a11y issues on the details page", () => {
    cy.visit(SELECTED_INSTITUTION_ROUTE);
    // make sure info loads
    cy.get(".card_header-title").should("be.visible");
    cy.runAccessibilityTests();
  });
});
