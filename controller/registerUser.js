const { User, Role } = require('../model/user');
const { hashMyPassword } = require('../helper/encrypt_password');

const registerConsumer = async (req, res) => {
  console.log('fghhg');
  const {
    firstName, email, lastName, password, confirmPassword, address,
  } = req.body;
  // validation
  if (!firstName || !lastName || !password || !address) {
    console.log('please fill all fields');
  }
  // email validation
  const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (!email.match(validRegex)) {
    req.flash('error_msg', 'Enter a valid email');
  }
  try {
    const user = await User.findOne({ email });
    if (user) {
      req.flash('error_msg', 'Email already exist');
    }
    // compare password
    if (!(password === confirmPassword)) {
      req.flash('error_msg', 'Password does not match');

      if (password.length < 6) {
        req.flash('error_msg', 'Password must be 6 character');
      }

      res.render('register', {
        email,
        firstName,
        lastName,
        address,
        password,
        confirmPassword,
      });
    }

    //
    const role = await Role.findOne({ roleName: 'customer' });
    const newUser = new User({
      email,
      firstName,
      lastName,
      address,
      password,
      role: role.id,
    });
    // encrypt passward

    newUser.password = await hashMyPassword(password);
    // save user
    const createUser = await newUser.save();

    // check save user is successful or failed...
    if (createUser) {
      req.flash('success_msg', 'Registration successful');
      res.render('register');
    }
  } catch (err) {
    console.log(err);
    res.render('register', {
      email,
      firstName,
      lastName,
      address,
      password,
      confirmPassword,
    });
  }
};

module.exports.registerPost = registerConsumer;
