const RequestLog = require("../models/request.log.model");

const requestLogger = async (req, res, next) => {
    console.log(req.api_key);

    const startTime = Date.now();
    const apiKey = req.api_key;

    const originalSend = res.send;

    res.send = function (body) {
        const responseTime = Date.now() - startTime;
        const responseStatus = res.statusCode;
        const requestMethod = req.method;
        const requestUrl = req.path;
        const ipAddress = req.ip || req.connection.remoteAddress;

        RequestLog.logRequest(
            apiKey.id,
            apiKey.user_id,
            requestMethod,
            requestUrl,
            responseStatus,
            responseTime,
            ipAddress
        )
            .then(() => {
                console.log("Request logged successfully.");
            })
            .catch((err) => {
                console.error("Error logging request: ", err);
            });

        originalSend.call(this, body);
    }

    next();
}

module.exports = requestLogger;