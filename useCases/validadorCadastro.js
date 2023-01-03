const User = require("../db/models/User.js");
let objectResponse = {};
let statusCode, message;
module.exports = async function validateDataCadastro(dadosCadastro, res) {
  if (!dadosCadastro.name) {
    objectResponse = res.status(422);
    objectResponse.statusMessage = "nome não encontrado na requisição";
  }

  if (!dadosCadastro.email) {
    objectResponse = res.status(422);
    objectResponse.statusMessage = "email não encontrado na requisição";
  }

  if (!dadosCadastro.password) {
    objectResponse = res.status(422);
    objectResponse.statusMessage = "senha não encontrado na requisição";
  }

  if (!dadosCadastro.confirmPassword) {
    objectResponse = res.status(422);
    objectResponse.statusMessage =
      "confirmação de senha não encontrado na requisição";
  }

  if (dadosCadastro.password !== dadosCadastro.confirmPassword) {
    objectResponse = res.status(480);
    objectResponse.statusMessage = "senha diferente da confirmação de senha";
  }

  const validateUserExists = await User.findOne({ email: dadosCadastro.email });
  if (validateUserExists) {
    objectResponse = res.status(480).json({ message: "email já cadastrado" });
    objectResponse.statusMessage = "email já cadastrado";
  } else {
    objectResponse = res.status(200).json({ message: "sucesso" });
    objectResponse.statusMessage = "tudo certo";
  }
  statusCode = objectResponse.statusCode;
  message = objectResponse.statusMessage;

  console.log(objectResponse.statusMessage);
  return { statusCode, message };
};
