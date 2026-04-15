const express = require("express");
const router = express.Router();
const wrapasync = require("../util/wrapasync");
const {
  Opportunity,
  Internship,
  Hackathon,
  Placement,
} = require("../models/opportunities");
const { isTeacherOrAdmin } = require("../middleware");
const sendEmail = require("../util/email/email");
const template = require("../util/email/emailTemplate");
const User = require("../models/user");

router.get(
  "/",
  wrapasync(async (req, res) => {
    let allOppo = await Opportunity.find({});
    res.render("./opportunity/index", { allOppo });
  }),
);

router.get(
  "/category",
  wrapasync(async (req, res) => {
    let { q } = req.query;
    let categories = await Opportunity.find({ category: q });
    res.render("opportunity/opportunities", { categories, q });
  }),
);

router.get(
  "/category/:id",
  wrapasync(async (req, res) => {
    let { id } = req.params;
    let opportunity = await Opportunity.findById(id);
    res.render("opportunity/show", { opportunity });
  }),
);

// New Route

router.get("/new", isTeacherOrAdmin, (req, res) => {
  res.render("opportunity/new.ejs");
});

router.post(
  "/",
  isTeacherOrAdmin,
  wrapasync(async (req, res) => {
    let data = req.body;
    let savedOppo;
    data.owner = req.user._id;
    if (!data.category) {
      req.flash("error", "Enter valid category");
      return res.redirect("/opportunity/new");
    }
    if (data.category == "Internship") {
      savedOppo = await new Internship(data).save();
    }
    if (data.category == "Hackathon") {
      savedOppo = await new Hackathon(data).save();
    }
    if (data.category == "Placement") {
      savedOppo = await new Placement(data).save();
    }

    // Email Notification
    const html = template(savedOppo);
    let students = await User.find({ role: "student" });

    let emailPromises = students.map((student) =>
      sendEmail(student.email, "New Opportunity", html),
    );

    await Promise.all(emailPromises);

    req.flash("success", "Opportunity Created! ");
    res.redirect(`/opportunity/category?q=${data.category}`);
  }),
);

// Edit Route

router.get(
  "/:id",
  isTeacherOrAdmin,
  wrapasync(async (req, res) => {
    let { id } = req.params;
    let opportunity = await Opportunity.findById(id);
    res.render("opportunity/edit.ejs", { opportunity });
  }),
);

router.put(
  "/:id",
  isTeacherOrAdmin,
  wrapasync(async (req, res) => {
    let { id } = req.params;
    let data = req.body;

    let model;
    if (!model) {
      req.flash("error", "Enter valid category");
      return res.redirect("/opportunity/new");
    }
    if (data.category == "Internship") model = Internship;
    if (data.category == "Hackathon") model = Hackathon;
    if (data.category == "Placement") model = Placement;

    await model.findByIdAndUpdate(id, data, { new: true, runValidators: true });

    // let updatedOppo = await Opportunity.findByIdAndUpdate(id, data, {
    //   new: true,
    //   runValidators: true,
    // });
    // console.log(data);
    req.flash("success", "Oppportunity Updated!...");
    res.redirect(`/opportunity/category?q=${data.category}`);
  }),
);

// Delete Route

router.delete(
  "/:id",
  isTeacherOrAdmin,
  wrapasync(async (req, res) => {
    let { id } = req.params;

    await Opportunity.findByIdAndDelete(id);
    req.flash("success", "Opportunity Deleted Successfully");
    res.redirect(`/opportunity`);
  }),
);

module.exports = router;
