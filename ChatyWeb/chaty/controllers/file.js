const path = require("path");
const { sendSuccess, sendError } = require("../results/index");

const getMessageFile = async (req, res) => {
    const file = req.file.path;
    const fileName = path.basename(file);
    const urlFile = process.env.SERVER_DOMAIN + "/file/" + fileName;
    sendSuccess(res, urlFile);
};

const downloadMessageFile = async (req, res) => {
    const fileName = req.params.name;
    const directoryPath = process.cwd() + "/public/files/";
    res.download(directoryPath + fileName);
};

const downloadAvatar = async (req, res) => {
    const fileName = req.params.name;
    const directoryPath = process.cwd() + "/public/images/";
    res.download(directoryPath + fileName);
};

module.exports = {
    getMessageFile,
    downloadMessageFile,
    downloadAvatar,
};
