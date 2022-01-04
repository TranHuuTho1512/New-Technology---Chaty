const { Server } = require("socket.io");
const service = require("./service");

const config = (server) => {
    const io = new Server(server);
    const list = (io.client = {});
    const peer = [];
    io.on("connection", (socket) => {
        const accountId = socket.handshake.query.accountId;
        const peerId = socket.handshake.query.peerId;
        io.client[accountId] = socket.id;
        peer[accountId] = peerId;
        socket.on("client-send-mess", async (data) => {
            await service.sendMessage(io, list, data, socket, accountId);
        });
        socket.on("client-send-file", async (data) => {
            await service.sendMessage(io, list, data, socket, accountId);
        });
        socket.on("client-call-video", async (data) => {
            await service.videoCall(io, list, socket, data, peer);
        });
        socket.on("off-video-call", async (data) => {
            await service.offVideoCall(io, list, data);
        });
    });
};

module.exports = { config };
