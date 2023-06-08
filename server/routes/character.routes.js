const CharacterController = require("../controllers/characters.controller");

module.exports = app => {
    app.post('/api/characters/create', CharacterController.createNewCharacter);
    app.get('/api/characters/find/all', CharacterController.findAllCharacters);
    app.get('/api/characters/find/:id', CharacterController.findOneCharacter);
    // Patch only changes values in the req.body
    app.patch('/api/characters/update/:id', CharacterController.updateCharacter); 
    app.delete('/api/characters/delete/:id', CharacterController.deleteCharacter);
}
