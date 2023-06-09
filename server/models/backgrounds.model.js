const mongoose = require('mongoose');

const BackgroundSchema = new mongoose.Schema({
  name: String,
  description: String,
  gear: String,
}, {timestamps: true});

const Background = mongoose.model("Backgrounds", BackgroundSchema)

module.exports = Background;