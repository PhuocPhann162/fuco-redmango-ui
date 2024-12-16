import type { Config } from "jest";
const esModules = ["react-datepicker"].join("|"); // Add all the es modules here you want to transpile first

const config: Config = {
  testEnvironment: "jest-fixed-jsdom",
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  transformIgnorePatterns: [
    `/node_modules/(?!${esModules})`,
    "/node_modules/(?!(@reduxjs/toolkit|redux-api-middleware|fetch-blob)/)",
  ],
  setupFiles: ["./src/test/setupTests.ts"],
  testEnvironmentOptions: {
    customExportConditions: [""],
  },
};

export default config;
