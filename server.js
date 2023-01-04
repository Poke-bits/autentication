const express = require("express");
const app = express();
const router = require("./routes/routes.js");
app.use(router);

function serverConnection() {
  const server = app.listen(3000, () => {
    let port = server.address().port;
    console.log("server connection established in port:", port);
  });
}

module.exports = serverConnection;
