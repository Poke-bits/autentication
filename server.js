const express = require("express");
const app = express();
const router = require("./routes/routes.js");
const bodyParser = require("body-parser");
app.use(router.use(express.json()));

function serverconnection() {
  const server = app.listen(3000, () => {
    let port = server.address().port;
    console.log("server connection established in port:", port);
  });
}

module.exports = serverconnection;
