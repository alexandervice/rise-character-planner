const CharacterController = require("../controllers/characters.controller");
const {authenticate} = require('../config/jwt.config')
const multer = require("../config/multer.config")

module.exports = app => {
    app.post('/api/users/:userId/characters/create', authenticate, multer.single("img"), CharacterController.createCharacter);
    app.get('/api/users/:userId/characters', authenticate, CharacterController.getCharacters);
    app.get('/api/users/:userId/characters/find/:characterId', authenticate, CharacterController.getCharacterById);
    // Patch only changes values in the req.body
    app.patch('/api/users/:userId/characters/update/:characterId', authenticate, multer.single("img"), CharacterController.updateCharacter); 
    app.delete('/api/users/:userId/characters/delete/:characterId', authenticate, CharacterController.deleteCharacter); //add function to delete image
}
