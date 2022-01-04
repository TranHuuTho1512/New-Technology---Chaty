const profileModel = require("../model/profile");

async function createWithAccountId(_id, name, sex, dob) {
    let profile;
    try {
        profile = new profileModel({ _id, name, sex, dob });
        await profile.save();
        return profile;
    } catch (error) {
        return null;
    }
}

async function getWithId(_id) {
    let profile;
    try {
        profile = await profileModel.findById(_id);
        return profile.toObject();
    } catch (error) {
        return null;
    }
}

async function updateProfile(_id, avatar, name, sex, dob) {
    let profile;
    try {
        profile = await profileModel.findByIdAndUpdate(_id, {
            name: name,
            avatar: avatar,
            sex: sex,
            dob: dob,
        });
        profile = await profileModel.findById(_id);
        return profile;
    } catch (error) {
        return null;
    }
}

async function getProfileSuggestion(listAccountId) {
    try {
        let listProfile = [];
        for (let i = 0; i < listAccountId.length; i++) {
            const profile = await profileModel.findById(listAccountId[i]);
            if (profile !== null) {
                listProfile.push(profile);
            }
        }
        return listProfile;
    } catch (error) {
        return null;
    }
}

module.exports = {
    createWithAccountId,
    getWithId,
    updateProfile,
    getProfileSuggestion,
};
