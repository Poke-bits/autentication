const jwt = require("jsonwebtoken");
const User = require("../db/models/User");
const { faker } = require("@faker-js/faker");
let statusCode;
module.exports = function getToken() {
  const randomNumber = faker.datatype.number({ min: 0, max: 4 });
  console.log(randomNumber);
  const secretKey = process.env.SECRET_KEY.split(",");

  const token = jwt.sign(
    {
      id: User._id,
    },
    secretKey[randomNumber]
  );

  return { token, randomNumber };
};
