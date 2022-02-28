// importing required modules
const express = require("express");
const passport = require("passport");
const { register, create_report, patient_reports } = require('../controllers/patient');
const router = express.Router();

// importing Patient schema
const Patient = require('../models/patient');

// show all the patients route
router.get("/", async (req, res) => {
    const patient = await Patient.find({});
    return res.send(patient);
});

// patient register route
router.post("/register", passport.authenticate("jwt", { session: false }), register);

// create report route
router.post("/:id/create_report", passport.authenticate("jwt", { session: false }), create_report);

// get patient reports route
router.get("/:id/reports", passport.authenticate("jwt", { session: false }), patient_reports);

module.exports = router;
