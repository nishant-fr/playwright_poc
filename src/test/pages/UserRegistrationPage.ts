import { expect, Page } from "@playwright/test";

export default class UserRegistrationPage {
    constructor(private page: Page) { }

    async enterFirstName(firstName: string) {
        console.log("Entering first name in the page", firstName);
        const fistNameField = this.page.getByLabel('First Name', { exact: true });
        await expect(fistNameField).toBeVisible();// Validate the element exists

        await fistNameField.click();
        await fistNameField.fill(firstName);
    }
    
    async enterLastName(lastName: string) {
        console.log("Entering last name in the page", lastName);
        const lastNameField = this.page.getByLabel('Last Name', { exact: true });
        await expect(lastNameField).toBeVisible();// Validate the element exists
        await lastNameField.click();
        await lastNameField.fill(lastName);
    }
    

    async enterPhoneName(phone: string) {
        console.log("Entering phone number in the page", phone);
        const phoneNumberField = this.page.getByLabel('Phone', { exact: true });
        await expect(phoneNumberField).toBeVisible();// Validate the element exists
        await phoneNumberField.click();
        await phoneNumberField.fill(phone);
    }
    

    async enterSocialSecurityNumber(ssn: string) {
        console.log("Entering ssn number in the page", ssn);
        const ssnNumberField = this.page.getByLabel('Social Security ID');
        await expect(ssnNumberField).toBeVisible();// Validate the element exists
        await ssnNumberField.click();
        await ssnNumberField.fill(ssn);
    }

    async enterBloodType(bloodType: string) {
        console.log("Entering blood type in the page", bloodType);
        const bloodTypeField = this.page.getByLabel('Blood Type');
        await expect(bloodTypeField).toBeVisible();// Validate the element exists
        await bloodTypeField.click();

        const bloodTypeValueField = this.page.locator(`//li[@data-value="${bloodType}"]`);
        await expect(bloodTypeValueField).toBeVisible(); // Validate the element exists
        await bloodTypeValueField.click(); // Click the blood type option
    }

    async enterSexType(sexType: string) {
        console.log("Entering sex type in the page", sexType);
        const sexTypeField = this.page.getByLabel('Sex');
        await expect(sexTypeField).toBeVisible();// Validate the element exists
        await sexTypeField.click();

        const sexTypeValueField = this.page.locator(`//li[@data-value="${sexType}"]`);
        await expect(sexTypeValueField).toBeVisible();// Validate the element exists
        await sexTypeValueField.click();
    }

    async enterBirthDate(birthDate: string) {
        console.log("Entering birth date in the page", birthDate);
        const birthDateField = this.page.getByPlaceholder('MM/DD/YYYY');
        await expect(birthDateField).toBeVisible();// Validate the element exists
        await birthDateField.click();
        await birthDateField.fill(birthDate);
    }

    async enterPhysicianFirstName(physicianFirstName: string) {
        console.log("Entering Physician First Name in the page", physicianFirstName);
        const physicianFirstNameField = this.page.getByLabel('Physician First Name');
        await expect(physicianFirstNameField).toBeVisible();// Validate the element exists
        await physicianFirstNameField.click();
        await physicianFirstNameField.fill(physicianFirstName);
    }

    async enterPhysicianLastName(physicianLastName: string) {
        console.log("Entering Physician Last Name in the page", physicianLastName);
        const physicianLastNameField = this.page.getByLabel('Physician Last Name');
        await expect(physicianLastNameField).toBeVisible();// Validate the element exists
        await physicianLastNameField.click();
        await physicianLastNameField.fill(physicianLastName);
    }

    async enterPhysicianTitle(physicianTitle: string) {
        console.log("Entering sex type in the page", physicianTitle);
        const physicianTitleField = this.page.getByLabel('Physician Title');
        await expect(physicianTitleField).toBeVisible();// Validate the element exists
        await physicianTitleField.click();

        const physicianTitleValue = this.page.locator(`//li[@data-value="${physicianTitle}"]`);
        await expect(physicianTitleValue).toBeVisible();// Validate the element exists
        await physicianTitleValue.click();
    }

    async enterCareSiteName(careSiteName: string) {
        console.log("Entering Care Site Name in the page", careSiteName);
        const careSiteNameField = this.page.getByLabel('Care Site Name');
        await expect(careSiteNameField).toBeVisible();// Validate the element exists
        await careSiteNameField.click();
        await careSiteNameField.fill(careSiteName);
    }

    async enterCareSiteAddress(careSiteAddress: string) {
        console.log("Entering Care Address Name in the page", careSiteAddress);
        const careSiteAddressField = this.page.getByLabel('Care Site Address');
        await expect(careSiteAddressField).toBeVisible();// Validate the element exists
        await careSiteAddressField.click();
        await careSiteAddressField.fill(careSiteAddress);
    }

    async enterUserRegistrationEmail(email: string) {
        console.log("Entering User Email in the page", email);
        const userEmailField = this.page.getByLabel('Email');
        await expect(userEmailField).toBeVisible();// Validate the element exists
        await userEmailField.click();
        await userEmailField.fill(email);
    }

    async enterUserRegistrationPassword(password: string) {
        console.log("Entering User Password in the page", password);
        const userPasswordField = this.page.getByLabel('Password');
        await expect(userPasswordField).toBeVisible();// Validate the element exists
        await userPasswordField.click();
        await userPasswordField.fill(password);
    }

    async clickRegisterButton() {
        const registerButton = this.page.locator('//button[contains(@class,"MuiButton-containedPrimary") and text()="Register"]');
        await expect(registerButton).toBeVisible(); // Validate the element exists
        await registerButton.click();  
    }

}
