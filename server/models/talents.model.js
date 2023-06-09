const mongoose = require('mongoose');

const TalentSchema = new mongoose.Schema({
  name: String,
  description: String
}, {timestamps: true});

const Talent = mongoose.model("Talents", TalentSchema)

module.exports = Talent;