const jwt = require('jsonwebtoken');
const Owner = require('mongoose').model('Owner');
const PassportLocalStrategy = require('passport-local').Strategy;
const config = require('../../config');


/**
 * Return the Passport Local Strategy object.
 */
module.exports = new PassportLocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    session: false,
    passReqToCallback: true
}, (req, email, password, done) => {
    const userData = {
        userId: email.trim(),
        password: password.trim()
    };

    // find a user by email address
    return Owner.findOne({ userId: userData.userId}, (err, user) => {
        if (err) { return done(err); }


        if (!user) {
            const error = new Error('This id is not registered');
            error.name = 'IncorrectCredentialsError';

            return done(error);
        }

        // check if a hashed user's password is equal to a value saved in the database

        const correctPassword = user.comparePassword(userData.password);

        if(correctPassword){
            const data = {
                name: user.name,
                userId: user.id
            };
            console.log('data');
            console.log(data);
            return done(null, data);
        }
        else{
            const error = new Error('Incorrect id or password');
            error.name = 'IncorrectCredentialsError';

            return done(error);
        }

        // return user.comparePassword(userData.password, (passwordErr, isMatch) => {
        //     if (err) { return done(err); }
        //
        //     if (!isMatch) {
        //         const error = new Error('Incorrect id or password');
        //         error.name = 'IncorrectCredentialsError';
        //
        //         return done(error);
        //     }
        //
        //     const payload = {
        //         sub: user._id
        //     };
        //
        //     // create a token string
        //     const token = jwt.sign(payload, config.jwtSecret);
        //     const data = {
        //         name: user.name,
        //         userID: user.id
        //     };
        //
        //     return done(null, token, data);
        // });
    });
});
