const localStrategy = require('passport-local').Strategy;

const bcrypt = require('bcryptjs');

// Load user model
const { User } = require('../model/user');

module.exports = (passport) => {
  passport.use(
    // eslint-disable-next-line new-cap
    new localStrategy({ usernameField: 'email' }, (email, password, done) => {
      // Match user email
      User.findOne({ email })
        // eslint-disable-next-line consistent-return
        .then((user) => {
          if (!user) {
            return done(null, false, { message: 'The email is not registered' });
          }

          // Match password
          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) throw err;

            if (isMatch) {
              return done(null, user);
            }
            return done(null, false, { messages: 'Password incorrect' });
          });
        })
        .catch((err) => console.log(err));
    }),

  );
  passport.serializeUser((users, done) => {
    process.nextTick(() => done(
      null,
      users,
    ));
  });

  passport.deserializeUser((users, done) => {
    process.nextTick(() => done(null, users));
  });
};
