const mongoose = require('mongoose');

const SpecializationSchema = new mongoose.Schema({
  name: String,
  description: String
}, {timestamps: true});

const Specialization = mongoose.model("Specializations", SpecializationSchema)

module.exports = Specialization;