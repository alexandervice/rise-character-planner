const Race = require("../models/races.model")

module.exports = {
  // READ ALL
  findAllRaces: (req, res) => {
    Race.find().sort({id:1})
      .then(allRaces => res.json({races: allRaces}))
      .catch(err => res.json(err));
  },
  // FIND ONE
  findOneRace: (req, res) => {
    Race.findOne({ _id: req.params.id })
      .then(oneRace => res.json({race: oneRace}))
      .catch(err => res.json(err));
  }
}