const multer = require("multer");
const createStorage = require("./multerStorage");
const MINE_TYPE = ["image/png", "image/jpeg", "image/jpg"];
module.exports = multer({
    storage: createStorage(MINE_TYPE, "public/images"),
}).single("avatar");
