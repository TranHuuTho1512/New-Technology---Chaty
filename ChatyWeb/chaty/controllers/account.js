const { checkInput, mergerInput } = require("../data-produce/index");
const accountService = require("../services/account");
const profileService = require("../services/profile");
const adminService = require("../services/admin");
const { sendSuccess, sendError } = require("../results/index");

const registerAccount = async (req, res) => {
    let data;
    data = checkInput(mergerInput(req), ["phone", "email", "password"]);
    const account = await accountService.createAccount(
        data.phone,
        data.email,
        data.password
    );
    sendSuccess(res, account);
};

const getAccount = async (req, res) => {
    const _id = req.params.accountId;
    const result = await accountService.getAccount(_id);
    if (result !== null) {
        sendSuccess(res, result);
    } else {
        sendError(res, "Not found account!");
    }
};

const sendActiveKey = async (req, res) => {
    let data;
    data = checkInput(mergerInput(req), ["_id"]);
    const result = await accountService.sendActiveKey(data._id);
    if (result !== null) {
        sendSuccess(res, "active key has sent");
    } else {
        sendSuccess(res, "failed");
    }
};

const sendResetPasswordKey = async (req, res) => {
    let data;
    data = checkInput(mergerInput(req), ["email", "phone"]);
    const result = await accountService.sendResetPasswordKey(
        data.email,
        data.phone
    );
    if (result) {
        sendSuccess(res, "your reset password code has sent");
    } else {
        sendError(res, "not found account");
    }
};

const recoveryPassword = async (req, res) => {
    let data;
    data = checkInput(mergerInput(req), [
        "email",
        "phone",
        "resetPasswordKey",
        "newPassword",
    ]);
    const result = await accountService.recoveryPassword(
        data.email,
        data.phone,
        data.resetPasswordKey,
        data.newPassword
    );
    if (result !== null) {
        sendSuccess(res, result);
    } else {
        sendError(res, "Failed to change password");
    }
};

const activeAccount = async (req, res) => {
    let data;
    data = checkInput(mergerInput(req), ["_id", "key"]);
    const account = await accountService.activeAccount(data._id, data.key);
    if (account !== null) {
        sendSuccess(res, "Account was actived");
    } else {
        sendSuccess(res, "Failed");
    }
};

const authenticateAccount = async (req, res) => {
    let data;
    data = checkInput(mergerInput(req), ["phone", "password"]);
    const result = await accountService.authenticateAccount(
        data.phone,
        data.password
    );
    if (result !== null) {
        sendSuccess(res, result);
    } else {
        sendError(res, "Phone or password was wrong");
    }
};

const changePassword = async (req, res) => {
    let data;
    const _id = req.params.accountId;
    data = checkInput(mergerInput(req), ["password"]);
    const result = await accountService.changePassword(_id, data.password);
    if (result !== null) {
        sendSuccess(res, "Password has changed");
    } else {
        sendError(res, "Failed to change password");
    }
};

const deleteAccount = async (req, res) => {
    let data;
    const _id = req.params.accountId;
    data = checkInput(mergerInput(req), ["password"]);
    const result = await accountService.deleteAccount(_id, data.password);
    sendSuccess(res, result);
};

const getListFriend = async (req, res) => {
    const _id = req.params.accountId;
    let listFriend = [];
    const list = await accountService.getListFriend(_id);
    for (let i = 0; i < list.length; i++) {
        const profile = await profileService.getWithId(list[i]);
        listFriend.push(profile);
    }
    sendSuccess(res, listFriend);
};

const deleteFriend = async (req, res) => {
    let data;
    let listFriend = [];
    const _id = req.params.accountId;
    data = checkInput(mergerInput(req), ["friendId"]);
    const list = await accountService.deleteFriend(_id, data.friendId);
    for (let i = 0; i < list.length; i++) {
        const profile = await profileService.getWithId(list[i]);
        listFriend.push(profile);
    }
    if (list != null) {
        sendSuccess(res, listFriend);
    } else {
        sendError(res, "Failed to remove this friend");
    }
};

const blockFriend = async (req, res) => {
    let data;
    let blockList = [];
    const _id = req.params.accountId;
    data = checkInput(mergerInput(req), ["blockId"]);
    const list = await accountService.blockFriend(_id, data.blockId);
    for (let i = 0; i < list.length; i++) {
        const profile = await profileService.getWithId(list[i]);
        blockList.push(profile);
    }
    if (list !== null) {
        sendSuccess(res, blockList);
    } else {
        sendError(res, "Failed to block this friend");
    }
};

const unblockFriend = async (req, res) => {
    let data;
    let blockList = [];
    const _id = req.params.accountId;
    data = checkInput(mergerInput(req), ["blockId"]);
    const list = await accountService.unblockFriend(_id, data.blockId);
    for (let i = 0; i < list.length; i++) {
        const profile = await profileService.getWithId(list[i]);
        blockList.push(profile);
    }
    if (list !== null) {
        sendSuccess(res, blockList);
    } else {
        sendError(res, "Failed to unblock this friend");
    }
};

const getBlockList = async (req, res) => {
    const _id = req.params.accountId;
    let blockList = [];
    const list = await accountService.getBlockList(_id);
    for (let i = 0; i < list.length; i++) {
        const profile = await profileService.getWithId(list[i]);
        blockList.push(profile);
    }
    sendSuccess(res, blockList);
};
const getAllAccount = async (req, res) => {
    const check = await adminService.isAdmin(req.accountId);
    if (check) {
        const pageNumber = Number(req.query.pageNumber) || 1;
        const pageLimit = Number(req.query.pageLimit) || 5;
        const result = await accountService.getAllAccount(
            pageNumber,
            pageLimit
        );
        sendSuccess(res, result);
    } else {
        sendError(res, "You not an admin");
    }
};
module.exports = {
    registerAccount,
    sendActiveKey,
    activeAccount,
    getListFriend,
    authenticateAccount,
    deleteFriend,
    getAccount,
    changePassword,
    deleteAccount,
    blockFriend,
    unblockFriend,
    getBlockList,
    sendResetPasswordKey,
    recoveryPassword,
    getAllAccount,
};
