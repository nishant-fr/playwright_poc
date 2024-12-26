Feature: Reset Password

    Scenario: Successful password reset request
        Given the user is on the login page
        When the user clicks the "Forgot Password?" link
        And the user enters a valid email address
        And clicks the "SEND RESET LINK" button in reset password page
        Then a confirmation message "If the email is registered, a reset link has been sent." should be displayed
