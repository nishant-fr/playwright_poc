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
    const resetLinkButton = this.page.locator('button:has-text("Send Reset Link")');
    await expect(resetLinkButton).toBeVisible();
    await resetLinkButton.click();
  }

  async isAlertMessageVisible(errorMessageValue: string): Promise<boolean> {
    const errorMessage = this.page.locator('//div[contains(@class,"MuiAlert-message")]');

    try {
        // Ensure the locator is visible
        await expect(errorMessage).toBeVisible({ timeout: 5000 }); 

        // Ensure the locator is in view
        await errorMessage.scrollIntoViewIfNeeded();

        // Verify the text of the error message
        await expect(errorMessage).toContainText(errorMessageValue);

        return true;
    } catch (error) {
        console.error("Error checking alert message visibility:", error);
        return false;
    }
}

  async clickLoginButton() {
    const loginButton = this.page.locator('button:has-text("Login")');
    await expect(loginButton).toBeVisible(); 
    await loginButton.click();
  }

  async clickRegisterButton() {
    const registerButton = this.page.locator('button:has-text("Register")');
    await expect(registerButton).toBeVisible();
    await registerButton.click();
  }

  async isRegisterPageVisible() {
    const loginHeader = this.page.locator('h1:has-text("Register")');
    await expect(loginHeader).toBeVisible();
  }

}
