const { expect, test } = require("@playwright/test");

const pipeline = {
  id: "playwright-pipeline",
  name: "Read-only Test Pipeline",
  description: "Fixture returned by the browser smoke test.",
  urls: [],
  schema: {},
  code: "",
  status: "idle",
  created_at: "2026-10-23T00:00:00Z",
  updated_at: "2026-10-23T00:00:00Z",
};

test("renders a pipeline fixture without creating or executing work", async ({ page }) => {
  await page.route("**/api/pipelines", async (route) => {
    const body = route.request().method() === "GET" ? [pipeline] : pipeline;

    await route.fulfill({
      contentType: "application/json",
      body: JSON.stringify(body),
    });
  });

  await page.goto("/");

  await expect(page.getByRole("heading", { name: "ScrapeCraft" })).toBeVisible();
  await expect(page.getByText("Read-only Test Pipeline")).toBeVisible();

  await page.getByRole("button", { name: /^📋Schema$/ }).click();
  await expect(page.getByText("Define Schema", { exact: true })).toBeVisible();
});
