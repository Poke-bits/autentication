const createUser = require("../useCases/criadorCadastro.js");
const validateDataCadastro = require("../useCases/validadorCadastro.js");
const validadorLogin = require("../useCases/validadorLogin.js");
const getToken = require("../login/token.js");
const User = require("../db/models/User");
const validatorToken = require("../useCases/validadorToken.js");
const express = require("express");

const router = express.Router();
router.use(express.json());

router.get("/", (req, res) => {
  res.status(200).json({ msg: "bem vindo seu merda" });
});
router.post("/cadastrarUsuario", async (req, res) => {
  const dadosCadastro = req.body;
  console.log(dadosCadastro);
  const resultadoValidacao = await validateDataCadastro(dadosCadastro, res);
  if (resultadoValidacao.statusCode === 200) {
    createUser(dadosCadastro);
    res
      .status(resultadoValidacao.statusCode)
      .json({ msg: resultadoValidacao.message });
  } else {
    res
      .status(resultadoValidacao.statusCode)
      .json({ msg: resultadoValidacao.message });
  }
});
router.post("/login", async (req, res) => {
  const dadosLogin = await req.body;
  console.log(dadosLogin);
  const resultadoValidadorLogin = await validadorLogin(dadosLogin, res);
  console.log(resultadoValidadorLogin);
  if (resultadoValidadorLogin.statusCode === 200) {
    const resultToken = getToken(dadosLogin);
    res.status(resultadoValidadorLogin.statusCode).json({
      msg: `${resultadoValidadorLogin.message} seu digito verificador é ${resultToken.randomNumber} seu token é: ${resultToken.token}`,
    });
  } else {
    res
      .status(resultadoValidadorLogin.statusCode)
      .json({ msg: resultadoValidadorLogin.message });
  }
});

router.post("/user/:id", validatorToken, async (req, res) => {
  const reqId = req.params.id;
  const user = await User.findById(reqId, "-password");
  if (!user) {
    return res.status(404).json({ msg: "usuario não encontrado" });
  } else {
    res.status(200).json({ msg: "encontrou o corno", user });
  }
});
module.exports = router;
