const { opportunitiesSchema } = require("./schema");
const ExpressError = require("./util/ExpressError");

module.exports.validatingSchema = (req, res, next) => {
  let {error} = opportunitiesSchema.validate(req.body);
  if(error) {
    let errMsg = error.details.map((err) => err.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

module.exports.savedRedirectUrl = (req, res, next) => {
  if(req.session.redirectUrl){
    res.locals.redirectUrl = req.session.redirectUrl;
  }
  next();
}


module.exports.isTeacherOrAdmin = (req, res, next) => {
  if(!req.isAuthenticated()) {
    req.session.redirectUrl = req.originalUrl;
    req.flash("error", "You must be Logged in to create new opportunity")
    return res.redirect("/login");
  }
  if(req.user.role == "teacher" || req.user.role == "admin") {
    return next();
  }

  req.flash("error", "Only teachers and admin are allowed to do this");
  return res.redirect("/opportunity");
}

