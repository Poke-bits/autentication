const createUser = require("../useCases/criadorCadastro.js");
const validateDataRegister = require("../useCases/validadorCadastro.js");
const validadorLogin = require("../useCases/validadorLogin.js");
const getToken = require("../login/token.js");
const modelsUser = require("../db/models/User");
const validatorToken = require("../useCases/validadorToken.js");
const express = require("express");
const router = express.Router();
router.use(express.json());
router.get("/", (req, res) => {
  res.status(200).json({ msg: "bem vindo seu merda" });
});
router.post("/cadastrarUsuario", async (req, res) => {
  const registrationData = req.body;
  console.log(registrationData);
  const validationOfRegistrationData = await validateDataRegister(
    registrationData,
    res,
    req.body
  );
  if (validationOfRegistrationData.statusCode === 200) {
    createUser(registrationData);
    res
      .status(validationOfRegistrationData.statusCode)
      .json({ msg: validationOfRegistrationData.message });
  } else {
    res
      .status(validationOfRegistrationData.statusCode)
      .json({ msg: validationOfRegistrationData.message });
  }
});
router.post("/login", async (req, res) => {
  const dataOfLogin = await req.body;
  console.log(dataOfLogin);
  const validationOfdataLogin = await validadorLogin(dataOfLogin, res);
  console.log(validationOfdataLogin);
  if (validationOfdataLogin.statusCode === 200) {
    const resultToken = getToken(dataOfLogin);
    res.status(validationOfdataLogin.statusCode).json({
      msg: `${validationOfdataLogin.message} seu digito verificador é ${resultToken.randomNumber} seu token é: ${resultToken.token}`,
    });
  } else {
    res
      .status(resultadoValidadorLogin.statusCode)
      .json({ msg: resultadoValidadorLogin.message });
  }
});

router.post("/user/:id", validatorToken, async (req, res) => {
  const idInRequisition = req.params.id;
  const user = await modelsUser.findById(idInRequisition, "-password");
  if (!user) {
    return res.status(404).json({ msg: "usuario não encontrado" });
  } else {
    res.status(200).json({ msg: "encontrou o corno", user });
  }
});
module.exports = router;
