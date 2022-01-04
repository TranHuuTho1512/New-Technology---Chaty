const sendSuccess = (res, data) => {
    res.status(200).json({ data });
    res.end();
};

const sendError = (res, error) => {
    res.status(400).json({ error });
    res.end();
};

module.exports = { sendSuccess, sendError };
