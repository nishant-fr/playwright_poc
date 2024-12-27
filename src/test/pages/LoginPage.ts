import { expect, Page } from "@playwright/test";

export default class LoginPage {
  constructor(private page: Page) { }

  async navigateToLoginPage() {
    await this.page.goto('http://localhost:8090/login');
    await expect(this.page).toHaveTitle('React App');
  }

  async enterEmail(email: string) {
    const emailField = this.page.getByLabel('Email', { exact: true });
    await expect(emailField).toBeVisible();// Validate the element exists
    await emailField.click();
    await emailField.fill(email);
  }

  async enterPassword(password: string) {
    const passwordField = this.page.getByLabel('Password', { exact: true });
    await expect(passwordField).toBeVisible();// Validate the element exists
    await passwordField.click();
    await passwordField.fill(password);
  }

  async clickLoginButton() {
    const loginButton = this.page.locator('button[type="submit"]');
    await expect(loginButton).toBeVisible(); // Validate the element exists
    await loginButton.click();
  }

  async isUserProfilePageVisible() {
    const profileHeader = this.page.locator('h1[class="MuiTypography-root MuiTypography-h5  css-1bsjnwy"]');
    await expect(profileHeader).toBeVisible();
  }

  async clickRegisterButton() {
    const registerButton = this.page.locator('//button[contains(@class,"MuiButton-outlinedPrimary") and text()="Register"]');
    await expect(registerButton).toBeVisible(); // Validate the element exists
    await registerButton.click();
  }

  async clickForgotPasswordLink() {
    const forgotPasswordLink = this.page.locator('a:has-text("Forgot Password?")');
    await expect(forgotPasswordLink).toBeVisible(); // Validate the element exists
    await forgotPasswordLink.click();
  }

  async isLoginPageVisible() {
    const loginHeader = this.page.locator('h4:has-text("Login")');
    await expect(loginHeader).toBeVisible();
  }
}
