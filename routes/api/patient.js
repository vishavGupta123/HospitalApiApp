const express = require("express");
const router = express.Router();
const passport = require("../../config/passport-jwt-strategy");

const patientController = require("../../controller/patient_controller");

router.post(
  "/register",
  passport.authenticate("jwt", { session: false }),
  patientController.registerPatient
);
router.post(
  "/:id/create_report",
  passport.authenticate("jwt", { session: false }),
  patientController.createReport
);
router.get("/:id/all_reports", patientController.patientReports);
module.exports = router;
