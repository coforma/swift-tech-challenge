import "cypress-axe";
import mixpanel from "mixpanel-browser";

describe("Test app view", () => {
  before(() => {
    cy.stub(mixpanel, "track");
  });
  it("Should show have filter button on the homepage", () => {
    cy.visit("/");
    // Click Apply filters button
    cy.get('.browse_header > [data-testid="button"]').click();
    // Click to close modal
    cy.get(
      '.usa-button-group > :nth-child(2) > [data-testid="button"]',
    ).click();
  });

  it("Should navigate to (stay on) homepage when you click the header text", () => {
    cy.visit("/");
    // Click header to verify we stay on homepage
    cy.get("h1").click();
    cy.location("pathname").should("match", /\//);
  });

  it("Should show cards will college information and buttons for apply and view more", () => {
    cy.visit("/");
    // Find first apply button
    cy.get(
      ':nth-child(1) > .usa-card__container > [data-testid="CardFooter"] > .card_footer-apply-button',
    ).should("be.visible");
    // Find first view more button
    cy.get(
      ':nth-child(2) > .usa-card__container > [data-testid="CardFooter"] > .card_footer-view-more-button',
    ).should("be.visible");
  });
});

describe("Test general app accessibility", () => {
  it("Should not have any a11y issues on the homepage", () => {
    cy.visit("/");
    cy.runAccessibilityTests();
  });
});
