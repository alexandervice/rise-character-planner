const Race = require("../controllers/races.controller");
const Background = require("../controllers/backgrounds.controller");
const Specialization = require("../controllers/specializations.controller");
const Talent = require("../controllers/talents.controller");

// const {authenticate} = require('../config/jwt.config')

module.exports = app => {
  // races
  app.get('/api/races/find/all', Race.findAllRaces);
  app.get('/api/races/find/:id', Race.findOneRace);
  // backgrounds
  app.get('/api/backgrounds/find/all', Background.findAllBackgrounds);
  app.get('/api/backgrounds/find/:id', Background.findOneBackground);
  // specializations
  app.get('/api/specializations/find/all', Specialization.findAllSpecializations);
  app.get('/api/specializations/find/:id', Specialization.findOneSpecialization);
  // talents
  app.get('/api/talents/find/all', Talent.findAllTalents);
  app.get('/api/talents/find/:id', Talent.findOneTalent);
}
