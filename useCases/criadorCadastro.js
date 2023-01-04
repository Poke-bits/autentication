const User = require("../db/models/User.js");
const bcrypt = require("bcrypt");

module.exports = async function createUser(registerData) {
  const jokerPassword = await bcrypt.genSalt(12);
  const hashPassword = await bcrypt.hash(registerData.password, jokerPassword);
  try {
    const user = new User({
      name: registerData.name,
      email: registerData.email,
      password: hashPassword,
    });
    await user.save();
  } catch (error) {
    console.log(error);
  }
};
