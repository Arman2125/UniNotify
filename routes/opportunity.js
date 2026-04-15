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
const opportunityController = require("../controller/opportunity");

router.get("/category", wrapasync(opportunityController.searchOppo));

router.get("/category/:id", wrapasync(opportunityController.show));

// New Route

router.get("/new", isTeacherOrAdmin, opportunityController.newFormRender);

router
  .route("/")
  .get(wrapasync(opportunityController.index))
  .post(isTeacherOrAdmin, wrapasync(opportunityController.new));

router;

router
  .route("/:id")
  .get(isTeacherOrAdmin, wrapasync(opportunityController.editFormRender))
  .put(isTeacherOrAdmin, wrapasync(opportunityController.edit))
  .delete(isTeacherOrAdmin, wrapasync(opportunityController.delete));

module.exports = router;
