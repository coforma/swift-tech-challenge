import "cypress-axe";

describe("Test general app accessibility", () => {
  it("Should not have any a11y issues on the homepage", () => {
    cy.visit("http://localhost:3000/");
    cy.injectAxe();
    cy.checkA11y();
  });
});
