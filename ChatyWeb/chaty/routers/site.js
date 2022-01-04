const express = require("express");
const siteRouter = express.Router();
const accountController = require("../controllers/account");
const adminController = require("../controllers/admin");

siteRouter.post("/signin", accountController.authenticateAccount);

siteRouter.post("/signup", accountController.registerAccount);

siteRouter.post("/auth", accountController.activeAccount);

siteRouter.post("/active", accountController.sendActiveKey);

siteRouter.post("/forgot", accountController.sendResetPasswordKey);

siteRouter.post("/recovery", accountController.recoveryPassword);

siteRouter.post("/admin/signin", adminController.authenticateAdmin);

module.exports = siteRouter;
