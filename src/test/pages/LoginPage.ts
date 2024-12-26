import { expect, Page } from "@playwright/test";

export default class LoginPage {
  constructor(private page: Page) {}


  /**
   * Navigate to the login page and validate the page title.
   */
  async navigateToLoginPage() {
    await this.page.goto('http://localhost:8090/login');
    await expect(this.page).toHaveTitle('React App');
  }

  /**
   * Enter email into the email input field.
   * @param email - The email address to be entered.
   */
  async enterEmail(email: string) {
    const emailField = this.page.locator('//input[contains(@class,"MuiInputBase-input MuiOutlinedInput-input") and @type="text"]');
    await expect(emailField).toBeVisible(); // Validate the element exists
    await emailField.click();
    await emailField.fill(email);
  }

  /**
   * Enter password into the password input field.
   * @param password - The password to be entered.
   */
  async enterPassword(password: string) {
    const passwordField = this.page.locator('input[id=":r1:"]');
    await expect(passwordField).toBeVisible(); // Validate the element exists
    await passwordField.click();
    await passwordField.fill(password);
  }

  /**
   * Click the "LOGIN" button.
   */
  async clickLoginButton() {
    const loginButton = this.page.locator('button[type="submit"]');
    await expect(loginButton).toBeVisible(); // Validate the element exists
    await loginButton.click();
  }

  /**
   * Verify that the user is redirected to the profile page after login.
   */
  async isUserProfilePageVisible() {
    const profileHeader = this.page.locator('h1[class="MuiTypography-root MuiTypography-h5  css-1bsjnwy"]');
    await expect(profileHeader).toBeVisible();
  }

  /**
   * Click the "REGISTER" button.
   */
  async clickRegisterButton() {
    const registerButton = this.page.locator('button:has-text("Register")');
    await expect(registerButton).toBeVisible(); // Validate the element exists
    await registerButton.click();
  }

  async clickForgotPasswordLink() {
    const forgotPasswordLink = this.page.locator('a:has-text("Forgot Password?")');
    await expect(forgotPasswordLink).toBeVisible(); // Validate the element exists
    await forgotPasswordLink.click();
  }
}
