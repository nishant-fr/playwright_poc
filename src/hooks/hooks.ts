import { Before, After, BeforeAll, AfterAll, AfterStep, Status } from "@cucumber/cucumber";
import { chromium, Browser, BrowserContext } from "@playwright/test";
import { pageFixture } from "./pageFixture";
import { ScenarioContext } from "../helper/scenarioContext";

let browser: Browser;
let context: BrowserContext;
let scenarioContext: ScenarioContext;

BeforeAll(async () => {
  // Launch the browser before all tests
  console.log("Launching browser...");
  browser = await chromium.launch({ headless: false }); // Change to `headless: true` for CI/CD environments
});

Before(async function () {
  this.scenarioContext = new ScenarioContext() as ScenarioContext;
  console.log("Setting up a new browser context and page...");

  // Create a new browser context without setting the viewport
  context = await browser.newContext();

  const page = await context.newPage();
  pageFixture.page = page;

  // Maximize the window using JavaScript by resizing to the screen's dimensions
  await page.evaluate(() => {
    const { screen } = window;
    window.resizeTo(screen.width, screen.height);  // Resize to full screen width and height
    window.moveTo(0, 0);  // Optionally, move the window to the top-left corner
  });
});

AfterStep(async function ({ pickle, result }) {
  console.log("After every step...");
  console.log(`Step Status: ${result?.status}`);
  console.log(`Step Text: ${pickle.steps[pickle.steps.length - 1]?.text}`);

  // Capture screenshot only for failed steps
  if (result?.status === Status.FAILED) {
    console.log("Capturing screenshot for failed step...");
    const screenshot = await pageFixture.page.screenshot();
    this.attach(screenshot, "image/png"); // Attach screenshot to the Cucumber report
  }
});

After(async function ({ pickle, result }) {
  console.log("After every test...");
  console.log(`Test Status: ${result?.status}`);

  // Capture screenshot for failed scenarios
  if (result?.status === Status.FAILED) {
    console.log(`Capturing screenshot for failed test: ${pickle.name}`);
    const screenshotPath = `./test-result/screenshots/${pickle.name.replace(/[^a-z0-9]/gi, "_")}.png`;
    await pageFixture.page.screenshot({ path: screenshotPath });
    console.log(`Screenshot saved at: ${screenshotPath}`);
  }

  // Additional debugging if needed for failed tests
  console.log("After hook triggered for scenario:", pickle.name);
  console.log("Scenario status:", result?.status);

  // Check if the page is still open before closing
  if (pageFixture.page && !pageFixture.page.isClosed()) {
    console.log("Closing the page...");
    await pageFixture.page.close();
  }

  // Close the context (if not already closed)
  if (context) {
    console.log("Closing the browser context...");
    await context.close();
  }
});

AfterAll(async () => {
  console.log("Closing browser after all tests...");
  if (browser) {
    await browser.close();
  }
});
