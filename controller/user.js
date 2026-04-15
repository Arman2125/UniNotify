const User = require("../models/user");
const wrapasync = require("../util/wrapasync");
const { isTeacherOrAdmin, savedRedirectUrl } = require("../middleware");

//Signup
module.exports.signupFormRender = (req, res) => {
  res.render("./user/signup.ejs");
};

module.exports.signup = async (req, res, next) => {
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
};

// Login
module.exports.loginFormRender = (req, res) => {
  res.render("./user/login.ejs");
};

module.exports.login = (req, res, next) => {
  req.flash("success", "Welcome to UniNotify");
  res.redirect(res.locals.redirectUrl || "/opportunity");
};

// Logout
module.exports.logout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "You successfully Logout!..");
    res.redirect("/opportunity");
  });
};
