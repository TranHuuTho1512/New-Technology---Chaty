const messageService = require("../services/message");
const profileService = require("../services/profile");
const conversationService = require("../services/conversation");
const accountService = require("../services/account");

const sendMessage = async (io, list, data, socket, accountId) => {
    const profile = await profileService.getWithId(data._id);
    const listMember = await conversationService.findMemByConId(
        data.conversation
    );
    const fileName = data.content.split("/").pop();
    if (listMember.length === 2) {
        const check = await accountService.checkBlockAccount(
            listMember[0],
            listMember[1]
        );
        if (check !== -1) {
            if (check.isBlock == accountId) {
                const notify = await profileService.getWithId(check.blocker);
                socket.emit("server-send-mess", {
                    id: profile._id,
                    avatar: profile.avatar,
                    name: profile.name,
                    data: data.content,
                    fileName: fileName,
                });
                socket.emit("server-send-mess", {
                    id: notify._id,
                    avatar: notify.avatar,
                    name: notify.name,
                    data: "Xin lỗi, hiện tại tôi không muốn nhận tin nhắn từ cuộc trò chuyện này",
                    fileName: fileName,
                });
            } else {
                await messageService.saveMessage(
                    data._id,
                    data.content,
                    data.conversation,
                    data.sendAt
                );
                for (const element in list) {
                    if (listMember.indexOf(element) >= 0) {
                        io.to(list[element]).emit("server-send-mess", {
                            id: profile._id,
                            avatar: profile.avatar,
                            name: profile.name,
                            data: data.content,
                            fileName: fileName,
                        });
                    }
                }
            }
        } else {
            await messageService.saveMessage(
                data._id,
                data.content,
                data.conversation,
                data.sendAt
            );
            for (const element in list) {
                if (listMember.indexOf(element) >= 0) {
                    io.to(list[element]).emit("server-send-mess", {
                        id: profile._id,
                        avatar: profile.avatar,
                        name: profile.name,
                        data: data.content,
                        fileName: fileName,
                    });
                }
            }
        }
    } else {
        await messageService.saveMessage(
            data._id,
            data.content,
            data.conversation,
            data.sendAt
        );
        for (const element in list) {
            if (listMember.indexOf(element) >= 0) {
                io.to(list[element]).emit("server-send-mess", {
                    id: profile._id,
                    avatar: profile.avatar,
                    name: profile.name,
                    data: data.content,
                    fileName: fileName,
                });
            }
        }
    }
};
const videoCall = async (io, list, socket, data, peer) => {
    const listMember = await conversationService.findMemByConId(
        data.conversation
    );
    for (let accountId in peer) {
        if (accountId != data._id && listMember.indexOf(accountId) != -1) {
            socket.emit("server-send-peer", {
                peerId: peer[accountId],
            });
            const profile = await profileService.getWithId(data._id);
            io.to(list[accountId]).emit("client-call-video", {
                from: profile.name,
            });
        }
    }
};

const offVideoCall = async (io, list, data) => {
    const listMember = await conversationService.findMemByConId(
        data.conversation
    );
    for (const element in list) {
        if (listMember.indexOf(element) != -1) {
            io.to(list[element]).emit("server-turnoff-call", {
                message: "Cuộc gọi đã kết thúc",
            });
        }
    }
};

module.exports = { sendMessage, videoCall, offVideoCall };
