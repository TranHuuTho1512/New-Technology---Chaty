const requestModel = require("../model/request");

async function addFriend(
    senderProfile,
    senderPhone,
    receiverProfile,
    receiverPhone,
    description
) {
    const sender = {
        avatar: senderProfile.avatar,
        phone: senderPhone,
        name: senderProfile.name,
    };
    const receiver = {
        avatar: receiverProfile.avatar,
        phone: receiverPhone,
        name: receiverProfile.name,
    };
    let request;
    try {
        request = new requestModel({ sender, receiver, description });
        await request.save();
        return request;
    } catch (error) {
        return null;
    }
}

async function getListRequest(receiver) {
    let listRequest;
    try {
        listRequest = await requestModel.find({
            receiver: receiver,
            status: false,
        });

        return listRequest;
    } catch (error) {
        return null;
    }
}

async function getSendRequest(sender) {
    let listRequest;
    try {
        listRequest = await requestModel.find({
            sender: sender,
            status: false,
        });

        return listRequest;
    } catch (error) {
        return null;
    }
}

async function updateRequest(_id) {
    let request;
    try {
        request = await requestModel.findByIdAndUpdate(_id, { status: true });
        return request;
    } catch (error) {
        return null;
    }
}

async function deleteRequest(_id) {
    let request;
    try {
        request = await requestModel.findById(_id);
        if (request.status === false) {
            request = await requestModel.findByIdAndDelete(request._id);
        } else {
            return null;
        }
        return request;
    } catch (error) {
        return null;
    }
}

module.exports = {
    addFriend,
    getListRequest,
    getSendRequest,
    updateRequest,
    deleteRequest,
};
