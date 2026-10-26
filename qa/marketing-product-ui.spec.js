import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { createHash } from "node:crypto";
import { mkdir, readFile } from "node:fs/promises";
import path from "node:path";

const VIEWPORTS = [
  { width: 320, height: 800 },
  { width: 390, height: 844 },
  { width: 768, height: 1024 },
  { width: 1024, height: 768 },
  { width: 1440, height: 900 },
];

const OUTPUT_DIRECTORY = path.resolve(
  process.cwd(),
  "test-results",
  "marketing-product-ui",
);

const CANONICAL_MARK_SHA256 =
  "7B7B1D2DEBAC2BA38D1EAD35CEC3CD6CDBC3315BA5BF5633857DCEDD6397C136";
const EDITOR_PROOF_SHA256 = new Map([
  [
    "builder-editor-desktop.png",
    "C60ACD2372D174A3C6A51CEAF30B0414E6279CDDD9EC21780544455C18F522FD",
  ],
  [
    "builder-editor-mobile.png",
    "E73CB9B26B04A73F488CE999E1A9290FDCDC790C222C2F6559E1161856651651",
  ],
]);
const BUILDER_URL = "https://builder.micirql.com/";
const LEAD_ENDPOINT = "https://example.supabase.co/rest/v1/public_site_leads";
const VERIFIED_TOOL_URLS = [
  "https://tools.micirql.com/tools/seo/",
  "https://tools.micirql.com/tools/qa/",
  "https://tools.micirql.com/tools/ui-ux/",
];
const MAX_PAGE_HEIGHT = new Map([
  [320, 9_900],
  [390, 9_750],
  [768, 9_350],
  [1024, 7_000],
  [1440, 7_350],
]);

test.beforeAll(async () => {
  await mkdir(OUTPUT_DIRECTORY, { recursive: true });
});

test("uses the exact official mark and audited Builder editor captures", async () => {
  const mark = await readFile(
    path.resolve(process.cwd(), "public", "micirql-mark.svg"),
  );
  const normalizedMark = mark.toString("utf8").replaceAll("\r\n", "\n");
  expect(
    createHash("sha256").update(normalizedMark).digest("hex").toUpperCase(),
  ).toBe(CANONICAL_MARK_SHA256);

  for (const [name, expectedHash] of EDITOR_PROOF_SHA256) {
    const proof = await readFile(
      path.resolve(process.cwd(), "public", "product-proof", name),
    );
    expect(
      createHash("sha256").update(proof).digest("hex").toUpperCase(),
      name,
    ).toBe(expectedHash);
  }
});

test("keeps SEO, pricing, and Builder handoff inside the release boundary", async ({
  page,
}) => {
  const response = await page.goto("/", { waitUntil: "networkidle" });
  expect(response?.ok()).toBeTruthy();

  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    "https://micirql.com/",
  );
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    "content",
    "index,follow,max-image-preview:large,max-snippet:-1",
  );
  await expect(page.locator('meta[property="og:url"]')).toHaveAttribute(
    "content",
    "https://micirql.com/",
  );

  const builderLinks = page.locator(`a[href="${BUILDER_URL}"]`);
  await expect(builderLinks).toHaveCount(7);
  await expect(page.locator("body")).not.toContainText(
    /₹\s*\d|\bper month\b|\bpricing\b/i,
  );

  const builderWorkflow = page.getByRole("list", {
    name: "MiCirql Builder workflow",
  });
  await expect(builderWorkflow.getByRole("listitem")).toHaveCount(4);
  await expect(builderWorkflow).toContainText("Lock the business truth");
  await expect(builderWorkflow).toContainText("Compare certified directions");
  await expect(builderWorkflow).toContainText("Refine the same project");
  await expect(builderWorkflow).toContainText("Check before release");
  await expect(
    page.getByText("Pages and sections", { exact: true }),
  ).toBeVisible();
  await expect(
    page.getByText("Undo, redo and save status", { exact: true }),
  ).toBeVisible();
  await expect(
    page.getByText("Exact logo and brand binding", { exact: true }),
  ).toBeVisible();
  await expect(
    page.getByText(
      /Deployment and general commercial publishing remain in validation/i,
    ),
  ).toBeVisible();

  const plannedCards = page.locator(".industry-grid article").filter({
    has: page.locator(".status-planned"),
  });
  await expect(plannedCards).toHaveCount(1);
  await expect(plannedCards.locator("a")).toHaveCount(0);

  const toolLinks = page.locator(".tool-list a");
  await expect(toolLinks).toHaveCount(VERIFIED_TOOL_URLS.length);
  for (const [index, href] of VERIFIED_TOOL_URLS.entries()) {
    await expect(toolLinks.nth(index)).toHaveAttribute("href", href);
    await expect(toolLinks.nth(index)).toHaveAttribute("target", "_blank");
  }
  await expect(page.locator('a[href*="screenshots"]')).toHaveCount(0);

  const robots = await page.request.get("/robots.txt");
  expect(robots.ok()).toBeTruthy();
  expect(await robots.text()).toContain(
    "Sitemap: https://micirql.com/sitemap.xml",
  );

  const sitemap = await page.request.get("/sitemap.xml");
  expect(sitemap.ok()).toBeTruthy();
  const sitemapBody = await sitemap.text();
  expect(sitemapBody).toContain("<loc>https://micirql.com/</loc>");
  expect(sitemapBody).toContain("<lastmod>2026-10-25</lastmod>");
});

