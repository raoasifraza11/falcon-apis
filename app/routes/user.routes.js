const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/user/:id", [authJwt.verifyToken],controller.getUser);

  app.post("/api/user/edit/:id",[authJwt.verifyToken],controller.updateUser);

  app.get(
    "/api/test/user",
    [authJwt.verifyToken],
    controller.userBoard
  );

  app.get(
    "/api/test/mod",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.moderatorBoard
  );

  

  app.post(
    "/api/user/editprofileimage/:id",
    [authJwt.verifyToken],
    controller.updateUserProfileImage
  );



};