const mongoose = require("mongoose");

//Schema
const userSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: false,
    },
    last_name: {
      type: String,
    },
    email: {
      type: String,
      required: false,
      unique: true,
    },
    gender: {
      type: String,
      enum: ["male", "female", "others"],
    },
    job_title: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("user", userSchema);

module.exports = User;
