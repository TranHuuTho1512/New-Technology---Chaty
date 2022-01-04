const { checkInput, mergerInput } = require("../data-produce/index");
const conversationService = require("../services/conversation");
const profileService = require("../services/profile");
const { sendSuccess, sendError } = require("../results/index");
const path = require("path");

const createConversation = async (req, res) => {
    let data;
    let avatarUrl;
    data = checkInput(mergerInput(req), ["admin", "name"]);
    try {
        const file = req.file.path;
        const fileName = path.basename(file);
        avatarUrl = process.env.SERVER_DOMAIN + "/file/avatar/" + fileName;
    } catch (error) {
        avatarUrl = "";
    }

    const conversation = await conversationService.createConversation(
        data.admin,
        data.name,
        req.body.participant,
        avatarUrl
    );
    sendSuccess(res, conversation);
};

const findConByAccId = async (req, res) => {
    const accountId = req.query.id;
    const listConversation = await conversationService.findConByAccId(
        accountId
    );
    for (let i = 0; i < listConversation.length; i++) {
        if (listConversation[i].avatarRoom === "") {
            const adminProfile = await profileService.getWithId(
                listConversation[i].admin
            );
            const adminAvt = adminProfile.avatar;
            const name = adminProfile.name;
            const anotherProfile = await profileService.getWithId(
                listConversation[i].participant[1]
            );
            const anotherAvt = anotherProfile.avatar;
            const anotherName = anotherProfile.name;
            const newConversation = {
                _id: listConversation[i]._id,
                name: name,
                anotherName: anotherName,
                admin: listConversation[i].admin,
                participant: listConversation[i].participant,
                adminAvt: adminAvt,
                anotherAvt: anotherAvt,
            };
            listConversation[i] = newConversation;
        }
    }
    sendSuccess(res, listConversation);
};

const getConversationById = async (req, res) => {
    const _id = req.params.conversationId;
    const conversation = await conversationService.getConversationById(_id);
    sendSuccess(res, conversation);
};

const updateConversation = async (req, res) => {
    try {
        const _id = req.params.conversationId;
        let avatarUrl;
        let file;
        try {
            file = req.file.path;
        } catch (error) {
            if (req.body.name === undefined) {
                return res.send("Data incorrect");
            } else {
                avatarUrl = "";
                const conversation =
                    await conversationService.updateConversation(
                        _id,
                        req.body.name,
                        avatarUrl
                    );
                sendSuccess(res, conversation);
            }
        }
        if (file !== undefined) {
            const fileName = path.basename(file);
            avatarUrl = process.env.SERVER_DOMAIN + "/file/avatar/" + fileName;
        } else {
            avatarUrl = "";
        }

        if (req.body.name === undefined) {
            req.body.name = "";
        }
        const conversation = await conversationService.updateConversation(
            _id,
            req.body.name,
            avatarUrl
        );
        sendSuccess(res, conversation);
    } catch (error) {
        return true;
    }
};

const addMemToCon = async (req, res) => {
    const _id = req.params.conversationId;
    let data;
    data = checkInput(mergerInput(req), ["participant"]);
    const result = await conversationService.addMemToCon(_id, data.participant);
    if (result !== null) {
        sendSuccess(res, result);
    } else {
        sendError(res, "Failed");
    }
};

const deleteMemInCon = async (req, res) => {
    const _id = req.params.conversationId;
    let data;
    data = checkInput(mergerInput(req), ["accountId"]);
    const result = await conversationService.deleteMemInCon(
        _id,
        data.accountId
    );
    if (result !== null) {
        sendSuccess(res, result);
    } else {
        sendError(res, "Failed");
    }
};

const changeAdmin = async (req, res) => {
    const _id = req.params.conversationId;
    const oldAdmin = req.accountId;
    const result = await conversationService.changeAdmin(
        _id,
        oldAdmin,
        req.body.accountId
    );
    sendSuccess(res, result);
};

module.exports = {
    createConversation,
    findConByAccId,
    getConversationById,
    updateConversation,
    addMemToCon,
    deleteMemInCon,
    changeAdmin,
};
