const User = require("../db/models/User.js");
const bcrypt = require("bcrypt");
let objectResponse = {};
let statusCode, message;
module.exports = async function validadorLogin(loginData, res) {
  if (!loginData.email || !loginData.password) {
    objectResponse = res.status(422);
    objectResponse.statusMessage = "email or password not found in request";
  } else {
    const emailValidated = await User.findOne({ email: loginData.email });
    const passwordCompare = await bcrypt.compare(
      loginData.password,
      emailValidated.password
    );
    if (!emailValidated || passwordCompare == false) {
      objectResponse = res.status(428);
      objectResponse.statusMessage = "wrong login or password";
    } else {
      objectResponse = res.status(200);
      objectResponse.statusMessage = "authenticated user, you can proceed";
    }
  }
  statusCode = objectResponse.statusCode;
  message = objectResponse.statusMessage;

  console.log(objectResponse.statusMessage);
  return { statusCode, message };
};
