const accountModel = require("../model/account");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const profileService = require("./profile");
const conversationService = require("./conversation");
const nodeMailer = require("nodemailer");

async function createAccount(phone, email, password) {
    const check = await accountModel.findOne({ phone: phone });
    if (check !== null) {
        if (check.status === 0) {
            const result = {
                message: "Your account was registry but don't active",
                _id: check._id,
                email: check.email,
            };
            return result;
        } else if (check.status === 1) {
            return "Account was exists";
        }
    } else {
        if ((await accountModel.findOne({ email: email })) !== null) {
            return "Email was exists";
        } else {
            let account;
            try {
                password = await bcrypt.hash(password, 1);
                account = new accountModel({ phone, email, password });
                account.save();
            } catch (error) {
                return null;
            }
            return account;
        }
    }
}

async function getAccount(_id) {
    let account;
    try {
        account = await accountModel.findById(_id);
        return account.phone;
    } catch (error) {
        return null;
    }
}

async function getAccountById(_id) {
    try {
        const account = await accountModel.findById(_id);
        return account;
    } catch (error) {
        return null;
    }
}

async function sendActiveKey(_id) {
    let account;
    const key = Math.trunc(Math.random() * 800000 + 100000);
    account = await accountModel.findById(_id);
    const transporter = nodeMailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.CHATY_EMAIL,
            pass: process.env.CHATY_EMAIL_PASSWORD,
        },
    });
    const mailOptions = {
        from: "CHATY",
        to: account.email,
        subject: "Verify code for your CHATY account 🤝",
        html: `<div style='text-align: center'>    
                    <h1 style='color:#0B6FFB'>Welcome to CHATY</h1>
                    <p>This is your verify code:<span style='color:#0B6FFB'><b> ${key}</b> </span></p>
                </div>`,
    };
    await transporter.sendMail(mailOptions);
    account = await accountModel.findByIdAndUpdate(_id, {
        activeKey: String(key),
    });
    return account;
}

async function activeAccount(_id, key) {
    const account = await accountModel.findOneAndUpdate(
        { _id: _id, activeKey: key },
        {
            status: 1,
        }
    );
    return account;
}

async function authenticateAccount(phone, password) {
    let account;
    let token;
    let profileId;
    try {
        account = await accountModel.findOne({ phone: phone });
        if (account && (await bcrypt.compare(password, account.password))) {
            if (account.status === 1) {
                token = jwt.sign(
                    {
                        accountId: account._id,
                        phone: account.phone,
                    },
                    process.env.SECRET_KEY,
                    {
                        expiresIn: "8h",
                    }
                );
                const profile = await profileService.getWithId(account._id);
                if (profile != null) {
                    profileId = profile._id;
                } else {
                    profileId = null;
                }
                const result = {
                    accountId: account._id,
                    profileId: profileId,
                    phone: account.phone,
                    email: account.email,
                    token: "Bearer " + token,
                    status: account.status,
                };
                return result;
            } else {
                if (account.status === 0) {
                    const error = {
                        message: "Your account don't active, active now!",
                        status: account.status,
                        _id: account._id,
                        email: account.email,
                    };
                    return error;
                } else {
                    return "Your account was blocked by admin";
                }
            }
        } else {
            return null;
        }
    } catch (error) {
        return null;
    }
}

async function changePassword(_id, password) {
    const newPassword = await bcrypt.hash(password, 1);
    try {
        const account = await accountModel.findByIdAndUpdate(_id, {
            password: newPassword,
        });
        return account;
    } catch (error) {
        return null;
    }
}

async function sendResetPasswordKey(email, phone) {
    try {
        const account = await accountModel.findOne({
            email: email,
            phone: phone,
        });
        if (account !== null) {
            const key = Math.trunc(Math.random() * 800000 + 100000);
            const transporter = nodeMailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false,
                auth: {
                    user: process.env.CHATY_EMAIL,
                    pass: process.env.CHATY_EMAIL_PASSWORD,
                },
            });
            const mailOptions = {
                from: "CHATY",
                to: email,
                subject: "Reset password code for your CHATY account 🔑",
                html: `<div style='text-align: center'>    
                            <h1 style='color:#0B6FFB'>Welcome to CHATY</h1>
                            <p>This is your code:<span style='color:#0B6FFB'><b> ${key}</b> </span></p>
                            <p>Don't give this code to anyone!!!</p>
                        </div>`,
            };
            await transporter.sendMail(mailOptions);
            acc = await accountModel.findByIdAndUpdate(account._id, {
                resetPasswordKey: String(key),
            });
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.log(error);
        return false;
    }
}

async function recoveryPassword(email, phone, resetPasswordKey, newPassword) {
    try {
        const account = await accountModel.findOne({
            email: email,
            phone: phone,
        });
        if (account.resetPasswordKey === resetPasswordKey) {
            await accountModel.updateOne(
                { email: email },
                {
                    password: await bcrypt.hash(newPassword, 1),
                    resetPasswordKey: "",
                }
            );

            return "Your password has changed";
        } else {
            return "Your reset code expired";
        }
    } catch (error) {
        console.log(error);
        return null;
    }
}

