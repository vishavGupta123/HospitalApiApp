const express = require("express");
const router = express.Router();
const passport = require("passport");
const passportJWT = require("passport-jwt");

const homecontroller = require("../../controller/home_controller");
router.get("/reports/:status", homecontroller.getTheStatus);
router.use("/doctor", require("./doctor"));
router.use("/patient", require("./patient"));

module.exports = router;
