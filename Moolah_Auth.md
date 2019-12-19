# Authentication for Moolah

### How do we authenticate users?
We dediced to use an authentication middleware for Node.js called [Passport](http://www.passportjs.org). Passport can be unobtrusively dropped in to any Express-based web application. A comprehensive set of strategies support authentication using a username and password, Facebook, Twitter, and more.

### What passport strategy did we choose?

##### Local Login
The [passport-local](http://www.passportjs.org/packages/passport-local/) module allows authenticating users via username & password. 

### How does this work?

1. User provides credentials (username/password) to Moolah
2. This is an API route for login that uses passport.authenticate() method which calls the "local" passport strategy.
3. The local passport strategy will first check the username in the database to find a match. If a match is made, it will then retrieve the password. If a match is not made, an error will be sent that the username does not exist.
4. Once the password has been retrieved, it will pass this to the validPassword method.
5. The validPassword method will compare the retrieved password and the one provided at login. If they match, the login will continue. If not, an error: "Incorrect Password", will be provided.

### Features

- Persistent login (using sessions for login)
- Custom routing to remove access to pages that should be available until a user has authenticated.
- Password encryption using: [bcrypt](https://www.npmjs.com/package/bcrypt). Helps with hashing the password when written to the database.







