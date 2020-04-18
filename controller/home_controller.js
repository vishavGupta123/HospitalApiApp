const Report = require("../model/report");
module.exports.getTheStatus = function (req, res) {
  Report.findOne({ status: req.params.status }, function (err, report) {
    if (err) {
      return res.json(500, {
        message: "Internal server error",
      });
    }
    return res.json(200, {
      report: report,
    });
  });
};
