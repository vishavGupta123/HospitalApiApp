const Doctor = require("../model/doctor");
const jwt = require("jsonwebtoken");

//creating a new doctor inside the database
module.exports.register = function (req, res) {
  Doctor.findOne({ username: req.body.username }, function (err, doctor) {
    if (err) {
      console.log("error in finding the doctor");
      return res.json(404, {
        message: "some database error coming",
      });
    }
    if (!doctor) {
      Doctor.create(
        {
          username: req.body.username,
          password: req.body.password,
        },
        function (err, doctor) {
          if (err) {
            console.log("Error in creating a new doctor");
            return res.json(500, {
              message: "error in creating a new doctor",
            });
          } else {
            return res.json(200, {
              message: "successfully created a new doctor",
            });
          }
        }
      );
    }
  });
};

//logining in the existing doctor and creating a json web token
module.exports.login = async function (req, res) {
  try {
    let doctor = await Doctor.findOne({ username: req.body.username });
    if (!doctor || doctor.password != req.body.password) {
      return res.json(422, {
        message: "Invalid username Or password",
      });
    }
    return res.json(200, {
      message: "Sign in successfull here is the token",
      data: {
        token: jwt.sign(doctor.toJSON(), "corona", { expiresIn: "1000000" }),
      },
    });
  } catch (err) {
    console.log("****", err);
    return res.json(500, {
      message: "Internal server error",
    });
  }
};
