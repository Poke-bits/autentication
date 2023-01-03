require("dotenv").config();
const serverconnection = require("./server.js");
const mongoose = require("mongoose");
const DbLogin = process.env.DB_USER;
const DbPassword = process.env.DB_PASS;

function DbConnection() {
  mongoose.set("strictQuery", true);
  mongoose
    .connect(
      `mongodb+srv://${DbLogin}:${DbPassword}@cluster0.rdvsdig.mongodb.net/?retryWrites=true&w=majority`
    )
    .then(() => {
      serverconnection();
      console.log("Connected in the server");
    })
    .catch((error) => {
      console.log(error);
    });
}

module.exports = DbConnection;
