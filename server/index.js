const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.all("*", function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, PUT, POST, DELETE, HEAD, OPTIONS"
  );
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

const routes = require("./routes");
routes(app);

const port = 3000;
app.listen(port);
