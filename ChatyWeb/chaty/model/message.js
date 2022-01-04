const mongoose = require("mongoose");

const messageSchema = mongoose.Schema({
    sender: { type: mongoose.Types.ObjectId, require: true, ref: "accounts" },
    name: { type: String, require: true },
    body: { type: String, require: true },
    avatar: { type: String, require: true },
    conversation: {
        type: mongoose.Types.ObjectId,
        require: true,
        ref: "conversations",
    },
    sendAt: { type: Date, require: true },
});

module.exports = mongoose.model("messages", messageSchema);
