import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import {
  INDUSTRY_RELEASES,
  PRODUCT_RELEASES,
  RELEASE_STATUS,
} from "../src/release-status.js";

const PRODUCT_NAMES = new Map([
  ["capdent", "CapDent"],
  ["builder", "MiCirql Builder"],
  ["tools", "MiCirql Tools"],
  ["assisted", "Assisted engineering"],
]);
const CERTIFIED_PACK_COUNT = INDUSTRY_RELEASES.filter(
  (industry) => industry.status === "certified",
).length;

const VIEWPORTS = [
  { width: 320, height: 800 },
  { width: 390, height: 844 },
  { width: 768, height: 1024 },
  { width: 1024, height: 768 },
  { width: 1440, height: 900 },
];

const MAX_PAGE_HEIGHT = new Map([
  [320, 5_900],
  [390, 5_700],
  [768, 4_200],
  [1024, 3_600],
  [1440, 3_900],
]);

const OUTPUT_DIRECTORY = path.resolve(
  process.cwd(),
  "test-results",
  "marketing-apps-ui",
);

test.beforeAll(async () => {
  await mkdir(OUTPUT_DIRECTORY, { recursive: true });
});

test("keeps the public Apps route canonical and evidence-backed", async ({
  page,
}) => {
  const response = await page.goto("/apps/", { waitUntil: "networkidle" });
  expect(response?.ok()).toBeTruthy();
  await page.waitForURL(/\/apps\/$/u);

  await expect(page).toHaveTitle(
    "MiCirql Products | Clear roles and release states",
  );
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    "https://micirql.com/apps/",
  );
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    "content",
    "index,follow,max-image-preview:large,max-snippet:-1",
  );
  await expect(page.locator('meta[property="og:url"]')).toHaveAttribute(
    "content",
    "https://micirql.com/apps/",
  );
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
    "content",
    "https://micirql.com/micirql-social.svg",
  );
  await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute(
    "content",
    "summary_large_image",
  );
  await expect(page.locator('meta[name="twitter:image"]')).toHaveAttribute(
    "content",
    "https://micirql.com/micirql-social.svg",
  );

  await expect(page.locator("h1")).toHaveCount(1);
  await expect(page.locator(".product-card")).toHaveCount(
    PRODUCT_RELEASES.length,
  );
  for (const product of PRODUCT_RELEASES) {
    await expectProductState(
      page,
      PRODUCT_NAMES.get(product.id),
      RELEASE_STATUS[product.status],
    );
  }
  await expect(
    page
      .locator(".release-ledger dl > div")
      .filter({ hasText: "Certified packs" }),
  ).toContainText(`${CERTIFIED_PACK_COUNT} industries`);
  await expect(page.getByRole("link", { name: "Skip to content" })).toHaveAttribute(
    "href",
    "#main-content",
  );

  await expect(page.getByText("ClinicPro Website Suite")).toHaveCount(0);
  await expect(page.getByText("Startup MVP Builder")).toHaveCount(0);
  await expect(page.getByText("Lead Capture Landing Page")).toHaveCount(0);
  await expect(
    page.getByRole("link", { name: "Open Builder" }).first(),
  ).toHaveAttribute("href", "https://builder.micirql.com/");
  await expect(
    page.getByRole("link", { name: "Explore Tools" }),
  ).toHaveAttribute("href", "https://tools.micirql.com/tools/");
});

