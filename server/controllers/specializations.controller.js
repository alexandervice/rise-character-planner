const Specialization = require("../models/specializations.model")

module.exports = {
  // READ ALL
  findAllSpecializations: (req, res) => {
    Specialization.find().sort({id:1})
      .then(allSpecializations => res.json({specializations: allSpecializations}))
      .catch(err => res.json(err));
  },
  // FIND ONE
  findOneSpecialization: (req, res) => {
    Specialization.findOne({ _id: req.params.id })
      .then(oneSpecialization => res.json({specialization: oneSpecialization}))
      .catch(err => res.json(err));
  }
}