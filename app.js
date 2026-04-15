if(process.env.NODE_ENV != "production"){
  require("dotenv").config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const ejsMate = require("ejs-mate");
const port = 8080;
const path = require("path");
const methodOverride = require("method-override");
const {
  Opportunity,
  Internship,
  Hackathon,
  Placement,
} = require("./models/opportunities.js");
const User = require("./models/user");
const ExpressError = require("./util/ExpressError");
const wrapasync = require("./util/wrapasync");
const { validatingSchema, isTeacherOrAdmin } = require("./middleware");
const { wrap } = require("module");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const { userSchema } = require("./schema.js");
const { savedRedirectUrl } = require("./middleware.js");
const opportunityRoute = require("./routes/opportunity.js");
const userRoute = require("./routes/user.js");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
main()
  .then(() => {
    console.log("connect successfully");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/uninotify");
}

// Session Middleware
app.use(
  session({
    secret: "mysupersecret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    },
  }),
);

// Flash Middleware

app.use(flash());

// Passport

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new LocalStrategy({ usernameField: "email" }, User.authenticate()),
);
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Global Locals

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
});

//Routes

app.get("/", (req, res) => {
  res.redirect("/opportunity");
});

// Routes

app.use("/opportunity", opportunityRoute);
app.use("/", userRoute)


//Error Handling

app.use((req, res, next) => {
  next(new ExpressError(404, "Page not found"));
});

app.use((err, req, res, next) => {
  let { status = 500, message = "Some Error" } = err;
  res.status(status).render("opportunity/error.ejs", { message });
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
