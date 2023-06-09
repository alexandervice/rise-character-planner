const CharacterController = require("../controllers/characters.controller");
const {authenticate} = require('../config/jwt.config')
const multer = require("multer");
const path = require("path");
// const fs = require("fs");

const { v4: uuidv4 } = require('uuid');

let uniqueId = uuidv4()
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../../client/public/images"));
  },
  filename: function (req, file, cb) {
    cb(null, uniqueId  + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

module.exports = app => {
    app.post('/api/characters/create', authenticate, upload.single("image"), CharacterController.createCharacter);
    app.get('/api/characters/find/all', authenticate, CharacterController.getCharacters);
    app.get('/api/characters/find/:id', authenticate, CharacterController.getCharacterById);
    // Patch only changes values in the req.body
    app.patch('/api/characters/update/:id', authenticate, upload.single("image"), CharacterController.updateCharacter); 
    app.delete('/api/characters/delete/:id', authenticate, CharacterController.deleteCharacter);
}
