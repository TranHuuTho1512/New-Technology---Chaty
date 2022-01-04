const express = require("express");
const fileRouter = express.Router();
const fileController = require("../controllers/file");
const uploadFile = require("../middleware/multerFile");

fileRouter.post("/", uploadFile, fileController.getMessageFile);

fileRouter.get("/:name", fileController.downloadMessageFile);

fileRouter.get("/avatar/:name", fileController.downloadAvatar);

module.exports = fileRouter;
