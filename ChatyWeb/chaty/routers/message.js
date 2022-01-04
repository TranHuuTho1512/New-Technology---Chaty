const express = require("express");
const messageRouter = express.Router();
const messageController = require("../controllers/message");

messageRouter.get("/", messageController.getMessByConId);

messageRouter.post("/", messageController.saveMessage);

module.exports = messageRouter;
