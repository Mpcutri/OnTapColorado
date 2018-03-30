const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// we can get rid of this, probably. Building user in SignUp.
const brewerySchema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  synopsis: String,
  date: { type: Date, default: Date.now }
});

const Brewery = mongoose.model("Brewery", brewerySchema);

module.exports = Brewery;
