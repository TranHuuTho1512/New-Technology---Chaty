const express = require("express");

const profileRouter = require("./routers/profile");
const accountRouter = require("./routers/account");
const messageRouter = require("./routers/message");
const conversationRouter = require("./routers/conversation");
const requestRouter = require("./routers/request");
const siteRouter = require("./routers/site");
const fileRouter = require("./routers/file");
const adminRouter = require("./routers/admin");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const authenticate = require("./middleware/authenticate");

mongoose.connect(
    `mongodb+srv://root:${process.env.MONGO_ATLAS_PW}@app-chat-realtime.qxlpl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
    }
);

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use("/admin", authenticate, adminRouter);
app.use("/profile", authenticate, profileRouter);
app.use("/account", authenticate, accountRouter);
app.use("/message", authenticate, messageRouter);
app.use("/conversation", authenticate, conversationRouter);
app.use("/request", authenticate, requestRouter);
app.use("/site", siteRouter);
app.use("/file", fileRouter);

app.use("/manage", express.static(path.join(__dirname, "public/views/admin")));
app.use("/", express.static(path.join(__dirname, "public/views/user")));

module.exports = app;
