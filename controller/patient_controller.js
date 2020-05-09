const jwt = require("jsonwebtoken");
const Patient = require("../model/patient");
const Report = require("../model/report");

//creating a new patient
module.exports.registerPatient = async function (req, res) {
  const usertoken = req.headers.authorization;
  const token = usertoken.split(" ");
  const decoded = jwt.verify(token[1], "corona");
  console.log(decoded);
  let patient = await Patient.findOne({
    mobileNumber: req.body.mobileNumber,
  }).populate("report");

  if (!patient) {
    let patient1 = await Patient.create({
      report: [],
      doctor: decoded.id,
      mobileNumber: req.body.mobileNumber,
    });

    return res.json(200, {
      message: "successfully created a patient",
      patient: patient1,
    });
  } else {
    return res.json(200, {
      message: "patient is already registered and here are the details",
      report: patient,
    });
  }
};

//creating report for a patient
module.exports.createReport = function (req, res) {
  const usertoken = req.headers.authorization;
  const token = usertoken.split(" ");
  const decoded = jwt.verify(token[1], "corona");
  Patient.findById(req.params.id, function (err, patient) {
    if (patient) {
      console.log(patient);
      let num = Math.random();
      let array = [
        "Negative",
        "Travelled - Quarantine",
        "Symptoms - Quarantine",
        "Positive - Admit",
      ];
      num = num * array.length;

      Report.create(
        {
          patient: req.params.id,
          doctor: decoded.username,
          status: array[Math.floor(Math.random() * array.length)].toString(),
        },
        function (err, reportPatient) {
          if (err) {
            console.log(err);
            return res.json(500, {
              message: "Internal server error",
            });
          }
          if (!reportPatient) {
            console.log(reportPatient);
            return res.json(422, {
              message: "Report is not made",
            });
          }
          console.log(reportPatient);
          patient.report.push(reportPatient.id);
          patient.save();
          return res.json(200, {
            message: "created a new report for the patient",
            reportPatient: reportPatient,
          });
        }
      );

      console.log(patient);
    }
  });
};

//showing all the reports of a patient from oldest to newest
module.exports.patientReports = async function (req, res) {
  let report = await Patient.findById(req.params.id)
    .sort("-createdAt")
    .populate("report");

  return res.json(200, {
    patient: report,
  });
};
