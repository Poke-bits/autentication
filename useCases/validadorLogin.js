const User = require("../db/models/User.js");
const bcrypt = require("bcrypt");
let objectResponse = {};
let statusCode, message;
module.exports = async function validadorLogin(dadosLogin, res) {
  if (!dadosLogin.email) {
    objectResponse = res.status(422);
    objectResponse.statusMessage = "email não encontrado na requisição";
  }

  if (!dadosLogin.password) {
    objectResponse = res.status(422);
    objectResponse.statusMessage = "senha não encontrado na requisição";
  }

  const validateLogin = await User.findOne({ email: dadosLogin.email });
  if (!validateLogin) {
    objectResponse = res.status(428);
    objectResponse.statusMessage = "não tem esse email no banco";
  } else {
    const passwordCompare = await bcrypt.compare(
      dadosLogin.password,
      validateLogin.password
    );
    if (passwordCompare === false) {
      objectResponse = res.status(402);
      objectResponse.statusMessage = "senhas não conferem";
    } else {
      objectResponse = res.status(200);
      objectResponse.statusMessage = "usuário autenticado pode prosseguir";
    }
  }
  statusCode = objectResponse.statusCode;
  message = objectResponse.statusMessage;

  console.log(objectResponse.statusMessage);
  return { statusCode, message };
};
