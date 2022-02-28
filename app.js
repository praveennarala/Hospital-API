// importing required modules
const express = require("express");
const expressLayouts = require('express-ejs-layouts');
const app = express();
const connectDB = require('./config/connect');
const passport = require("passport");
const passportJWTStrategy = require("./config/passport-jwt-strategy");
require('dotenv').config();

// parse form data
app.use(express.urlencoded({ extended: true }));

// ejs
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.get('/', (req, res) => {
  res.render('layout');
});

// setting routes
const doctors = require('./routes/doctor');
const patients = require('./routes/patient');
app.use('/doctor', doctors);
app.use('/patient', patients);


// connecting to local database
// const dbUrl = "mongodb://localhost:27017/hospital-api";
// connectDB(dbUrl);

connectDB(process.env.MONGO_URI);  // connects to database specified in .env file

// port number
const port = process.env.PORT || 4000;

// connecting to server
app.listen(port, () => {
  console.log(`Server listening on port: ${port}...`)
});
