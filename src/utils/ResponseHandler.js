class ResponseHandler {
    static success(res, message, data = null, statusCode = 200) {
        res.status(statusCode).json({
            status: 'Success',
            message,
            data,
        });
    }

    static error(res, message, statusCode = 500, error = null) {
        res.status(statusCode).json({
            status: 'Error',
            message,
            error: error ? error.message : null,
        });
    }
}

module.exports = ResponseHandler;
