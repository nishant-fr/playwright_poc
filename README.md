
# Full-Stack Web Application Documentation

## Description
This application is a full-stack web application designed to manage user authentication and profile management. The frontend is built using **React** and **TypeScript**, while the backend is developed with **Node.js** and **Express**. The application provides a seamless user experience for managing personal information and accessing various features securely.

### Features
- User registration and login
- Profile management
- Password reset functionality
- Responsive and user-friendly interface

## Technologies Used
### Frontend
- React
- TypeScript
- Material-UI
- Axios

### Backend
- Node.js
- Express
- MongoDB
- JSON Web Tokens (JWT) for authentication

### Deployment
- Docker
- Nginx (for serving the frontend)

## Getting Started
To get a local copy up and running, follow these steps:

```bash
cd your-repo
docker compose up --build
```

Open [http://localhost:8090](http://localhost:8090) to view it in the browser.

---

# Playwright & Cucumber Setup Guide

This guide provides step-by-step instructions to set up **Playwright** with **Cucumber** and configure the folder structure for end-to-end (E2E) testing.

## Prerequisites
Ensure the following are installed:
- **Docker Desktop**
- **Visual Studio Code (VSCode)**

## Steps

### 1. Install VSCode Plugins
Install the following VSCode plugins for improved development support:
- **Cucumber**
- **Cucumber (Gherkin) Full Support**
- **Cucumber Step Definitions Generator**
- **Prettier Code Formatter**

### 2. Install Required Packages
Run the following commands to install the required packages:

```bash
npx playwright install
npm i @cucumber/cucumber -D
npm i ts-node -D
npm install multiple-cucumber-html-reporter --save-dev
npm i fs-extra -D
npm install @faker-js/faker
```

After installing the Cucumber plugin in VS Code, edit `settings.json` to glue the `features` and `steps` folders as per the project structure outlined below.

### 3. Project Structure
Set up the following folder structure for E2E tests:

```
src
│
├── features
│   ├── LoginPage.feature
│   ├── RegisteredUserPage.feature
│   ├── ResetPasswordPage.feature
│   └── UserRegistrationPage.feature
│
├── pages
│   ├── LoginPage.ts
│   ├── RegisteredUserPage.ts
│   ├── ResetPasswordPage.ts
│   └── UserRegistrationPage.ts
│
└── steps
    ├── LoginPageStep.ts
    ├── RegisteredUserPageStep.ts
    ├── ResetPasswordPageStep.ts
    └── UserRegistrationPageStep.ts
```

- The **features** folder contains feature files that include scenarios for each page in the application.
- The **pages** folder includes declarations of web elements and their corresponding methods.
- The **steps** folder contains test step implementations, where methods from the page objects are called.

### 4. Running Tests
To set up the repository and launch the test app, follow these steps:

```bash
# Create a folder locally and clone the repository
mkdir local-folder
git clone https://github.com/nishant-fr/playwright_poc.git
docker compose up --build
```

To run the end-to-end Playwright tests, use:

```bash
npm run test
```

### 5. Test Execution Report
After running the tests, an HTML report is generated in the **index.html** folder, providing detailed test execution results.

### 6. Parallel Test Runs and Failed Rerun of Scenarios
Configure the following in the `cucumber.json` file to enable parallel test runs and scenario retries:

```json
{
    "default": {
        "formatOptions": {
            "snippetInterface": "async-await"
        },
        "paths": [
            "src/test/features/"
        ],
        "dryRun": false,
        "require": [
            "src/test/steps/**/*.ts",
            "src/hooks/hooks.ts"
        ],
        "requireModule": [
            "ts-node/register"
        ],
        "format": [
            "progress-bar",
            "html:test-results/cucumber-report.html",
            "json:test-results/cucumber-report.json",
            "rerun:@rerun.txt"
        ],
        "parallel": 2,
        "retry": 1
    }
}
```

This configuration ensures:
- Parallel execution of two tests at a time.
- Failed scenarios are retried once before marking them as failed.


### 7. To Debug tests
```bash
npx playwright codegen http://localhost:8090/register
$env:DEBUG="pw:api"
npm run test
```
TODO add maximise window option
