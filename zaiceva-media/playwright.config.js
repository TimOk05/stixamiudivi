import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./playwright",
  testMatch: "site.spec.js",
  fullyParallel: false,
  workers: 1,
  timeout: 30_000,
  reporter: "list",
  use: {
    baseURL: "http://127.0.0.1:4178",
    channel: "chrome",
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },
  webServer: {
    command: "node playwright/server.mjs",
    url: "http://127.0.0.1:4178/",
    reuseExistingServer: false,
    timeout: 15_000,
  },
});
