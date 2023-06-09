const mongoose = require('mongoose');

const RaceSchema = new mongoose.Schema({
  name: String,
  description: String
}, {timestamps: true});

const Race = mongoose.model("Races", RaceSchema)

module.exports = Race;