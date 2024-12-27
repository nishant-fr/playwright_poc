## Description
This application is a full-stack web application designed to manage user authentication and profile management. The frontend is built using React and TypeScript, while the backend is developed with Node.js and Express. The application provides a seamless user experience for managing personal information and accessing various features securely.

### Features
- User registration and login
- Profile management
- Password reset functionality
- Responsive and user-friendly interface

## Technologies Used
- **Frontend**: 
  - React
  - TypeScript
  - Material-UI
  - Axios
- **Backend**: 
  - Node.js
  - Express
  - MongoDB
  - JSON Web Tokens (JWT) for authentication
- **Deployment**: 
  - Docker
  - Nginx (for serving the frontend)

## Getting Started
To get a local copy up and running, follow these steps:

cd your-repo

docker compose up --build

Open [http://localhost:8090](http://localhost:8090) to view it in the browser.


# Playwright & Cucumber Setup Guide

This guide provides step-by-step instructions to set up Playwright with Cucumber and configure the folder structure for E2E testing.

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

Install Playwright, Cucumber, Faker (for generating fake argument values), Multiple Cucumber HTML Reporter (to generate overall html test execution report), Node FS Extra to create folders to create automatically:

```bash
npx playwright install
npm i @cucumber/cucumber -D
npm i ts-node -D
npm install multiple-cucumber-html-reporter --save-dev
npm i fs-extra -D
```

Under VS Code, search for Cucumber Plugin and edit settings.json to glue features and steps folder as per project structure below

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

The **features** folder can contains 4 different features which contain scenarios to each page in the application. The **pages** contains declaration of WebElements and their methods. The The **steps** folder contains the corresponding test step implementations where the methods in the page objects are called.


### 4. Running Tests

Setting up the repository and launching the test app, follow the following command:

```bash
create a folder locally
git clone https://github.com/nishant-fr/playwright_poc.git
docker compose up --build
```

To run the end-to-end Playwright tests, use the following command:

```bash
npm run test:cypress
```

### 5. Test Execution Report for end to end test

Apart from the overall test execution result, an HTML report is generated in the **index.html** folder which shows overall test execution details


