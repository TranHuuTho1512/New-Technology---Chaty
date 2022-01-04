const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
    phone: { type: String, unique: true, require: true, index: true },
    email: { type: String, unique: true, require: true, index: true },
    password: { type: String, require: true },
    status: { type: Number, require: true, default: 0 },
    activeKey: { type: String, require: true, default: "" },
    resetPasswordKey: { type: String, default: "" },
    friend: {
        type: [
            {
                type: mongoose.Types.ObjectId,
                require: true,
                default: null,
            },
        ],
    },
    block: {
        type: [
            {
                type: mongoose.Types.ObjectId,
                require: true,
                default: null,
            },
        ],
    },
});

module.exports = mongoose.model("accounts", accountSchema);