test("submits a constrained lead without treating the publishable key as a bearer token", async ({
  page,
}) => {
  let submittedRequest;
  await page.route(LEAD_ENDPOINT, async (route) => {
    submittedRequest = route.request();
    await route.fulfill({ status: 201, body: "" });
  });

  await page.goto("/", { waitUntil: "networkidle" });
  await page.getByLabel("Name *").fill("Release Test");
  await page.getByLabel("Phone *").fill("+91 90000 00000");
  await page
    .getByLabel("Tell us about it *")
    .fill("Verify the marketing enquiry contract.");
  await page.getByRole("button", { name: /Send enquiry/i }).click();

  await expect(page.getByText(/your request has been saved/i)).toBeVisible();
  expect(submittedRequest).toBeTruthy();
  const headers = submittedRequest.headers();
  expect(headers.apikey).toBe("sb_publishable_ui_contract_only");
  expect(headers.authorization).toBeUndefined();
  expect(headers.prefer).toBe("return=minimal");
  expect(submittedRequest.postDataJSON()).toMatchObject({
    name: "Release Test",
    phone: "+91 90000 00000",
    message: "Verify the marketing enquiry contract.",
    source: "micirql.com",
    status: "new",
  });
});

test("hides backend details and allows a failed enquiry to be retried", async ({
  page,
}) => {
  let attempts = 0;
  await page.route(LEAD_ENDPOINT, async (route) => {
    attempts += 1;
    if (attempts === 1) {
      await route.fulfill({
        status: 500,
        contentType: "application/json",
        body: '{"message":"INTERNAL_TABLE_DETAIL_MUST_NOT_LEAK"}',
      });
      return;
    }
    await route.fulfill({ status: 201, body: "" });
  });

  await page.goto("/", { waitUntil: "networkidle" });
  await page.getByLabel("Name *").fill("Retry Test");
  await page.getByLabel("Phone *").fill("+91 91111 11111");
  await page
    .getByLabel("Tell us about it *")
    .fill("Verify safe retry behavior.");
  const submit = page.getByRole("button", { name: /Send enquiry/i });
  await submit.click();

  await expect(page.getByText(/We could not save your enquiry/i)).toBeVisible();
  await expect(
    page.getByText("INTERNAL_TABLE_DETAIL_MUST_NOT_LEAK"),
  ).toHaveCount(0);

  await submit.click();
  await expect(page.getByText(/your request has been saved/i)).toBeVisible();
  expect(attempts).toBe(2);
});

test.describe("MiCirql truthful product marketing", () => {
  for (const viewport of VIEWPORTS) {
    test(`release states and responsive product UI at ${viewport.width}px`, async ({
      page,
    }) => {
      const runtimeFailures = [];
      page.on("pageerror", (error) => runtimeFailures.push(error.message));
      page.on("console", (message) => {
        if (message.type() === "error") runtimeFailures.push(message.text());
      });

      await page.setViewportSize(viewport);
      const response = await page.goto("/", { waitUntil: "networkidle" });
      expect(response?.ok()).toBeTruthy();
      await expect(page).toHaveTitle(
        "MiCirql | Industry Website Builder for Dental & Physiotherapy",
      );
      await expect(page.locator("h1")).toHaveCount(1);
      await expect(
        page.getByRole("heading", {
          level: 1,
          name: /A website shaped by your industry/i,
        }),
      ).toBeVisible();

      const mark = page.locator('.topbar img[src="/micirql-mark.svg"]');
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

      const industries = page.locator(".industry-grid");
      await expectReleaseState(industries, "Dental clinics", "Certified");
      await expectReleaseState(
        industries,
        "Physiotherapy clinics",
        "Certified",
      );
      await expectReleaseState(industries, "Restaurants", "Planned");
      await expect(industries.getByRole("heading", { level: 3 })).toHaveCount(
        3,
      );
      await expect(
        page.getByRole("link", { name: /SEO Studio/i }),
      ).toHaveAttribute("href", VERIFIED_TOOL_URLS[0]);
      await expect(
        page.getByRole("link", { name: /QA Testing Lab/i }),
      ).toHaveAttribute("href", VERIFIED_TOOL_URLS[1]);
      await expect(
        page.getByRole("link", { name: /UI\/UX Inspector/i }),
      ).toHaveAttribute("href", VERIFIED_TOOL_URLS[2]);
      const editorEvidence = page.getByRole("img", {
        name: /Builder editor showing page and section controls/i,
      });
      await expect(editorEvidence).toBeVisible();
      await expect
        .poll(() =>
          editorEvidence.evaluate(
            (image) => new URL(image.currentSrc, document.baseURI).pathname,
          ),
        )
        .toBe(
          viewport.width <= 640
            ? "/product-proof/builder-editor-mobile.png"
            : "/product-proof/builder-editor-desktop.png",
        );
      await expect(page.getByText("BUILT FOR", { exact: true })).toHaveCount(0);
      await expect(
        page.getByText("Backend-ready", { exact: true }),
      ).toHaveCount(0);

      await expectNoDocumentOverflow(page, viewport.width);
      await expectCompactPage(page, viewport.width);
      if (viewport.width <= 900) {
        await expectMobileMenuContract(page);
        await expectMinimumTargets(page);
      } else {
        await expect(
          page.getByRole("navigation", { name: "Primary navigation" }),
        ).toBeVisible();
        await expect(
          page.getByRole("button", { name: "Open navigation" }),
        ).toBeHidden();
      }

      await expectFaqKeyboardContract(page);
      await expectAccessible(page, viewport.width);
      await expectReducedMotion(page);

      await settlePage(page);
      await page.evaluate(() => window.scrollTo(0, 0));
      await expect(page).toHaveScreenshot(`marketing-${viewport.width}.png`, {
        fullPage: true,
      });
      await page.screenshot({
        path: path.join(OUTPUT_DIRECTORY, `marketing-${viewport.width}.png`),
        animations: "disabled",
        fullPage: true,
      });

      expect(runtimeFailures).toEqual([]);
    });
  }
});

