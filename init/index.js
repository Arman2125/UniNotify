const sampleData = require("./data");
const {
  Opportunity,
  Internship,
  Hackathon,
  Placement,
} = require("../models/opportunities");
const mongoose = require("mongoose");

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


const initDB = async () => {
  await Opportunity.deleteMany({});
  await Opportunity.insertMany(sampleData);
  console.log("Data entered successfully");
};

initDB();