test.describe("MiCirql product portfolio UI", () => {
  for (const viewport of VIEWPORTS) {
    test(`evidence-backed portfolio at ${viewport.width}px`, async ({
      page,
    }) => {
      const runtimeFailures = [];
      page.on("pageerror", (error) => runtimeFailures.push(error.message));
      page.on("console", (message) => {
        if (message.type() === "error") runtimeFailures.push(message.text());
      });

      await page.setViewportSize(viewport);
      const response = await page.goto("/apps/", { waitUntil: "networkidle" });
      expect(response?.ok()).toBeTruthy();
      await page.waitForURL(/\/apps\/$/u);
      await expect(
        page.getByRole("heading", {
          level: 1,
          name: /Products with a clear job/i,
        }),
      ).toBeVisible();

      const mark = page.locator('.apps-topbar img[src="/micirql-mark.svg"]');
      await expect(mark).toBeVisible();
      await expect
        .poll(() =>
          mark.evaluate((image) => ({
            complete: image.complete,
            height: image.naturalHeight,
            width: image.naturalWidth,
          })),
        )
        .toEqual({ complete: true, height: 64, width: 64 });

      await expectNoDocumentOverflow(page, viewport.width);
      await expectCompactPage(page, viewport.width);
      if (viewport.width <= 768) await expectMinimumTargets(page);
      await expectVisibleFocus(
        page,
        page.getByRole("link", { name: "Explore the portfolio" }),
      );
      await page.evaluate(() => document.activeElement?.blur());
      await expectAccessible(page, viewport.width);
      await expectReducedMotion(page);

      expect(runtimeFailures).toEqual([]);
      await settlePage(page);
      await page.evaluate(() => window.scrollTo(0, 0));
      await expect(page).toHaveScreenshot(`apps-${viewport.width}.png`, {
        fullPage: true,
      });
      await page.screenshot({
        path: path.join(OUTPUT_DIRECTORY, `apps-${viewport.width}.png`),
        fullPage: true,
      });
    });
  }
});

async function expectProductState(page, name, state) {
  const card = page.locator(".product-card").filter({ hasText: name });
  await expect(card).toHaveCount(1);
  await expect(card.getByRole("heading", { name, exact: true })).toBeVisible();
  await expect(card.getByText(state, { exact: true })).toBeVisible();
}

async function expectNoDocumentOverflow(page, width) {
  const dimensions = await page.evaluate(() => ({
    clientWidth: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
  }));
  expect(
    dimensions.scrollWidth,
    `Apps page must not overflow at ${width}px`,
  ).toBeLessThanOrEqual(dimensions.clientWidth + 1);
}

async function expectCompactPage(page, width) {
  const height = await page.evaluate(
    () => document.documentElement.scrollHeight,
  );
  expect(
    height,
    `Apps page must stay concise at ${width}px`,
  ).toBeLessThanOrEqual(MAX_PAGE_HEIGHT.get(width));
}

async function expectMinimumTargets(page) {
  const undersized = await page
    .locator("a, button, input, select, textarea")
    .evaluateAll((elements) =>
      elements
        .filter((element) => {
          const style = getComputedStyle(element);
          const rect = element.getBoundingClientRect();
          return (
            style.display !== "none" &&
            style.visibility !== "hidden" &&
            rect.width > 0 &&
            rect.height > 0
          );
        })
        .map((element) => {
          const rect = element.getBoundingClientRect();
          return {
            height: Math.round(rect.height),
            label:
              element.getAttribute("aria-label") ||
              element.textContent?.trim().slice(0, 60),
            tag: element.tagName.toLowerCase(),
            width: Math.round(rect.width),
          };
        })
        .filter((target) => target.height < 44 || target.width < 44),
    );
  expect(undersized).toEqual([]);
}

async function expectVisibleFocus(page, target) {
  await target.focus();
  await expect(target).toBeFocused();
  const focusStyle = await target.evaluate((element) => {
    const style = getComputedStyle(element);
    return {
      outlineStyle: style.outlineStyle,
      outlineWidth: Number.parseFloat(style.outlineWidth) || 0,
    };
  });
  expect(focusStyle.outlineStyle).not.toBe("none");
  expect(focusStyle.outlineWidth).toBeGreaterThanOrEqual(2);
}

async function expectAccessible(page, width) {
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
    .analyze();
  expect(results.violations, `Apps WCAG violations at ${width}px`).toEqual([]);
}

async function expectReducedMotion(page) {
  await expect
    .poll(() =>
      page.locator("html").evaluate((element) =>
        getComputedStyle(element).scrollBehavior,
      ),
    )
    .toBe("smooth");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect
    .poll(() =>
      page.locator("html").evaluate((element) =>
        getComputedStyle(element).scrollBehavior,
      ),
    )
    .toBe("auto");
  const motion = await page
    .locator(".product-card")
    .first()
    .evaluate((element) => {
      const style = getComputedStyle(element);
      return {
        animationDuration: style.animationDuration,
        transitionDuration: style.transitionDuration,
      };
    });
  expect(motion.animationDuration).toBe("0s");
  expect(motion.transitionDuration).toBe("0s");
}

async function settlePage(page) {
  await page.evaluate(async () => {
    await document.fonts.ready;
    await new Promise((resolve) =>
      requestAnimationFrame(() => requestAnimationFrame(resolve)),
    );
  });
}
