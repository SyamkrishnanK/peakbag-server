const invalidResponse = (res, message) => {
    res.json({
        code: 450,
        toast: {
            msg: message,
            fn: "error"
        },
        message: message
    });
};
const successResponseWithToast = (res, message, data) => {
    res.json({
        code: 200,
        toast: {
            msg: message,
            fn: "success"
        },
        data,
        message: message
    });
};

module.exports = {
    invalidResponse,
    successResponseWithToast
};
