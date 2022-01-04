const messageModel = require("../model/message");
const profileService = require("../services/profile");

async function saveMessage(sender, body, conversation, sendAt) {
    let message;
    const profile = await profileService.getWithId(sender);
    const name = profile.name;
    const avatar = profile.avatar;
    try {
        message = new messageModel({
            sender,
            name,
            body,
            avatar,
            conversation,
            sendAt,
        });
        await message.save();
        return message;
    } catch (error) {
        return null;
    }
}

async function getMessByConId(_id) {
    let listMessage;
    try {
        listMessage = await messageModel
            .find({ conversation: _id })
            .sort({ sendAt: -1 })
            .limit(10);
        return listMessage;
    } catch (error) {
        return null;
    }
}

module.exports = { saveMessage, getMessByConId };
