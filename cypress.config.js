const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    supportFile: "src/app/testing/cypress/setupCypress.ts",
    specPattern: "src/app/testing/cypress/**/*.cy.{js,jsx,ts,tsx}",
  },
});
