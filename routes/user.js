const express = require("express");
const router = express.Router();
const wrapasync = require("../util/wrapasync");
const { isTeacherOrAdmin, savedRedirectUrl } = require("../middleware");
const User = require("../models/user");
const { userSchema } = require("../schema");
const passport = require("passport");

// Signup

router.get("/signup", (req, res) => {
  res.render("./user/signup.ejs");
});

router.post(
  "/signup",
  wrapasync(async (req, res, next) => {
    try {
      let result = userSchema.validate(req.body);
      if (result.error) {
        let errMsg = result.error.details.map((el) => el.message).join(",");
        req.flash("error", errMsg);
        throw new ExpressError(400, errMsg);
      }
      let { email, role, password } = req.body;
      let newUser = new User({
        email: email,
        role: role,
      });
      let registeredUser = await User.register(newUser, password);
      req.login(registeredUser, (err) => {
        if (err) {
          return next(err);
        }
        req.flash("success", "Welcome to UniNotify");
        return res.redirect("/opportunity");
      });
    } catch (err) {
      req.flash("error", err.message);
      return res.redirect("/signup");
    }
  }),
);

// Login

router.get("/login", (req, res) => {
  res.render("./user/login.ejs");
});

router.post(
  "/login",
  savedRedirectUrl,
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: "Invalid Email or Password",
  }),
  (req, res, next) => {
    req.flash("success", "Welcome to UniNotify");
    res.redirect(res.locals.redirectUrl || "/opportunity");
  },
);

// Logout

router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "You successfully Logout!..")
    res.redirect("/opportunity");
  });
});


module.exports = router;
