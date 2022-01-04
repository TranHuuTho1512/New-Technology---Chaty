const checkInput = (data, attributes) => {
    attributes.forEach((attribute) => {
        if (data[attribute] === undefined) throw new Error("Data incorrect!");
    });
    return data;
};

const mergerInput = (request) => {
    return {
        ...request.body,
        ...request.params,
        ...request.query,
    };
};

module.exports = { checkInput, mergerInput };
