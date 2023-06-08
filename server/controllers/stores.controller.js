const Store = require("../models/character.model");


module.exports = {
  // CREATE
  createNewStore: (req, res) => {
    Store.create(req.body)
      .then(newStore => res.json({store: newStore}))
      .catch(err => res.status(400).json(err));
  },
  // READ ALL
  findAllStores: (req, res) => {
    Store.find().sort({storeNumber:1})
      .then(allStores => res.json({stores: allStores}))
      .catch(err => res.json(err));
  },
  // READ ONE
  findOneStore: (req, res) => {
    Store.findOne({ _id: req.params.id })
      .then(oneStore => res.json({store: oneStore}))
      .catch(err => res.json(err));
  },
  // UPDATE
  updateStore: (req, res) => {
    Store.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, runValidators: true })
      .then(updatedStore => res.json({store: updatedStore}))
      .catch(err => res.status(400).json(err));
  },
  // DELETE
  deleteStore: (req, res) => {
    Store.deleteOne({ _id: req.params.id })
      .then(result => res.json({result: result}))
      .catch(err => res.json(err));
  }
}
