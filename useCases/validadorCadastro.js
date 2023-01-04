const User = require("../db/models/User.js");
let objectResponse = {};
let statusCode, message;
module.exports = async function validateDataCadastro(registerData, res) {
  if (
    !registerData.name ||
    !registerData.password ||
    !registerData.confirmPassword
  ) {
    objectResponse = res.status(404);
    objectResponse.statusMessage =
      "check the body of the request as it needs to have name, email, password and confirm password";
  } else if (registerData.password !== registerData.confirmPassword) {
    objectResponse = res.status(480);
    objectResponse.statusMessage = "password different from password confirm";
  } else {
    const validateUserExists = await User.findOne({
      email: registerData.email,
    });
    if (validateUserExists) {
      objectResponse = res.status(480);
      objectResponse.statusMessage = "E-mail already registered";
    } else {
      objectResponse = res.status(200);
      objectResponse.statusMessage = "all Right";
    }
  }
  statusCode = objectResponse.statusCode;
  message = objectResponse.statusMessage;
  return { statusCode, message };
};
