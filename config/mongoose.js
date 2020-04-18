const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/HospitalDataBase");

const db = mongoose.connection;
db.on("error", console.error.bind("error connecting to the database"));
db.once("open", function () {
  console.log("Successfully connected to the database");
});
module.exports = db;
