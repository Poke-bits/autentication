const mongoose = require("mongoose");
const otpVerification = mongoose.model("otpVerification", {
  userId: String,
  otp: String,
  createdAt: Date,
  expiredAt: Date,
  expired: Boolean,
});
module.exports = otpVerification;
