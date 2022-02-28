const mongoose = require("mongoose");

//doctor schema
const DoctorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// export doctor schema
module.exports = mongoose.model("Doctor", DoctorSchema);
