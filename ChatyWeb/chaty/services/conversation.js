const conversationModel = require("../model/conversation");
const accountModel = require("../model/account");
const { AVATAR_GROUP } = require("../constants/avatar");

async function createConversation(admin, name, participant, avatarRoom) {
    const check = await conversationModel.findOne({
        participant: participant,
    });
    const checkReverse = await conversationModel.findOne({
        participant: participant.reverse(),
    });

    if (
        (check !== null && check.participant.length === 2) ||
        (checkReverse !== null && checkReverse.participant.length === 2)
    ) {
        if (check === null) {
            return checkReverse._id;
        } else {
            return check._id;
        }
    } else {
        if (participant.length > 2 && avatarRoom === "") {
            avatarRoom = AVATAR_GROUP;
        }
        let conversation;
        try {
            const reverseParticipant = participant.reverse();
            conversation = new conversationModel({
                admin,
                name,
                participant: reverseParticipant,
                avatarRoom,
            });
            await conversation.save();
            return conversation;
        } catch (error) {
            console.log(error);
            return null;
        }
    }
}

async function updateConversation(_id, name, avatarRoom) {
    try {
        let conversation;
        if (avatarRoom !== "" && name !== "") {
            conversation = await conversationModel.findByIdAndUpdate(_id, {
                name: name,
                avatarRoom: avatarRoom,
            });
        } else {
            if (avatarRoom !== "") {
                conversation = await conversationModel.findByIdAndUpdate(_id, {
                    avatarRoom: avatarRoom,
                });
            } else {
                conversation = await conversationModel.findByIdAndUpdate(_id, {
                    name: name,
                });
            }
        }
        const newConversation = await conversationModel.findById(_id);
        return newConversation;
    } catch (error) {
        return null;
    }
}

async function findConByAccId(accountId) {
    let listConversation;
    try {
        listConversation = await conversationModel.find({
            participant: accountId,
        });
        return listConversation;
    } catch (error) {
        return null;
    }
}

async function getConversationById(_id) {
    let conversation;
    try {
        conversation = await conversationModel.findById(_id);
        return conversation;
    } catch (error) {
        return null;
    }
}

async function findMemByConId(_id) {
    let listMem;
    try {
        const conversation = await conversationModel.findById(_id);
        listMem = conversation.participant;
        return listMem;
    } catch (error) {
        return null;
    }
}

async function addMemToCon(_id, listAccountId) {
    try {
        const conversation = await conversationModel.findById(_id);
        for (i = 0; i < listAccountId.length; i++) {
            const account = await accountModel.findById(listAccountId[i]);
            await conversation.participant.push(account._id);
        }
        await conversation.save();
        return conversation._id;
    } catch (error) {
        console.log(error);
        return null;
    }
}

async function deleteMemInCon(_id, accountId) {
    try {
        const conversation = await conversationModel.findById(_id);
        if (accountId == conversation.admin) {
            return "Change admin before out room";
        } else {
            await conversation.participant.remove(accountId);
            if (conversation.participant.length < 3) {
                await deleteConversation(conversation._id);
                return;
            } else {
                await conversation.save();
                return conversation._id;
            }
        }
    } catch (error) {
        return null;
    }
}

async function deleteConversation(_id) {
    try {
        await conversationModel.findByIdAndDelete(_id);
        return true;
    } catch (error) {
        return false;
    }
}

async function changeAdmin(_id, oldAdmin, newAdmin) {
    let conversation;
    conversation = await conversationModel.findById(_id);
    if (conversation.admin == oldAdmin) {
        await conversationModel.updateOne({ _id: _id }, { admin: newAdmin });
        conversation = await conversationModel.findById(_id);
        return conversation;
    } else {
        return "You are not admin";
    }
}

module.exports = {
    createConversation,
    findConByAccId,
    getConversationById,
    findMemByConId,
    updateConversation,
    addMemToCon,
    deleteMemInCon,
    deleteConversation,
    changeAdmin,
};
