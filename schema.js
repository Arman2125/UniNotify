const joi = require("joi");

const opportunitiesSchema = joi.object({
  title: joi.string().required(),
  description: joi.string().required(),
  company: joi.string().required(),
  location: joi.string().required(),
  link: joi.string().uri().required(),
  deadline: joi.date().required(),
  created_at: joi.date().required(),
});

module.exports.opportunitiesSchema = opportunitiesSchema;

module.exports.userSchema = joi.object({
  email: joi.string().required(),
  password: joi.string().min(5).required(),
  role: joi.string().valid("admin", "teacher", "student").required(),
});
