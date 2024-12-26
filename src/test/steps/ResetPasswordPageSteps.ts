import { Given, When, Then } from "@cucumber/cucumber";
import { chromium, Page, Browser, expect } from "@playwright/test";
import { pageFixture } from "../../hooks/pageFixture";
import LoginPage from "../pages/LoginPage";
import ResetPasswordPage from "../pages/ResetPasswordPage";

let loginPage: LoginPage;
let resetPasswordPage: ResetPasswordPage;

When('the user clicks the {string} link', async function (string) {
    loginPage = new LoginPage(pageFixture.page);
    loginPage.clickForgotPasswordLink();
});

When('the user enters a valid email address', async function () {
    //enterEmailReset app@testing.com
});

When('clicks the {string} button in reset password page', async function (string) {
    resetPasswordPage = new ResetPasswordPage(pageFixture.page);
    resetPasswordPage.clickSendResetLinkButton();
});

Then('a confirmation message {string} should be displayed', async function (string) {
    
});