async function expectReleaseState(scope, name, status) {
  const card = scope.locator("article").filter({ hasText: name });
  await expect(card).toHaveCount(1);
  await expect(
    card.getByRole("heading", { level: 3, name, exact: true }),
  ).toBeVisible();
  await expect(card.getByText(status, { exact: true })).toBeVisible();
}

async function expectNoDocumentOverflow(page, width) {
  const dimensions = await page.evaluate(() => ({
    clientWidth: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
  }));
  expect(
    dimensions.scrollWidth,
    `document must not overflow at ${width}px`,
  ).toBeLessThanOrEqual(dimensions.clientWidth + 1);
}

async function expectCompactPage(page, width) {
  const height = await page.evaluate(
    () => document.documentElement.scrollHeight,
  );
  expect(
    height,
    `marketing page must stay concise at ${width}px`,
  ).toBeLessThanOrEqual(MAX_PAGE_HEIGHT.get(width));
}

async function expectMobileMenuContract(page) {
  const button = page.getByRole("button", { name: "Open navigation" });
  await expect(button).toBeVisible();
  await expect(button).toHaveAttribute("aria-expanded", "false");
  await button.focus();
  await button.press("Enter");
  await expect(
    page.getByRole("navigation", { name: "Primary navigation" }),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Close navigation" }),
  ).toHaveAttribute("aria-expanded", "true");
  await page.keyboard.press("Escape");
  await expect(
    page.getByRole("button", { name: "Open navigation" }),
  ).toBeFocused();
  await expect(
    page.getByRole("navigation", { name: "Primary navigation" }),
  ).toBeHidden();
}

async function expectFaqKeyboardContract(page) {
  const question = page.getByRole("button", {
    name: "Does Rank 1 mean the best-looking design?",
  });
  await question.scrollIntoViewIfNeeded();
  await question.focus();
  await question.press("Enter");
  await expect(question).toHaveAttribute("aria-expanded", "true");
  await expect(
    page.getByText(/Rank means strongest fit for the supplied brief/i),
  ).toBeVisible();
  await question.press("Enter");
  await expect(question).toHaveAttribute("aria-expanded", "false");
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
              element.textContent?.trim().slice(0, 50),
            tag: element.tagName.toLowerCase(),
            width: Math.round(rect.width),
          };
        })
        .filter((target) => target.height < 44 || target.width < 44),
    );
  expect(undersized).toEqual([]);
}

async function expectAccessible(page, width) {
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
    .analyze();
  expect(results.violations, `WCAG violations at ${width}px`).toEqual([]);
}

async function expectReducedMotion(page) {
  await page.emulateMedia({ reducedMotion: "reduce" });
  const moving = await page.locator("body *").evaluateAll((elements) =>
    elements
      .map((element) => {
        const style = getComputedStyle(element);
        const toSeconds = (value) => {
          const trimmed = value.trim();
          if (trimmed.endsWith("ms")) return Number.parseFloat(trimmed) / 1000;
          return Number.parseFloat(trimmed) || 0;
        };
        const duration = Math.max(
          ...style.animationDuration.split(",").map(toSeconds),
          ...style.transitionDuration.split(",").map(toSeconds),
        );
        return duration > 0.001
          ? `${element.tagName.toLowerCase()}.${element.className}`
          : null;
      })
      .filter(Boolean),
  );
  expect(moving).toEqual([]);
}

async function settlePage(page) {
  await page.evaluate(async () => {
    await document.fonts.ready;
    await new Promise((resolve) =>
      requestAnimationFrame(() => requestAnimationFrame(resolve)),
    );
  });
}
