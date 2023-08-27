const { authJwt } = require("../middleware");
const controller = require("../controllers/examination.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });



  app.post("/api/examination/add",[authJwt.verifyToken],controller.add);

  app.post("/api/examination/edit/:id",[authJwt.verifyToken],controller.update);

  app.get("/api/examinations",[authJwt.verifyToken],controller.getAll);

  app.get("/api/examination/:id", [authJwt.verifyToken],controller.get);

  app.get("/api/admission-examination/:petAdmissionId",[authJwt.verifyToken],controller.getWhere);

  app.post("/api/examination-medicine/add",[authJwt.verifyToken],controller.addExaminationMedicine);

  app.get("/api/examination-medicine/:examinationId", [authJwt.verifyToken],controller.getExaminationMedicine);

  app.post("/api/examination-lab-test/add",[authJwt.verifyToken],controller.addExaminationLabTest);
  app.get("/api/examination-lab-test/:examinationId", [authJwt.verifyToken],controller.getExaminationLabTests);
  app.post("/api/examination-lab-test-image/:laboratoryTestId", [authJwt.verifyToken],controller.addExaminationLabTestImages);
  
};