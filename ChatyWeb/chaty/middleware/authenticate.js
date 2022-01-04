const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).send("Unauthorization");
    } else {
        jwt.verify(token.slice(7), process.env.SECRET_KEY, (err, payload) => {
            if (payload) {
                req.accountId = payload.accountId;
                next();
            } else {
                return res.status(401).send("Invalid token");
            }
        });
    }
};
module.exports = verifyToken;
