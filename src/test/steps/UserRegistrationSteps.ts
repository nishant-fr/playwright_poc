import { Given, When, Then, setDefaultTimeout, DataTable } from "@cucumber/cucumber";
import { chromium, Page, Browser, expect } from "@playwright/test";
import { pageFixture } from '../../hooks/pageFixture';
import { ScenarioContext } from "../../helper/scenarioContext";
import { faker, ne } from '@faker-js/faker';
import UserRegistrationPage from "../pages/UserRegistrationPage";
import LoginPage from "../pages/LoginPage";

declare module "@cucumber/cucumber" {
    interface World {
        scenarioContext: ScenarioContext;
    }
}

setDefaultTimeout(60 * 1000);
let userRegistrationPage: UserRegistrationPage;
let scenarioContext: ScenarioContext;
let page: Page;
let loginPage: LoginPage;

When('the user enters the following values to register', async function (userRegistrationDetails: DataTable) {
    console.log('User enters the following values to register');
    const table = userRegistrationDetails.raw();
    const headers = table[0];
    const values = table[1];
    const userRegistrationValues = headers.reduce((acc, header, index) => {
        acc[header] = values[index];
        return acc;
    }, {} as Record<string, string>);

    const page = pageFixture.page;
    userRegistrationPage = new UserRegistrationPage(page);
    const scenarioContext = this.scenarioContext;

    await pageFixture.page.waitForTimeout(1000);
    userRegistrationValues.firstName = userRegistrationValues.firstName === "random"
        ? faker.person.firstName()
        : userRegistrationValues.firstName;
    console.log("Entering first name as -> " +userRegistrationValues.firstName);
    userRegistrationPage.enterFirstName(userRegistrationValues.firstName);

    await pageFixture.page.waitForTimeout(1000);
    userRegistrationValues.lastName = userRegistrationValues.lastName === "random"
        ? faker.person.lastName()
        : userRegistrationValues.lastName;
    console.log("Entering last name as -> " +userRegistrationValues.lastName);
    userRegistrationPage.enterLastName(userRegistrationValues.lastName);

    await pageFixture.page.waitForTimeout(1000);
    console.log("Entering phone number as -> " +userRegistrationValues.phoneNo);
    userRegistrationPage.enterPhoneName(userRegistrationValues.phoneNo);

    await pageFixture.page.waitForTimeout(1000);
    console.log("Entering SSN as -> " +userRegistrationValues.ssnNo);
    userRegistrationPage.enterSocialSecurityNumber(userRegistrationValues.ssnNo);

    await pageFixture.page.waitForTimeout(1000);
    console.log("Entering blood type as -> " +userRegistrationValues.bloodType);
    userRegistrationPage.enterBloodType(userRegistrationValues.bloodType);

    await pageFixture.page.waitForTimeout(1000);
    console.log("Entering Sex type as -> " +userRegistrationValues.sex);
    userRegistrationPage.enterSexType(userRegistrationValues.sex);

    await pageFixture.page.waitForTimeout(1000);
    console.log("Entering DOB as -> " +userRegistrationValues.dob);
    userRegistrationPage.enterBirthDate(userRegistrationValues.dob);

    await pageFixture.page.waitForTimeout(1000);
    userRegistrationValues.physicianFirstName = userRegistrationValues.physicianFirstName === "random"
        ? faker.person.firstName()
        : userRegistrationValues.physicianFirstName;
    
    console.log("Entering physician first name as -> " +userRegistrationValues.physicianFirstName);
    userRegistrationPage.enterPhysicianFirstName(userRegistrationValues.physicianFirstName);

    await pageFixture.page.waitForTimeout(1000);
    userRegistrationValues.physicianLastName = userRegistrationValues.physicianLastName === "random"
        ? faker.person.lastName()
        : userRegistrationValues.physicianLastName;
    
    console.log("Entering physician last name as -> " +userRegistrationValues.physicianLastName);
    userRegistrationPage.enterPhysicianLastName(userRegistrationValues.physicianLastName);

    await pageFixture.page.waitForTimeout(1000);
    console.log("Entering physician title as -> " +userRegistrationValues.physicianTitle);    
    userRegistrationPage.enterPhysicianTitle(userRegistrationValues.physicianTitle);

    await pageFixture.page.waitForTimeout(1000);
    userRegistrationValues.careSiteName = userRegistrationValues.careSiteName === "random"
        ? faker.company.buzzAdjective()
        : userRegistrationValues.careSiteName;

    console.log("Entering care site name as -> " +userRegistrationValues.careSiteName);
    userRegistrationPage.enterCareSiteName(userRegistrationValues.careSiteName);

    await pageFixture.page.waitForTimeout(1000);
    userRegistrationValues.careSiteAddress = userRegistrationValues.careSiteAddress === "random"
        ? faker.location.streetAddress()
        : userRegistrationValues.careSiteAddress;

    console.log("Entering care site address as -> " +userRegistrationValues.careSiteAddress);
    userRegistrationPage.enterCareSiteAddress(userRegistrationValues.careSiteAddress);

    await pageFixture.page.waitForTimeout(1000);
    userRegistrationValues.emailId = userRegistrationValues.emailId === "random" 
        ? faker.internet.email().toString() 
        : userRegistrationValues.emailId;
    console.log("Entering email as -> " + userRegistrationValues.emailId);
    userRegistrationPage.enterUserRegistrationEmail(userRegistrationValues.emailId);
    scenarioContext.set("userRegistrationEmail", userRegistrationValues.emailId);

    userRegistrationValues.password = userRegistrationValues.password === "random" 
        ? faker.internet.password().toString() 
        : userRegistrationValues.password;
    console.log("Entering password as -> " + userRegistrationValues.password);
    userRegistrationPage.enterUserRegistrationPassword(userRegistrationValues.password);
    scenarioContext.set("userRegistrationPassword", userRegistrationValues.password);
    
});

Given('the user clicks the {string} button under registration page', async function (buttonName: string) {
    console.log("Clicking on button -> " +buttonName+" under registration page");
    userRegistrationPage = new UserRegistrationPage(pageFixture.page);
    await pageFixture.page.waitForTimeout(1000);
    userRegistrationPage.clickRegisterButton();
});

Then('upon successfull registration the user is redirected to the login page', async function () {
    console.log("Verifying user redirection to login page");
    loginPage = new LoginPage(pageFixture.page);
    await pageFixture.page.waitForTimeout(1000);
    loginPage.isLoginPageVisible();
});

Then('newly registered user is able to login successfully to the application', async function () {
    // Retrieve values from the scenario context
    // @ts-ignore
    const registeredUserEmail = this.scenarioContext.get<string>("userRegistrationEmail");
    // @ts-ignore
    const registeredUserPassword = this.scenarioContext.get<string>("userRegistrationPassword");

    // Verify the retrieved values are not undefined
    if (!registeredUserEmail || !registeredUserPassword) {
        throw new Error("User registration details are missing in the scenario context.");
    }

    // Perform login actions
    loginPage = new LoginPage(pageFixture.page);
    await pageFixture.page.waitForTimeout(1000);
    loginPage.enterEmail(registeredUserEmail);
    loginPage.enterPassword(registeredUserPassword);
    loginPage.clickLoginButton();

    // Assert the user is redirected to the profile page
    await pageFixture.page.waitForTimeout(1000);
    expect(loginPage.isUserProfilePageVisible()).toBeTruthy();
});
