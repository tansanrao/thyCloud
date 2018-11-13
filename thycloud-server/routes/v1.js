const express = require("express");
const router = express.Router();

const UserController = require("./../controllers/user.controller");
const FilesController = require("./../controllers/files.controller");
const passport = require("passport");
const path = require("path");

require("./../middleware/passport")(passport);

router.post("/users", UserController.create);

router.get(
  "/users",
  passport.authenticate("jwt", { session: false }),
  UserController.get
);
router.put(
  "/users",
  passport.authenticate("jwt", { session: false }),
  UserController.update
);
router.delete(
  "/users",
  passport.authenticate("jwt", { session: false }),
  UserController.remove
);
router.post("/users/login", UserController.login);

module.exports = router;

router.get(
  "/getUploadUrl",
  passport.authenticate("jwt", { session: false }),
  FilesController.getUploadUrl
);

router.get(
  "/getFiles",
  passport.authenticate("jwt", { session: false }),
  FilesController.getFiles
);

router.get(
  "/getDownloadUrl",
  passport.authenticate("jwt", { session: false }),
  FilesController.getDownloadUrl
);
