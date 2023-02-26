const passport = require('passport');
// Login Handle
const logUser = (req, res, next) => {
  const { email, password } = req.body;
  // email and password required
  if (!(email || password)) {
    req.flash('error_msg', 'All field is required');
    res.render('login', {
      email,
      password,
    });
  } else {
    passport.authenticate('local', {
      successRedirect: '/',
      failureRedirect: '/login',
      failureFlash: true,
    })(req, res, next);
  }
};
module.exports = logUser;
