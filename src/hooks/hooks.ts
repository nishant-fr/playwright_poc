import { Before, After, BeforeAll, AfterAll, AfterStep, Status } from "@cucumber/cucumber";
import { chromium, Browser, BrowserContext, Page } from "@playwright/test";
import { pageFixture } from "./pageFixture";

let browser: Browser;
let context: BrowserContext;

BeforeAll(async () => {
  // Launch the browser before all tests
  console.log("Launching browser...");
  browser = await chromium.launch({ headless: false }); // Change to `headless: true` for CI/CD environments
});

Before(async function () {
  console.log("Setting up a new browser context and page...");
  // Create a new browser context and page before every scenario
  context = await browser.newContext();
  const page = await context.newPage();
  pageFixture.page = page;
});

AfterStep(async function ({ pickle, result }) {
  console.log("After every step...");
  console.log(`Step Status: ${result?.status}`);
  console.log(`Step Text: ${pickle.steps[pickle.steps.length - 1]?.text}`);

  /*if (result?.status === Status.FAILED) {
    console.log("Capturing screenshot for failed step...");
    const screenshot = await pageFixture.page.screenshot();
    this.attach(screenshot, "image/png"); // Attach screenshot to the Cucumber report
  }*/
    console.log("Capturing screenshot for failed step...");
    const screenshot = await pageFixture.page.screenshot();
    this.attach(screenshot, "image/png"); // Attach screenshot to the Cucumber report
}); 

/*After(async function ({ pickle, result }) {
  console.log("After every test...");
  console.log(`Test Status: ${result?.status}`);

  // Capture screenshot for failed scenarios
  if (result?.status === Status.FAILED) {
    console.log(`Capturing screenshot for failed test: ${pickle.name}`);
    const screenshotPath = `./test-result/screenshots/${pickle.name.replace(/[^a-z0-9]/gi, "_")}.png`;
    await pageFixture.page.screenshot({ path: screenshotPath });
    console.log(`Screenshot saved at: ${screenshotPath}`);
  }

  // Close page and context
  if (pageFixture.page && !pageFixture.page.isClosed()) {
    await pageFixture.page.close();
  }
  if (context) {
    await context.close();
  }
});*/

AfterAll(async () => {
  console.log("Closing browser after all tests...");
  if (browser) {
    await browser.close();
  }
});
