import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";
import { chromium, Page, Browser, expect } from "@playwright/test";
import { pageFixture } from '../../hooks/pageFixture';
import LoginPage from "../pages/LoginPage";

setDefaultTimeout(60 * 1000);
let loginPage: LoginPage;

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

});

Then('the user should see an error message {string}', async function (string) {

});

When('the user enters an unregistered email address', async function () {

});

Then('the user should see an error message {string}', async function (string) {

});

When('the user leaves the email field empty under reset password page', async function () {

});

Then('the user should see an error message {string}', async function (string) {

});

When('the user clicks the LOGIN link at the top under reset password page', async function () {

});

Then('the user should be redirected to the login page', async function () {

});

When('the user clicks the REGISTER link at the top under reset password page', async function () {

});

Then('the user should be redirected to the registration page', async function () {

});
