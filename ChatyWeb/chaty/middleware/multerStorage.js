const multer = require("multer");
const path = require("path");

const createStorage = (types, dest) => {
    return (storage = multer.diskStorage({
        destination: (req, file, callback) => {
            const check = types.some((type) =>
                new RegExp(type).test(file.mimetype)
            );
            let err = new Error("invalid type image");
            if (check) {
                err = null;
            }
            callback(err, dest);
        },
        filename: (req, file, callback) => {
            const name = file.originalname
                .toLocaleLowerCase()
                .split(".")
                .join("-");
            const extention = path.extname(file.originalname);
            callback(null, name + "-" + Date.now() + extention);
        },
    }));
};
module.exports = createStorage;
