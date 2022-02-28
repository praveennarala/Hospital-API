// importing required modules
const express = require("express");
const router = express.Router();
const {register, login} = require('../controllers/doctor');

//doctor register route
router.post("/register", register);

//doctor login route
router.post("/login", login);

module.exports = router;