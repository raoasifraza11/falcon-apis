const { authJwt } = require("../middleware");
const controller = require("../controllers/pet.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/pet/add",[authJwt.verifyToken],controller.addPet);

  app.get("/api/pet/:id", [authJwt.verifyToken],controller.getPet);

  app.post("/api/pet/edit/:id",[authJwt.verifyToken],controller.updatePet);

  app.get("/api/pets",[authJwt.verifyToken],controller.getAllPet);

  app.get("/api/pit-nos",[authJwt.verifyToken],controller.getAllPitnos);
  






};