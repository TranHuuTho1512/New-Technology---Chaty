const multer = require("multer");
const createStorage = require("./multerStorage");

const MINE_TYPE = [
    "image/png",
    "image/jpeg",
    "image/jpg",
    "application/msword",
    "application/vnd.rar",
    "application/pdf",
    "video/mp4",
    "audio/mpeg",
];
module.exports = multer({
    storage: createStorage(MINE_TYPE, "public/files"),
}).single("file");
