// importing schemas
const Doctor = require('../models/doctor');
const Patient = require("../models/patient");
const Report = require("../models/report");

// registering Patient
const register = async (req, res) => {
    try {
        // check if the patient already exists
        let patientExist = await Patient.findOne({ phone: req.body.phone });

        if (!patientExist) {
            // if patient doesn't already exists, create new patient
            let patient = await Patient.create(req.body);

            return res.status(200).json({
                message: "Patient successfully registered",
                patientId: patient._id,
            });
        } else {
            // if patient already exists
            return res.status(409).json({
                // message: "One patient already registered with this number",
                name: req.body.name,
                phone: req.body.phone
            });
        }
    } catch (err) {
        console.log(`Error in registering patient: ${err}`);

        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
};

// create status report
const create_report = async (req, res) => {
    try {
        // check if patient exists
        let patient = await Patient.findById(req.params.id);

        if (patient) {
            // if patient exists
            let doctor = await Doctor.findById(req.body.doctor);

            // create data for report
            let reportData = {
                doctor: req.body.doctor,
                patient: req.params.id,
                status: req.body.status,
                date: req.body.date,
            };

            // create the report and push in patient's reports
            let report = await Report.create(reportData);
            patient.reports.push(report);

            patient.save();

            return res.status(200).json({
                message: "Patient report successfully created",
            });
        } else {
            return res.status(409).json({
                message: "Patient registration unsuccessful",
            });
        }
    } catch (err) {
        console.log(`Error in creating report for the patient: ${err}`);

        return res.status(500).json({
            message: "Internal server error",
        });
    }
};

// all reports
const patient_reports = async (req, res) => {
    try {
        let patient = await Patient.findById(req.params.id).populate({
            path: "reports",
            populate: { path: "doctor", select: "name _id" },
        });

        if (patient) {
            return res.status(200).json({
                message: `${patient.name}'s Test Reports`,
                reports: patient.reports,
            });
        } else {
            return res.status(409).json({
                message: "Patient not registered",
            });
        }
    } catch (err) {
        console.log(`Error creating all reports for the patient: ${err}`);
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
};;

module.exports = { register, create_report, patient_reports };