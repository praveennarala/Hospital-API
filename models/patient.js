const mongoose = require("mongoose");

//patient schema
const PatientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    reports: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Report",
      },
    ],
  },
  {
    timestamps: true,
  }
);

// exporting Patient schema
module.exports = mongoose.model("Patient", PatientSchema);
