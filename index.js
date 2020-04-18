const express = require("express");
const app = express();
const port = 8000;
const db = require("./config/mongoose");
const passport = require("passport");
const passportJwt = require("passport-jwt");

app.use(passport.initialize());
app.use(express.urlencoded());
app.use("/", require("./routes"));

app.listen(port, function (err) {
  if (err) {
    console.log("error in running the server ", err);
    return;
  }
  console.log("Successfully running the server at port, ", port);
});
