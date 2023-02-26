const express = require('express');
const dotenv = require('dotenv');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const passport = require('passport');
const session = require('express-session');
const fileUpload = require('express-fileupload');
const userRoute = require('./routes/userRoute');
const objPassportInit = require('./config/passport');
const {productController}= require('./controller/viewProductController')
const bodyParser = require('body-parser')


const app = express();
const jsonParser = bodyParser.json()
// Passport config
objPassportInit(passport);

// connect to db
dotenv.config();
const db = process.env.MONGO_URI;
console.log(db);
mongoose.connect(db, { useNewUrlParser: true })
  .then(() => console.log('Connected to DB...'))
  .catch((err) => console.log(err));

// makes the body visible in the layout.ejs
app.use(express.urlencoded({ extended: false }));

app.use(express.static('public'));
app.use(expressLayouts);
// ejs
app.set('view engine', 'ejs');
app.use(fileUpload());
// Express Session
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Set global variables
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});


// Set global session
app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});


app.use('/', userRoute);

const PORT = process.env.PORT || 5100;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
