const { faker } = require("@faker-js/faker");
const bcrypt = require("bcrypt");
const otpVerification = require("../db/models/otpVerification.js");
module.exports = async function otpCreator(idRequisition) {
  const otp = faker.datatype.number({ min: 1000, max: 9999 }).toString();
  const saltRounds = 10;
  const hashedOTP = await bcrypt.hash(otp, saltRounds);
  const newOtpVerification = await new otpVerification({
    userId: idRequisition,
    otp: hashedOTP,
    createdAt: Date.now(),
    expiredAt: Date.now() + 3600000,
    expired: false,
  });
  await newOtpVerification.save();
  console.log(otp);
  return otp;
};
