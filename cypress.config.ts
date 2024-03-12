const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    supportFile: "src/app/testing/cypress/setupCypress.ts",
    specPattern: "src/app/testing/cypress/**/*.cy.{js,jsx,ts,tsx}",
    setupNodeEvents(on: any, config: any) {
      on("task", {
        log(message: any) {
          console.log(message); // eslint-disable-line no-console
          return null;
        },
        table(message: any) {
          console.table(message); // eslint-disable-line no-console
          return null;
        },
      });
      return config;
    },
  },
});
