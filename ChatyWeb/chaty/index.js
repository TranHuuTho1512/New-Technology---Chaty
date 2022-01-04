const http = require("http");
const PORT = process.env.PORT || 5000;
const app = require("./app");
const socket = require("./socket/config");

const server = http.createServer(app);
socket.config(server);
server.listen(PORT);
