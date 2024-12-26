import { expect, Page } from "@playwright/test";

export default class ResetPasswordPage {
  constructor(private page: Page) {}
 
  async enterEmailReset(email: string) {
    const emailField = this.page.locator('//input[contains(@class,"MuiInputBase-input MuiOutlinedInput-input") and @type="text"]');
    await expect(emailField).toBeVisible(); // Validate the element exists
    await emailField.click();
    await emailField.fill(email);
  }

  async clickSendResetLinkButton() {
    const registerButton = this.page.locator('button:has-text("Send Reset Link")');
    await expect(registerButton).toBeVisible(); // Validate the element exists
    await registerButton.click();
  }

  async isErrorMessageVisible(errorMessageValue: string) {
    const errorMessage = this.page.locator('//div[contains(@class,"MuiAlert-message")]');
    await expect(errorMessage).toContainText(errorMessageValue);
  }

  async clickLoginButton() {
    const loginButton = this.page.locator('button:has-text("Login")');
    await expect(loginButton).toBeVisible(); // Validate the element exists
    await loginButton.click();
  }

  async clickRegisterButton() {
    const registerButton = this.page.locator('button:has-text("Register")');
    await expect(registerButton).toBeVisible(); // Validate the element exists
    await registerButton.click();
  }

}