async function deleteAccount(_id, password) {
    try {
        const account = await accountModel.findById(_id);
        if (account && (await bcrypt.compare(password, account.password))) {
            const listFriend = await getListFriend(_id);
            for (i = 0; i < listFriend.length; i++) {
                await deleteFriend(_id, listFriend[i]);
            }
            const listConversation = await conversationService.findConByAccId(
                _id
            );
            for (i = 0; i < listConversation.length; i++) {
                await conversationService.deleteMemInCon(
                    listConversation[i]._id,
                    _id
                );
                if (listConversation[i].participant.length === 2) {
                    await conversationService.deleteConversation(
                        listConversation[i]._id
                    );
                }
            }
            await accountModel.findByIdAndDelete(_id);
            return "Your account was deleted";
        } else {
            return "Wrong password";
        }
    } catch (error) {
        return "Failed!";
    }
}

async function findByPhone(_id, phone) {
    let result;
    try {
        const seeker = await accountModel.findById(_id);
        const account = await accountModel.findOne({ phone: phone });
        if (seeker.phone === phone) {
            return account;
        } else {
            if (seeker.friend.indexOf(account._id) == -1) {
                result = {
                    _id: account._id,
                    isFriend: false,
                };
            } else {
                result = {
                    _id: account._id,
                    isFriend: true,
                };
            }
        }
        return result;
    } catch (error) {
        return null;
    }
}

async function addNewFriend(accountId1, accountId2) {
    const account1 = await accountModel.findById(accountId1);
    const account2 = await accountModel.findById(accountId2);
    account1.friend.push(accountId2);
    account2.friend.push(accountId1);
    account1.save();
    account2.save();
}

async function deleteFriend(accountId1, accountId2) {
    try {
        const account1 = await accountModel.findById(accountId1);
        const account2 = await accountModel.findById(accountId2);
        await account1.friend.remove(accountId2);
        await account2.friend.remove(accountId1);
        await account1.save();
        account2.save();
        return account1.friend;
    } catch (error) {
        return null;
    }
}

async function getListFriend(_id) {
    let listFriend;
    try {
        const account = await accountModel.findById(_id);
        listFriend = account.friend;
        return listFriend;
    } catch (error) {
        return null;
    }
}

async function getListSuggestion(_id, suggestion) {
    const account = await accountModel.findById(_id);
    try {
        let listAccountId = [];
        for (let i = 0; i < suggestion.length; i++) {
            const accountSuggestion = await accountModel.findOne({
                phone: suggestion[i],
            });
            if (accountSuggestion !== null) {
                if (account.friend.indexOf(accountSuggestion._id) === -1) {
                    listAccountId.push(accountSuggestion._id);
                }
            }
        }
        return listAccountId;
    } catch (error) {
        return null;
    }
}

async function blockFriend(accountId1, accountId2) {
    try {
        const account = await accountModel.findById(accountId1);
        if ((await account.block.indexOf(accountId2)) !== -1) {
            return account.block;
        } else {
            await account.block.push(accountId2);
            account.save();
            return account.block;
        }
    } catch (error) {
        return null;
    }
}

async function unblockFriend(accountId1, accountId2) {
    try {
        const account = await accountModel.findById(accountId1);
        await account.block.remove(accountId2);
        await account.save();
        return account.block;
    } catch (error) {
        return null;
    }
}

async function getBlockList(_id) {
    try {
        const account = await accountModel.findById(_id);
        return account.block;
    } catch (error) {
        return null;
    }
}

async function checkBlockAccount(accountId1, accountId2) {
    try {
        const account1 = await accountModel.findById(accountId1);
        const account2 = await accountModel.findById(accountId2);
        if ((await account1.block.indexOf(accountId2)) !== -1) {
            const result = {
                blocker: accountId1,
                isBlock: accountId2,
            };
            return result;
        }
        if ((await account2.block.indexOf(accountId1)) !== -1) {
            const result = {
                blocker: accountId2,
                isBlock: accountId1,
            };
            return result;
        }
        return -1;
    } catch (error) {
        return false;
    }
}

async function changeStatusAccount(_id, status) {
    try {
        await accountModel.findByIdAndUpdate({ _id: _id }, { status: status });
        return true;
    } catch (error) {
        return false;
    }
}

async function getAllAccount(pageNumber, pageLimit) {
    const list = await accountModel
        .find()
        .skip(pageLimit * pageNumber - pageLimit)
        .limit(pageLimit)
        .exec();
    const totalItem = await accountModel.countDocuments();
    const result = {
        items: list,
        totalItem: totalItem,
        currentPage: pageNumber,
        totalPage: Math.ceil(totalItem / pageLimit),
    };
    return result;
}

module.exports = {
    createAccount,
    sendActiveKey,
    activeAccount,
    findByPhone,
    addNewFriend,
    getListFriend,
    authenticateAccount,
    deleteFriend,
    getAccount,
    changePassword,
    deleteAccount,
    blockFriend,
    getAccountById,
    checkBlockAccount,
    unblockFriend,
    getBlockList,
    sendResetPasswordKey,
    recoveryPassword,
    getListSuggestion,
    changeStatusAccount,
    getAllAccount,
};
