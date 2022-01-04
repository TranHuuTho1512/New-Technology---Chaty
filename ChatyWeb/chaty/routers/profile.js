const express = require("express");
const profileRouter = express.Router();
const profileController = require("../controllers/profile");
const uploadAvatar = require("../middleware/multerAvatar");

profileRouter.get("/:profileId", profileController.getWithId);

profileRouter.put("/:profileId", uploadAvatar, profileController.updateProfile);

profileRouter.get("/", profileController.getWithPhone);

profileRouter.post("/", profileController.createProfile);

profileRouter.post(
    "/suggestion/:profileId",
    profileController.getListSuggestion
);

module.exports = profileRouter;
