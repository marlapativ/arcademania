import { test, expect } from "@playwright/test";

/** replace with env vars if needed */
const LOCAL_HOST_URL = "http://localhost:3000/";
const SIGN_IN_TEXT = "Sign in";
const SIGN_UP_TEXT = "sign";

test("should have signin button on home page", async ({ page }) => {
  await page.goto(LOCAL_HOST_URL);
  await expect(page.locator("h2")).toContainText("ArcadeMania");
  await expect(
    page.locator("#signin", { hasText: SIGN_IN_TEXT })
  ).toBeVisible();
});

test("should have signup button on home page", async ({ page }) => {
  await page.goto(LOCAL_HOST_URL);
  await expect(page.locator("h2")).toContainText("ArcadeMania");
  await expect(
    page.locator("#signup", { hasText: SIGN_UP_TEXT })
  ).toBeVisible();
});
