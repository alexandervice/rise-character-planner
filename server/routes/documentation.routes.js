const Race = require("../controllers/races.controller");
const RaceModel = require("../models/races.model")
const Background = require("../controllers/backgrounds.controller");
const BackgroundModel = require("../models/backgrounds.model")
const Specialization = require("../controllers/specializations.controller");
const SpecializationModel = require("../models/specializations.model")
const Talent = require("../controllers/talents.controller");
const TalentModel = require("../models/talents.model")

const paginatedResults = require("../pagination/paginatedResults")

// const {authenticate} = require('../config/jwt.config')

module.exports = app => {
  // races
  app.get('/api/races/find/all', paginatedResults(RaceModel), Race.findAllRaces);
  app.get('/api/races/find/:id', Race.findOneRace);
  // backgrounds
  app.get('/api/backgrounds/find/all', paginatedResults(BackgroundModel), Background.findAllBackgrounds);
  app.get('/api/backgrounds/find/:id', Background.findOneBackground);
  // specializations
  app.get('/api/specializations/find/all', paginatedResults(SpecializationModel), Specialization.findAllSpecializations);
  app.get('/api/specializations/find/:id', Specialization.findOneSpecialization);
  // talents
  app.get('/api/talents/find/all', paginatedResults(TalentModel), Talent.findAllTalents);
  app.get('/api/talents/find/:id', Talent.findOneTalent);
}
