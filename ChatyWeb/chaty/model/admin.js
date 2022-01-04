const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
    adminCode: { type: String, unique: true, require: true, index: true },
    phone: { type: String, unique: true, require: true, index: true },
    email: { type: String, unique: true, require: true, index: true },
    password: { type: String, require: true },
    status: { type: Number, require: true, default: 1 },
    resetPasswordKey: { type: String, default: "" },
});

module.exports = mongoose.model("admins", adminSchema);
