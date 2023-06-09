const CharacterController = require("../controllers/characters.controller");
const {authenticate} = require('../config/jwt.config')

module.exports = app => {
    app.post('/api/characters/create', authenticate, CharacterController.createCharacter);
    app.get('/api/characters/find/all', authenticate, CharacterController.getCharacters);
    app.get('/api/characters/find/:id', authenticate, CharacterController.getCharacterById);
    // Patch only changes values in the req.body
    app.patch('/api/characters/update/:id', authenticate, CharacterController.updateCharacter); 
    app.delete('/api/characters/delete/:id', authenticate, CharacterController.deleteCharacter);
}
