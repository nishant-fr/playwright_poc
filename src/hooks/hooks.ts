import { Before, After, BeforeAll, AfterAll, BeforeStep, AfterStep, Status } from "@cucumber/cucumber";
import { chromium, Browser, Page, BrowserContext } from "@playwright/test";
import { pageFixture } from "./pageFixture";

let browser: Browser;
let context: BrowserContext;

BeforeAll(async () => {
  browser = await chromium.launch({ headless: false });
})

Before(async function () {
  console.log('Before every test launch');
  context = await browser.newContext();
  const page = await context.newPage();
  pageFixture.page = page;
});

AfterStep(async function ({ pickle, result }) { 
  console.log('After every step close');
  console.log(result?.status);
  console.log(pickle.steps[pickle.steps.length - 1].text);
});

After(async function ({ pickle, result }) {
  console.log('After every test close');

  //Time stamp and other values can be added here as well to the report
  console.log(result?.status);

  if (result?.status == Status.FAILED) {  // Attach screenshot to the report
    const img = await pageFixture.page.screenshot({ path: `./test-result/screenshots/${pickle.name}.png` });
    await this.attach(img, 'image/png');
  }

  await pageFixture.page.close();
  await context.close();
});

AfterAll(async () => {
  console.log('After all tests close');
  await browser.close();
});
