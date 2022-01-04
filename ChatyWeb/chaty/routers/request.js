const express = require("express");
const requestRouter = express.Router();
const requestController = require("../controllers/request");

requestRouter.get("/receiver/:phone", requestController.getListRequest);

requestRouter.get("/sender/:phone", requestController.getSendRequest);

requestRouter.post("/", requestController.addFriend);

requestRouter.put("/:requestId", requestController.updateRequest);

requestRouter.delete("/:requestId", requestController.deleteRequest);

module.exports = requestRouter;
