const otpVerification = require("../db/models/otpVerification.js");
const bcrypt = require("bcrypt");
let userId, otp;
let response, result;
module.exports = async function verificador(otpData) {
  userId = otpData.userId;
  otp = otpData.otp;
  if (!otpData.userId || !otpData.otp) {
    result = false;
    response = "empt userId or otp, please verify your";
  } else {
    const userOtp = await otpVerification.findOne({ userId, expired: false });
    if (userOtp.length <= 0) {
      result = false;
      response = "usuário não encontrado, favor verificar o userId";
    } else {
      if (userOtp.expired) {
        result = false;
        response = "otp has expired, verify this shit";
      } else {
        result = await bcrypt.compare(otp, userOtp.otp);
        result
          ? (response = "usuario autenticado via otp")
          : (response = "otp incorreto favor verificar o numero");
      }
    }
  }
  return { result, response };
};
