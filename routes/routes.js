const createUser = require("../useCases/criadorCadastro.js");
const validateDataCadastro = require("../useCases/validadorCadastro.js");
const validadorLogin = require("../useCases/validadorLogin.js");
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({ msg: "bem vindo seu merda" });
});
router.post("/cadastrarUsuario", async (req, res) => {
  const dadosCadastro = req.body;
  console.log(dadosCadastro);
  const resultadoValidacao = await validateDataCadastro(dadosCadastro, res);
  if (resultadoValidacao.statusCode === 200) {
    createUser(dadosCadastro);
    console.log("deu certo");
  } else {
    console.log("deu errado");
  }
});
router.post("/login", async (req, res) => {
  const dadosLogin = await req.body;
  console.log(dadosLogin);
  validadorLogin(dadosLogin);
});
module.exports = router;
