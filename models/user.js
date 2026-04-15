const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    validate: {
      validator: function (value) {
        return value.endsWith("@sanjivani.edu.in");
      },
      message: "Only college mail allowed",
    },
    required: true,
  },
  role: {
    type: String,
    enum: ["admin", "student", "teacher"],
    default: "student",
  },
});

userSchema.plugin(passportLocalMongoose, {
    usernameField: "email",
});
module.exports = mongoose.model("User", userSchema);
