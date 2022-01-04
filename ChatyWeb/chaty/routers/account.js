const express = require("express");
const accountRouter = express.Router();
const accountController = require("../controllers/account");

accountRouter.get("/", accountController.getAllAccount);

accountRouter.get("/:accountId", accountController.getAccount);

accountRouter.put("/:accountId", accountController.changePassword);

accountRouter.delete("/:accountId", accountController.deleteAccount);

accountRouter.get("/friend/able/:accountId", accountController.getListFriend);

accountRouter.post("/friend/block/:accountId", accountController.blockFriend);

accountRouter.get("/friend/block/:accountId", accountController.getBlockList);

accountRouter.delete(
    "/friend/block/:accountId",
    accountController.unblockFriend
);

accountRouter.delete("/friend/:accountId", accountController.deleteFriend);

module.exports = accountRouter;
