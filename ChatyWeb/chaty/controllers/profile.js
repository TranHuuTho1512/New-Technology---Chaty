const { checkInput, mergerInput } = require("../data-produce/index");
const profileService = require("../services/profile");
const accountService = require("../services/account");
const { sendSuccess, sendError } = require("../results/index");
const path = require("path");

const createProfile = async (req, res) => {
    let data;
    data = checkInput(mergerInput(req), ["_id", "name", "sex", "dob"]);
    const profile = await profileService.createWithAccountId(
        data._id,
        data.name,
        data.sex,
        data.dob
    );
    if (profile !== null) {
        sendSuccess(res, profile);
    } else {
        sendError(res, "Profile has created");
    }
};

const getWithId = async (req, res) => {
    const _id = req.params.profileId;
    const profile = await profileService.getWithId(_id);
    sendSuccess(res, profile);
};

const updateProfile = async (req, res) => {
    let avatar;
    let _id = req.params.profileId;
    try {
        const file = req.file.path;
        const fileName = path.basename(file);

        const avatarUrl =
            process.env.SERVER_DOMAIN + "/file/avatar/" + fileName;
        avatar = avatarUrl;
    } catch (error) {
        const p = await profileService.getWithId(_id);
        if (p.avatar !== null) {
            avatar = p.avatar;
        } else {
            avatar = null;
        }
    }
    let data;
    data = checkInput(mergerInput(req), ["name", "sex", "dob"]);
    const profile = await profileService.updateProfile(
        _id,
        avatar,
        data.name,
        data.sex,
        data.dob
    );
    if (profile !== null) {
        sendSuccess(res, profile);
    } else {
        sendError(res, "Failed!");
    }
};

const getWithPhone = async (req, res) => {
    const _id = req.accountId;
    const phone = req.query.phone;
    const account = await accountService.findByPhone(_id, phone);
    if (account !== null) {
        const profile = await profileService.getWithId(account._id);
        const result = {
            ...profile,
            isFriend: account.isFriend,
        };
        sendSuccess(res, result);
    } else {
        sendError(res, "Not found!!!");
    }
};

const getListSuggestion = async (req, res) => {
    let data;
    const _id = req.params.profileId;
    data = checkInput(mergerInput(req), ["suggestion"]);
    const listAccountId = await accountService.getListSuggestion(
        _id,
        data.suggestion
    );
    const listProfileSuggestion = await profileService.getProfileSuggestion(
        listAccountId
    );
    for (let i = 0; i < listProfileSuggestion.length; i++) {
        const phone = await accountService.getAccount(
            listProfileSuggestion[i]._id
        );
        listProfileSuggestion[i] = {
            phone: phone,
            ...listProfileSuggestion[i].toObject(),
        };
    }
    sendSuccess(res, listProfileSuggestion);
};

module.exports = {
    createProfile,
    getWithId,
    updateProfile,
    getWithPhone,
    getListSuggestion,
};
