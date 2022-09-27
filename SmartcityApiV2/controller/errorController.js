const errorLogModel = require('../models/ErrorLogModel');

const ErrorLogs = {
    errorResponse: function (res, methodName, message, statusCode) {
        errorLogModel.errorData.MethodName = methodName;
        errorLogModel.errorData.ErrorMessage = message;
        errorLogModel.addToErrorLog(errorLogModel.errorData, function (err, count) {
            if (err) console.log(err);
            else{
                res.status(statusCode).send({
                    status: false,
                    message: message,
                });
            } 
        })
    },
}
module.exports = ErrorLogs;
