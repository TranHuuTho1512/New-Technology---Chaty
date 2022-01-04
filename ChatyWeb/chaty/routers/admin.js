const express = require("express");
const adminRouter = express.Router();
const adminController = require("../controllers/admin");

adminRouter.put("/:adminId", adminController.changePassword);
adminRouter.post("/block", adminController.blockUser);
adminRouter.post("/unblock", adminController.unblockUser);

module.exports = adminRouter;
