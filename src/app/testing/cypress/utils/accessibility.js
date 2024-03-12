// Configures an accessibilty runner that auto-tests important breakpoints

const breakpoints = {
  mobile: [560, 800],
  desktop: [1200, 1200],
};

export const checkCurrentRouteAccessibility = () => {
  Object.keys(breakpoints).forEach((deviceSize) => {
    const size = breakpoints[deviceSize];
    it(
      `Has no basic accessibility issues on ${deviceSize}`,
      { retries: 0 },
      () => {
        cy.viewport(...size);
        cy.runAccessibilityTests();
      },
    );
  });
};

// ***** ACCESSIBILITY COMMANDS *****

Cypress.Commands.add("runAccessibilityTests", () => {
  cy.injectAxe();
  cy.checkA11y(
    null,
    {
      values: ["wcag2a", "wcag2aa"],
      includedImpacts: ["minor", "moderate", "serious", "critical"],
      rules: {
        "duplicate-id": { enabled: false },
      },
    },
    terminalLog,
  );
});

// ***** LOGGING ***** (https://bit.ly/3HnJT9H)

function terminalLog(violations) {
  cy.task(
    "log",
    `${violations.length} accessibility violation${
      violations.length === 1 ? "" : "s"
    } ${violations.length === 1 ? "was" : "were"} detected`,
  );
  // pluck specific keys to keep the table readable
  const violationData = violations.map(
    ({ id, impact, description, nodes }) => ({
      id,
      impact,
      description,
      nodes: nodes.length,
    }),
  );
  cy.task("table", violationData);
}
