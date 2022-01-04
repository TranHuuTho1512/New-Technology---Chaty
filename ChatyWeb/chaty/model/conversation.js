const mongoose = require("mongoose");

const conversationSchema = mongoose.Schema({
    admin: {
        type: mongoose.Types.ObjectId,
        require: true,
        ref: "accounts",
    },
    name: { type: String, require: true },
    participant: {
        type: [
            {
                type: mongoose.Types.ObjectId,
                require: true,
                ref: "accounts",
            },
        ],
    },
    avatarRoom: { type: String, default: "" },
});

module.exports = mongoose.model("conversations", conversationSchema);
