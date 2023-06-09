const CharacterController = require("../controllers/characters.controller");
const {authenticate} = require('../config/jwt.config')
const multer = require("multer");
const path = require("path");
// const fs = require("fs");
const router = require("express").Router();
const { v4: uuidv4 } = require('uuid');

let uniqueId = uuidv4()
const storage = multer.diskStorage({
  
})

module.exports = app => {
    app.post('/api/characters/create', authenticate, CharacterController.createCharacter);
    app.get('/api/characters/find/all', authenticate, CharacterController.getCharacters);
    app.get('/api/characters/find/:id', authenticate, CharacterController.getCharacterById);
    // Patch only changes values in the req.body
    app.patch('/api/characters/update/:id', authenticate, CharacterController.updateCharacter); 
    app.delete('/api/characters/delete/:id', authenticate, CharacterController.deleteCharacter);
}
