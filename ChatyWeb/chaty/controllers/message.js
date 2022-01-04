const messageService = require("../services/message");
const { checkInput, mergerInput } = require("../data-produce/index");
const { sendSuccess, sendError } = require("../results/index");

const saveMessage = async (req, res) => {
    let data;
    data = checkInput(mergerInput(req), ["sender", "body", "conversation"]);
    const message = await messageService.saveMessage(
        data.sender,
        data.body,
        data.conversation
    );
    sendSuccess(res, message);
};

const getMessByConId = async (req, res) => {
    const _id = req.query.conversationId;
    const list = await messageService.getMessByConId(_id);
    sendSuccess(res, list);
};

module.exports = {
    saveMessage,
    getMessByConId,
};
