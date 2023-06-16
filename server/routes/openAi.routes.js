// import { chatCompletion } from "../controllers/chat.controller.js";
const ChatController = require("../controllers/chat.controller");
const {authenticate} = require('../config/jwt.config')

module.exports = app => {
  app.post("/chat",authenticate, ChatController.chatCompletion);
}