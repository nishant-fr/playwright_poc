Feature: User Login Page tests

    Scenario: Successful login with valid credentials
        Given the user is on the login page
        When the user enters a valid email and password
        And clicks the "LOGIN" button
        Then the user should be redirected to the homepage
        