const express = require('express'),
    citizenModel = require('../models/citizenModel'),
    ErrorLogs = require('./errorController'),
    errorLogModel = require('../models/ErrorLogModel');
errorLogModel.errorData.ControllerName = 'CitizenController';

var CitizenController = {
    GetCitizenCount: function (req, res) {
        var citizen_data = []
        async function GetCitizenCountData() {
            try {
                const result1 = await citizenModel.GetCitizenCount();
                if (result1.rows.length > 0) {
                    citizen_data.push({
                        "registeredCitizen": result1.rows[0]['reg'],
                        "onlineCitizen": result1.rows[0]['online'],
                    })
                    res.status(200).send({
                        status: true,
                        message: 'Data Found Successful',
                        data: citizen_data
                    })
                } else {
                    ErrorLogs.errorResponse(res, 'GetCitizenCount', 'Data Not Found', 404)
                }
            } catch (error) {
                ErrorLogs.errorResponse(res, 'GetCitizenCount', 'Internal server error', 500)
            }
        }
        GetCitizenCountData()
    },
};

module.exports = CitizenController;