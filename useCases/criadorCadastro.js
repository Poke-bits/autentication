const User = require("../db/models/User.js");
const bcrypt = require("bcrypt");

module.exports = async function createUser(dadosCadastro) {
  const joker = await bcrypt.genSalt(12);
  const hashPassword = await bcrypt.hash(dadosCadastro.password, joker);
  try {
    const user = new User({
      name: dadosCadastro.name,
      email: dadosCadastro.email,
      password: hashPassword,
    });
    await user.save();
  } catch (error) {
    console.log(error);
  }
};
