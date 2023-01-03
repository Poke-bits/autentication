const User = require("../db/models/User.js");
let objectResponse = {};
let statusCode, message;
module.exports = function validadorLogin(dadosLogin) {
  if (dadosLogin.email) {
    objectResponse = res.status(422);
    objectResponse.statusMessage = "email não encontrado na requisição";
  }

  if (dadosLogin.password) {
    objectResponse = res.status(422);
    objectResponse.statusMessage = "senha não encontrado na requisição";
  }
  statusCode = objectResponse.statusCode;
  message = objectResponse.statusMessage;

  console.log(objectResponse.statusMessage);
  return { statusCode, message };
};
