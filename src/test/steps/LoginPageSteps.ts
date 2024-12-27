import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";
import { chromium, Page, Browser, expect } from "@playwright/test";
import { pageFixture } from '../../hooks/pageFixture';
import LoginPage from "../pages/LoginPage";
import ResetPasswordPage from "../pages/ResetPasswordPage";

setDefaultTimeout(60 * 1000);
let loginPage: LoginPage;
let resetPasswordPage: ResetPasswordPage;

Given('the user is on the login page', async function () {
  loginPage = new LoginPage(pageFixture.page);
  console.log('User is on the login page');
  await loginPage.navigateToLoginPage();
});

When('the user enters a valid email and password', async function () {
  console.log('User enters valid email and password');
  await pageFixture.page.waitForTimeout(1000);
  loginPage.enterEmail('typescript@playwright.com');
  loginPage.enterPassword('typescript2025!');
});

When('clicks the {string} button', async function (buttonName: string) {
  console.log('User clicks the %s button', buttonName);
  loginPage.clickLoginButton();
});

Then('the user should be redirected to the homepage', async function () {
  console.log('User is redirected to the homepage');
  expect(loginPage.isUserProfilePageVisible());
});



When('the user enters an invalid email address', async function () {
  await pageFixture.page.waitForTimeout(1000);
  loginPage.enterEmail('typescript@playwright.c');
});

Then('the user should see an error message {string}', async function (errorMessage: string) {
  resetPasswordPage = new ResetPasswordPage(pageFixture.page);

  // Ensure the page is not closed before interacting with it
  if (pageFixture.page.isClosed()) {
    throw new Error("The page is closed and cannot be interacted with.");
  }

  await pageFixture.page.waitForTimeout(1000);
  expect(await resetPasswordPage.isAlertMessageVisible(errorMessage)).toBeTruthy();
});

When('the user enters an unregistered email address', async function () {
  await pageFixture.page.waitForTimeout(1000);
  loginPage.enterEmail('uknown@user.com');
});


When('the user leaves the email field empty under reset password page', async function () {
  await pageFixture.page.waitForTimeout(1000);
  loginPage.enterEmail('');
});


When('the user clicks the LOGIN link at the top under reset password page', async function () {
  resetPasswordPage = new ResetPasswordPage(pageFixture.page);  
  resetPasswordPage.clickLoginButton();
});

Then('the user should be redirected to the login page', async function () {
  loginPage.isLoginPageVisible();
});

When('the user clicks the REGISTER link at the top under reset password page', async function () {
  resetPasswordPage = new ResetPasswordPage(pageFixture.page);  
  resetPasswordPage.clickRegisterButton();
});

Then('the user should be redirected to the registration page', async function () {
  resetPasswordPage = new ResetPasswordPage(pageFixture.page);
  resetPasswordPage.isRegisterPageVisible();
});

Given('the user clicks the {string} button', async function (string) {
  loginPage.clickRegisterButton();
});
