const mongoose = require("mongoose");

const options = {
  discriminatorKey: "category",
};

const opportunitiesSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },

    location: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
    deadline: {
      type: Date,
      required: true,
    },
    created_at: {
      type: Date,
      default: Date.now,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  options,
);

const Opportunity = mongoose.model("Opportunity", opportunitiesSchema);

//Internship Schema of Discriminator

const internshipSchema = new mongoose.Schema({
  stipend: {
    type: Number,
    required: true,
  },
  workMode: {
    type: String,
    enum: ["online", "hybrid", "offline"],
  },
});

const Internship = Opportunity.discriminator("Internship", internshipSchema);

//Hackathon Schema of Discriminator

const hackathonSchema = new mongoose.Schema({
  prize: {
    type: Number,
    required: true,
  },
  teamSize: {
    type: Number,
    required: true,
  },
});

const Hackathon = Opportunity.discriminator("Hackathon", hackathonSchema);

//Placement Schema of discriminator
const placementSchema = new mongoose.Schema({
  salary: Number,
  jobRole: String,
  cgpaCriteria: Number,
});

const Placement = Opportunity.discriminator("Placement", placementSchema);

module.exports = {
  Opportunity,
  Internship,
  Hackathon,
  Placement,
};
