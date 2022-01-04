const { checkInput, mergerInput } = require("../data-produce/index");
const requestService = require("../services/request");
const profileService = require("../services/profile");
const accountService = require("../services/account");
const { sendSuccess, sendError } = require("../results/index");

const addFriend = async (req, res) => {
    let data;
    const _id = req.accountId;
    data = checkInput(mergerInput(req), ["sender", "receiver", "description"]);
    const sender = await accountService.findByPhone(_id, data.sender);
    const receiver = await accountService.findByPhone(_id, data.receiver);
    const senderProfile = await profileService.getWithId(sender._id);
    const receiverProfile = await profileService.getWithId(receiver._id);
    request = await requestService.addFriend(
        senderProfile,
        data.sender,
        receiverProfile,
        data.receiver,
        data.description
    );
    if (request !== null) {
        sendSuccess(res, "Your request has sent");
    } else {
        sendError(res, "Failed!!!");
    }
};

const getListRequest = async (req, res) => {
    const _id = req.accountId;
    const phone = req.params.phone;
    const account = await accountService.findByPhone(_id, phone);
    const profile = await profileService.getWithId(account._id);
    const receiver = {
        avatar: profile.avatar,
        phone: phone,
        name: profile.name,
    };
    const listRequest = await requestService.getListRequest(receiver);
    sendSuccess(res, listRequest);
};

const getSendRequest = async (req, res) => {
    const _id = req.accountId;
    const phone = req.params.phone;
    const account = await accountService.findByPhone(_id, phone);
    const profile = await profileService.getWithId(account._id);
    const sender = {
        avatar: profile.avatar,
        phone: phone,
        name: profile.name,
    };
    const listRequest = await requestService.getSendRequest(sender);
    sendSuccess(res, listRequest);
};

const updateRequest = async (req, res) => {
    const id = req.accountId;
    const _id = req.params.requestId;
    const request = await requestService.updateRequest(_id);
    const sender = request.sender;
    const receiver = request.receiver;
    const account1 = await accountService.findByPhone(id, sender.phone);
    const account2 = await accountService.findByPhone(id, receiver.phone);
    if (request !== null) {
        accountService.addNewFriend(account1._id, account2._id);
        sendSuccess(res, "Request has accepted");
    } else {
        sendError(res, "Failed!");
    }
};

const deleteRequest = async (req, res) => {
    const _id = req.params.requestId;
    const result = await requestService.deleteRequest(_id);
    if (result !== null) {
        sendSuccess(res, "Request has deleted");
    } else {
        sendError(res, "Failed!");
    }
};

module.exports = {
    addFriend,
    getListRequest,
    getSendRequest,
    updateRequest,
    deleteRequest,
};
