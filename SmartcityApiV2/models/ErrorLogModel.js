const db = require('../config/dbConnection'); //reference of dbconnection.js

const ErrorLogTask = {
    getAllErrorLog: function (callback) {
        db.query("SELECT * FROM dt_errorlog", callback);
    },

    addToErrorLog: function (ErrorData, callback) {
        var dateTime = new Date();
        db.query("INSERT INTO dt_errorlog(controller_name, method_name, error_message, created_on, created_by) VALUES($1,$2,$3,$4,$5)", [ErrorData.ControllerName, ErrorData.MethodName, ErrorData.ErrorMessage, dateTime, 1], callback);
    },

    errorData: {
        "ControllerName": "",
        "MethodName": "",
        "ErrorMessage": ""
    }
};

module.exports = ErrorLogTask;