const Talent = require("../models/talents.model")

module.exports = {
  // READ ALL
  findAllTalents: (req, res) => {
    Talent.find().sort({id:1})
      .then(allTalents => res.json({talents: allTalents}))
      .catch(err => res.json(err));
  },
  // FIND ONE
  findOneTalent: (req, res) => {
    Talent.findOne({ _id: req.params.id })
      .then(oneTalent => res.json({talent: oneTalent}))
      .catch(err => res.json(err));
  }
}