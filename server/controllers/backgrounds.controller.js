const Background = require("../models/backgrounds.model")

module.exports = {
  // READ ALL
  findAllBackgrounds: (req, res) => {
    Background.find().sort({updatedAt:1})
      .then(allBackgrounds => res.json({backgrounds: allBackgrounds}))
      .catch(err => res.json(err));
  },
  // FIND ONE
  findOneBackground: (req, res) => {
    Background.findOne({ _id: req.params.id })
      .then(oneBackground => res.json({background: oneBackground}))
      .catch(err => res.json(err));
  }
}