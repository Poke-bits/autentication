const fns = require("date-fns");
const otpVerification = require("../db/models/otpVerification.js");
module.exports = async function validateOtp() {
  const dbDataOtp = await otpVerification.find({ expirated: false }, "_id");
  for (let i = 0; i < dbDataOtp.length; i++) {
    let id = dbDataOtp[i]._id.toHexString();
    let queryOtpDados = await otpVerification.findOne({ _id: id });
    if (queryOtpDados.expiredAt > Date.now()) {
      return true;
    } else {
      otpVerification.findByIdAndUpdate(
        { _id: id },
        { expired: true },
        (error, data) => {
          error ? console.log(error) : console.log(data);
        }
      );
      return false;
    }
  }
};
