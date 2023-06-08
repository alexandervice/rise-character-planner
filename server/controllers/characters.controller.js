const Character = require("../models/character.model");


module.exports = {
  // CREATE
  createNewCharacter: (req, res) => {
    Character.create(req.body)
      .then(newCharacter => res.json({character: newCharacter}))
      .catch(err => res.status(400).json(err));
  },
  // READ ALL
  findAllCharacters: (req, res) => {
    Character.find().sort({updatedAt:1})
      .then(allCharacters => res.json({characters: allCharacters}))
      .catch(err => res.json(err));
  },
  // READ ONE
  findOneCharacter: (req, res) => {
    Character.findOne({ _id: req.params.id })
      .then(oneCharacter => res.json({character: oneCharacter}))
      .catch(err => res.json(err));
  },
  // UPDATE
  updateCharacter: (req, res) => {
    Character.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, runValidators: true })
      .then(updatedCharacter => res.json({character: updatedCharacter}))
      .catch(err => res.status(400).json(err));
  },
  // DELETE
  deleteCharacter: (req, res) => {
    Character.deleteOne({ _id: req.params.id })
      .then(result => res.json({result: result}))
      .catch(err => res.json(err));
  }
}
