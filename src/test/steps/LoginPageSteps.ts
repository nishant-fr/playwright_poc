import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";
import {chromium, Page, Browser, expect} from "@playwright/test";
import { pageFixture } from '../../hooks/pageFixture';

setDefaultTimeout(60 * 1000);


Given('the user is on the login page', async function () {
  console.log('User is on the login page');
  await pageFixture.page.goto('http://localhost:8090/login');
});

When('the user enters a valid email and password', async function () {
  console.log('User enters valid email and password');
  await pageFixture.page.waitForTimeout(1000);
  await pageFixture.page.fill('input[type=text]', 'typescript@playwright.com');
  await pageFixture.page.fill('input[type=password]', 'typescript2025!');
});

When('clicks the {string} button', async function (buttonName: string) {
  console.log('User clicks the %s button', buttonName);  
  await pageFixture.page.click('button[type=submit]');
});

Then('the user should be redirected to the homepage', async function () {
  console.log('User is redirected to the homepage');
  await expect(pageFixture.page.locator('h1:has-text("Profile")')).toBeVisible();
});
