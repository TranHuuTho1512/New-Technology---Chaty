const express = require("express");
const conversationRouter = express.Router();
const conversationController = require("../controllers/conversation");
const uploadAvatar = require("../middleware/multerAvatar");

conversationRouter.get("/", conversationController.findConByAccId);

conversationRouter.post(
    "/",
    uploadAvatar,
    conversationController.createConversation
);

conversationRouter.get(
    "/:conversationId",
    conversationController.getConversationById
);

conversationRouter.put(
    "/:conversationId",
    uploadAvatar,
    conversationController.updateConversation
);

conversationRouter.post(
    "/member/:conversationId",
    conversationController.addMemToCon
);
conversationRouter.delete(
    "/member/:conversationId",
    conversationController.deleteMemInCon
);

conversationRouter.put(
    "/admin/:conversationId",
    conversationController.changeAdmin
);

module.exports = conversationRouter;
