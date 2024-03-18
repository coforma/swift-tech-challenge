import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  dir: "./",
});

const config: Config = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["./src/app/testing/jest/setupJest.ts"],
  moduleDirectories: ["node_modules"],
  moduleNameMapper: {
    "^uuid$": require.resolve("uuid"),
    "^sinon$": require.resolve("sinon"),
  },
  collectCoverageFrom: [
    "src/app/**/*.{ts,tsx}",
    "src/app/components/**/*.{ts,tsx}",
    "src/app/pages/**/*.{ts,tsx}",
    "!src/app/testing/cypress/**/*.{ts,tsx}",
    "src/app/testing/jest/**/*.{ts,tsx}",
    "!src/app/testing/jest/setupJest.ts",
    "!src/app/layout.tsx",
    "!src/app/utils/analytics.tsx", // not testing internal implementation details of 3rd-party library
  ],
  coverageProvider: "v8",
  coverageReporters: [
    "json",
    [
      "lcov",
      {
        projectRoot: "",
      },
    ],
    "text",
    "text-summary",
  ],
  verbose: true,
};

export default createJestConfig(config);
