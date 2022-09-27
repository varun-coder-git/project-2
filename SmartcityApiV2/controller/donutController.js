const express = require('express'),
    donutModel = require('../models/donutModel'),
    ErrorLogs = require('./errorController'),
    errorLogModel = require('../models/ErrorLogModel');
errorLogModel.errorData.ControllerName = 'DonutController';

var donutController = {
    getDonutDetails: function (req, res) {
        var DonutChartData = req.body;
        var calender_period = DonutChartData.calender_period; //week = 1 , month = 2 and year = 3
        var DonutData = {}, label = [], value = [];
        async function GetDonutData() {
            try {
                const result1 = await donutModel.getDonutDetails(calender_period);
                if (result1.rows.length > 0) {
                    for (var i = 0; i < result1.rows.length; i++) {
                        label.push(result1.rows[i]['label'])
                        value.push(result1.rows[i]['count'])
                    }
                    DonutData = {
                        "label": label, "count": value
                    }
                    if (result1.rows.length > 0) {
                        res.status(200).send({
                            status: true,
                            message: "Data Found Successful",
                            data: DonutData
                        });
                    }
                } else {
                    ErrorLogs.errorResponse(res, 'getDonutDetails', 'Data Not Found', 404)
                }
            } catch (error) {
                ErrorLogs.errorResponse(res, 'getDonutDetails', 'Internal server error', 500)
            }
        }
        GetDonutData()
    },
};

module.exports = donutController;