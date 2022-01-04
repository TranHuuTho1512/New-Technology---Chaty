const mongoose = require("mongoose");

const requestSchema = mongoose.Schema({
    sender: {
        type: {
            avatar: { type: String, require: true },
            phone: { type: String, require: true },
            name: { type: String, require: true },
        },
        require: true,
        ref: "account",
    },

    receiver: {
        type: {
            avatar: { type: String, require: true },
            phone: { type: String, require: true },
            name: { type: String, require: true },
        },
        require: true,
        ref: "account",
    },

    description: { type: String, default: "Xin chào, làm quen nhé" },

    status: { type: Boolean, require: true, default: false },
});

module.exports = mongoose.model("request", requestSchema);
