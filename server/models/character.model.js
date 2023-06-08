const mongoose = require('mongoose');

const CharacterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    minlength: [3, "Name must be at least 3 characters long"]
  },
  img: {
    data: Buffer,
  },
  background: {
    type: Array,
    default: []
  }

}, {timestamps: true});

const Character = mongoose.model('Stores', CharacterSchema);

module.exports = Character;