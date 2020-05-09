const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();
chai.use(chaiHttp);
let app = require("../index");

describe("Hospital", () => {
  describe("/GET patients", () => {
    it("it should get the list of all reports of patients", (done) => {
      chai
        .request(app)
        .get("/api/patient/" + "5e9b01b4076d0342e8679be1" + "/all_reports")
        .end((err, res) => {
          if (err) {
            done(err);
          }
          res.should.have.status(200);
          res.body.should.be.a("object");
          console.log(res.body.report);
          done();
        });
    });
  });
  describe("/POST doctors", () => {
    it("it should create a new doctor", (done) => {
      let doctor = {
        username: "vishwas gupta",
        password: "123",
      };
      chai
        .request(app)
        .post("/api/doctor/register")
        .type("form")
        .send(doctor)
        .end((err, res) => {
          if (err) {
            console.log("Error in testing the url");
            done(err);
          }
          res.should.have.status(200);
          res.body.should.be.a("object");
          done();
        });
    });
  });
  describe("/POST doctors", () => {
    it("Is should login the doctor if it is present inside the database", (done) => {
      let doctor = {
        username: "vishav",
        password: "123",
      };
      chai
        .request(app)
        .post("/api/doctor/login")
        .type("form")
        .send(doctor)
        .end((err, res) => {
          if (err) {
            done(err);
          }
          res.should.have.status(200);
          res.body.should.be.a("object");
          done();
        });
    });
  });

  describe("/POST Patient", () => {
    it("it should add new patient inside the database and a doctor can only do so", (done) => {
      chai
        .request(app)
        .post("/api/doctor/login")
        .type("form")
        .send({
          username: "vishav",
          password: "123",
        })
        .end((err, res) => {
          console.log("the login part");
          res.should.have.status(200);
          res.body.should.have.property("data");
          res.body.should.have.property("message");
          console.log(res.body.message);
          let token = res.body.data.token;
          chai
            .request(app)
            .post("/api/patient/register")
            .set("Authorization", "Bearer " + token)
            .type("form")
            .send({
              mobileNumber: "12345678900000",
            })
            .end((err, res) => {
              if (err) {
                done(err);
              }
              res.should.have.status(200);
              res.body.should.be.a("object");
              res.body.should.have.property("message");
              console.log(res.body.patient);
              done();
            });
        });
    });
  });
  describe("/POST report", () => {
    it("it should create a new report for the existing patient", (done) => {
      chai
        .request(app)
        .post("/api/doctor/login")
        .type("form")
        .send({
          username: "vishav",
          password: "123",
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("data");
          let token = res.body.data.token;
          chai
            .request(app)
            .post(
              "/api/patient/" + "5e9b01b4076d0342e8679be1" + "/create_report"
            )
            .set("Authorization", "Bearer " + token)
            .end((err, res) => {
              if (err) {
                done(err);
              }
              res.should.have.status(200);
              res.body.should.have.property("reportPatient");
              console.log(res.body.report);
              done();
            });
        });
    });
  });
  describe("/GET reports", () => {
    it("it should print the data of patient with same status", (done) => {
      chai
        .request(app)
        .get("/api/reports/" + "Not-Infected")
        .end((err, res) => {
          if (err) {
            done(err);
          }
          res.should.have.status(200);
          console.log(res.body.report);
          done();
        });
    });
  });
});
