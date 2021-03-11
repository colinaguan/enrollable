# Login
*Author: Colina*

## Test Cases
- sign up with valid email
- sign up without valid email
- login with a valid account
- login with an invalid email and password
- login with a valid email and invalid password

## Test Details

### sign up with valid email

signed up with an email of the format "text@text.text"

**Result:**
SUCCESS

**Description:**
Successfully signs up user. Potential issue may be that we don't actually validate the email address.

### sign up without valid email

signed up with an email of the formats:
- text
- text@
- text@text

**Result:**
SUCCESS

**Description:**
The page displays the correct error message.

### login with a valid email and password

logged in with an email used to sign up

**Result:**
SUCCESS

**Description:**
Successfully logins the user.

### login with an invalid email and password

logged in with a email that was not used for an account

**Result:**
SUCCESS

**Description:**
The page displays an error message.

### login with a valid email and invalid password

tried to log in with a valid email, but incorrect password

**Result:**
SUCCESS

**Description:**
The page displays an error message.