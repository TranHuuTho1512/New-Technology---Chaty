const adminService = require("../services/admin");
const { sendSuccess, sendError } = require("../results/index");

const authenticateAdmin = async (req, res) => {
    const result = await adminService.authenticateAdmin(
        req.body.adminCode,
        req.body.password
    );
    if (result !== null) {
        sendSuccess(res, result);
    } else {
        sendError(res, "Failed");
    }
};
const changePassword = async (req, res) => {
    const _id = req.params.adminId;
    const result = await adminService.changePassword(_id, req.body.password);
    if (result !== null) {
        sendSuccess(res, "Password has changed");
    } else {
        sendError(res, "Failed to change password");
    }
};

const blockUser = async (req, res) => {
    const check = await adminService.isAdmin(req.accountId);
    if (check) {
        const result = await adminService.blockUser(req.body._id);
        sendSuccess(res, result);
    } else {
        sendError(res, "You not an admin");
    }
};

const unblockUser = async (req, res) => {
    const check = await adminService.isAdmin(req.accountId);
    if (check) {
        const result = await adminService.unblockUser(req.body._id);
        sendSuccess(res, result);
    } else {
        sendError(res, "You not an admin");
    }
};

const getAllUser = async (req, res) => {
    const check = await adminService.isAdmin(req.accountId);
    if (check) {
        const result = await adminService.getAllUser();
        sendSuccess(res, result);
    } else {
        sendError(res, "You not an admin");
    }
};
module.exports = {
    authenticateAdmin,
    changePassword,
    blockUser,
    unblockUser,
    getAllUser,
};
