const jwt = require("jsonwebtoken");
module.exports = function validatorToken(req, res, validator) {
  const header = req.headers["authorization"];
  const digitoValidador = req.body.digitoVerificador;
  const token = header && header.split(" ")[1];
  if (!token) {
    return res.status(404).json({ msg: "missing token required" });
  } else {
    try {
      const secretKey = process.env.SECRET_KEY.split(",");
      jwt.verify(token, secretKey[digitoValidador]);
      validator();
    } catch (error) {
      res.status(400).json({ msg: "error verifying token" });
    }
  }
};
