const wrapasync = require("../util/wrapasync");
const {
  Opportunity,
  Internship,
  Hackathon,
  Placement,
} = require("../models/opportunities");
const { isTeacherOrAdmin } = require("../middleware");

module.exports.index = async (req, res) => {
  let allOppo = await Opportunity.find({});
  res.render("./opportunity/index", { allOppo });
};

module.exports.searchOppo = async (req, res) => {
  let { q } = req.query;
  let categories = await Opportunity.find({ category: q });
  res.render("opportunity/opportunities", { categories, q });
};

module.exports.show = async (req, res) => {
  let { id } = req.params;
  let opportunity = await Opportunity.findById(id);
  res.render("opportunity/show", { opportunity });
};

module.exports.newFormRender = (req, res) => {
  res.render("opportunity/new.ejs");
};

module.exports.new = async (req, res) => {
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
};

module.exports.editFormRender = async (req, res) => {
  let { id } = req.params;
  let opportunity = await Opportunity.findById(id);
  res.render("opportunity/edit.ejs", { opportunity });
};

module.exports.edit = async (req, res) => {
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
};

module.exports.delete = async (req, res) => {
  let { id } = req.params;

  await Opportunity.findByIdAndDelete(id);
  req.flash("success", "Opportunity Deleted Successfully");
  res.redirect(`/opportunity`);
};
