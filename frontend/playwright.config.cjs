const { defineConfig } = require("@playwright/test");

const baseURL = process.env.SCRAPECRAFT_E2E_BASE_URL || "http://127.0.0.1:3022";

module.exports = defineConfig({
  testDir: "./e2e",
  timeout: 30_000,
  reporter: "list",
  use: {
    baseURL,
    browserName: "chromium",
    viewport: { width: 1440, height: 1000 },
    trace: "on-first-retry",
  },
  webServer: process.env.SCRAPECRAFT_E2E_BASE_URL
    ? undefined
    : {
        command: "HOST=127.0.0.1 PORT=3022 BROWSER=none npm start",
        url: baseURL,
        reuseExistingServer: true,
      },
});
