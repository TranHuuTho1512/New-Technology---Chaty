const mongoose = require("mongoose");
const { AVATAR_DEFAULT } = require("../constants/avatar");

const profileSchema = new mongoose.Schema({
    name: { type: String, require: true },
    avatar: { type: String, require: true, default: AVATAR_DEFAULT },
    sex: { type: Boolean, require: true },
    dob: { type: String, require: true },
});

module.exports = mongoose.model("profiles", profileSchema);
