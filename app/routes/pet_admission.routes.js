const { authJwt } = require("../middleware");
const controller = require("../controllers/pet_admission.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });



  app.post("/api/admission/add",[authJwt.verifyToken],controller.add);
  app.post("/api/admission/edit/:petAdmissionId",[authJwt.verifyToken],controller.update);
  app.get("/api/pet-admission/:petId",[authJwt.verifyToken],controller.getWhere);
  app.get("/api/admission/report/:petAdmissionId",[authJwt.verifyToken],controller.report);

  // app.get("/api/pet-admission/status/:id",[authJwt.verifyToken],controller.getWhere);

  // app.get(
  //   "/api/test/user",
  //   [authJwt.verifyToken],
  //   controller.userBoard
  // );

  // app.get(
  //   "/api/test/mod",
  //   [authJwt.verifyToken, authJwt.isModerator],
  //   controller.moderatorBoard
  // );



};