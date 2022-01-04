const adminModel = require("../model/admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const accountService = require("./account");

async function authenticateAdmin(adminCode, password) {
    let admin;
    let token;
    try {
        admin = await adminModel.findOne({ adminCode: adminCode });
        if (admin && (await bcrypt.compare(password, admin.password))) {
            if (admin.status === 1) {
                token = jwt.sign(
                    {
                        accountId: admin._id,
                        phone: admin.phone,
                    },
                    process.env.SECRET_KEY,
                    {
                        expiresIn: "8h",
                    }
                );
                const result = {
                    accountId: admin._id,
                    phone: admin.phone,
                    email: admin.email,
                    token: "Bearer " + token,
                };
                return result;
            } else {
                return "Account blocked";
            }
        } else {
            return "Code or password wrong";
        }
    } catch (error) {
        return null;
    }
}

async function isAdmin(_id) {
    if (await adminModel.exists({ _id: _id })) {
        return true;
    } else {
        return false;
    }
}
async function changePassword(_id, password) {
    const newPassword = await bcrypt.hash(password, 1);
    try {
        const admin = await adminModel.findByIdAndUpdate(_id, {
            password: newPassword,
        });
        return admin;
    } catch (error) {
        return null;
    }
}

async function blockUser(accountId) {
    const result = await accountService.changeStatusAccount(accountId, -1);
    if (result) {
        return "Blocked";
    } else {
        return "Failed to block";
    }
}
async function unblockUser(accountId) {
    const result = await accountService.changeStatusAccount(accountId, 1);
    if (result) {
        return "Unblocked";
    } else {
        return "Failed to unblock";
    }
}

module.exports = {
    authenticateAdmin,
    changePassword,
    isAdmin,
    blockUser,
    unblockUser,
};
