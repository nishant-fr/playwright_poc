# Feature: User Login Page tests

#     Scenario: Successful login with valid credentials
#         Given the user is on the login page
#         When the user enters a valid email and password
#         And clicks the "LOGIN" button
#         Then the user should be redirected to the homepage
        
#     Scenario: Unsuccessful password reset request with invalid email
#         Given the user is on the login page
#         When the user clicks the "Forgot Password?" link
#         And the user enters an invalid email address
#         And clicks the "SEND RESET LINK" button in reset password page
#         Then the user should see an error message '"email" must be a valid email'

#     Scenario: Unsuccessful password reset request with unregistered email
#         Given the user is on the login page
#         When the user clicks the "Forgot Password?" link
#         And the user enters an unregistered email address
#         And clicks the "SEND RESET LINK" button in reset password page
#         Then the user should see an error message 'User not found'

#     Scenario: Attempt to reset password with empty email field
#         Given the user is on the login page
#         When the user clicks the "Forgot Password?" link
#         And the user leaves the email field empty under reset password page
#         And clicks the "SEND RESET LINK" button in reset password page
#         Then the user should see an error message '"email" is not allowed to be empty'

#     Scenario: Navigate to login page from reset password screen
#          Given the user is on the login page
#         When the user clicks the "Forgot Password?" link
#         And the user clicks the LOGIN link at the top under reset password page
#         Then the user should be redirected to the login page

#     Scenario: Navigate to registration page from reset password screen
#         Given the user is on the login page
#         When the user clicks the "Forgot Password?" link
#         And the user clicks the REGISTER link at the top under reset password page
#         Then the user should be redirected to the registration page
