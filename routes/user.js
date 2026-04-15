const express = require("express");
const router = express.Router();
const wrapasync = require("../util/wrapasync");
const { isTeacherOrAdmin, savedRedirectUrl } = require("../middleware");
const User = require("../models/user");
const { userSchema } = require("../schema");
const passport = require("passport");
const userController = require("../controller/user");

// Logout

router.get("/logout", userController.logout);

// Signup

router
  .route("/signup")
  .get(userController.signupFormRender)
  .post(wrapasync(userController.signup));

// Login

router
  .route("/login")
  .get(userController.loginFormRender)
  .post(
    savedRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: "Invalid Email or Password",
    }),
    userController.login,
  );



module.exports = router;
