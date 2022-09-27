const express = require('express'),
    wardModel = require('../models/wardModel'),
    ErrorLogs = require('./errorController'),
    errorLogModel = require('../models/ErrorLogModel');
errorLogModel.errorData.ControllerName = 'wardController';

var wardController = {
    getAllWards: function (req, res) {
        async function WardList() {
            try {
                const result1 = await wardModel.getAllWards();
                if (result1.rows.length > 0) {
                    res.status(200).send({
                        status: true,
                        message: "Data Found Successful",
                        data: result1.rows
                    });
                } else {
                    ErrorLogs.errorResponse(res, 'getAllWards', 'Data Not Found', 404)
                }
            } catch (error) {
                ErrorLogs.errorResponse(res, 'getAllWards', 'Internal server error', 500)
            }
        }
        WardList()
    },

    updateWard: function (req, res) {
        var WardData = req.body;
        var ward_name = WardData.ward_name;
        var ward_id = WardData.ward_id;
        async function UpdateWardData() {
            try {
                const result1 = await wardModel.updateWard(ward_id, ward_name);
                if (result1.rows.length > 0) {
                    res.status(200).send({
                        status: true,
                        message: "Data Updated Data Found Successful",
                        data: result1.rows,
                    })
                } else {
                    ErrorLogs.errorResponse(res, 'updateWard', 'Failed to update', 402)
                }
            } catch (error) {
                ErrorLogs.errorResponse(res, 'updateWard', 'Internal server error', 500)
            }
        }
        UpdateWardData()
    },

    addNewWard: function (req, res) {
        async function AddNewWardData() {
            try {
                const result1 = await wardModel.addNewWard(req.body.ward_name);
                if (result1.rows.length > 0) {
                    res.status(201).send({
                        status: true,
                        message: "Data Inserted Data Found Successful",
                        data: result1.rows,
                    })
                } else {
                    ErrorLogs.errorResponse(res, 'addNewWard', 'Failed to add ward', 402)
                }
            } catch (error) {
                ErrorLogs.errorResponse(res, 'addNewWard', 'Internal server error', 500)
            }
        }
        AddNewWardData()
    },

    deleteWard: function (req, res) {
        async function DeleteWardData() {
            try {
                const result1 = await wardModel.deleteWard(req.body.ward_id);
                if (result1.rows.length > 0) {
                    res.status(200).send({
                        status: true,
                        message: "Data Deleted Data Found Successful",
                        data: result1.rows,
                    })
                } else {
                    ErrorLogs.errorResponse(res, 'deleteWard', 'Failed to delete data', 402)
                }
            } catch (error) {
                ErrorLogs.errorResponse(res, 'deleteWard', 'Internal server error', 500)
            }
        }
        DeleteWardData()
    },

    topPerformingWard: function (req, res) {
        async function TopPerformingWardData() {
            try {
                const result1 = await wardModel.topPerformingWard();
                if (result1.rows.length > 0) {
                    res.status(200).send({
                        status: true,
                        message: "Data Found Successful",
                        data: result1.rows
                    });
                } else {
                    ErrorLogs.errorResponse(res, 'topPerformingWard', 'Data Not Found', 404)
                }
            } catch (error) {
                ErrorLogs.errorResponse(res, 'topPerformingWard', 'Internal server error', 500)
            }
        }
        TopPerformingWardData()
    },

    wardsNeedImprovement: function (req, res) {
        async function WardsNeedImprovementData() {
            try {
                const result1 = await wardModel.wardsNeedImprovement();
                if (result1.rows.length > 0) {
                    res.status(200).send({
                        status: true,
                        message: "Data Found Successful",
                        data: result1.rows
                    });
                } else {
                    ErrorLogs.errorResponse(res, 'wardsNeedImprovement', 'Data Not Found', 404)
                }
            } catch (error) {
                ErrorLogs.errorResponse(res, 'wardsNeedImprovement', 'Internal server error', 500)
            }
        }
        WardsNeedImprovementData()
    },

    topWardChart: function (req, res) {
        var closed_complaint_count = [];
        var labels = [];
        var ward_name = [];
        var vote_count = []
        var ward_data = {}

        async function TopWardChartData() {
            try {
                const result1 = await wardModel.topWardchart();
                if (result1.rows.length > 0) {
                    for (var i = 0; i < result1.rows.length; i++) {
                        vote_count.push({
                            "ward_name": result1.rows[i]['ward_name'],
                            "closed_complaint_count": result1.rows[i]['closed_complaint_count']
                        })
                        ward_name.push(result1.rows[i]['ward_name'])
                        closed_complaint_count.push(result1.rows[i]['closed_complaint_count'])
                        labels.push((i + 10).toString(36))
                    }
                    ward_data = {
                        closed_complaint_count,
                        labels,
                        ward_name,
                        vote_count
                    }
                    res.status(200).send({
                        status: true,
                        message: "Data Found Successful",
                        data: ward_data
                    });
                } else {
                    ErrorLogs.errorResponse(res, 'topWardChart', 'Data Not Found', 404)
                }
            } catch (error) {
                ErrorLogs.errorResponse(res, 'topWardChart', 'Internal server error', 500)
            }
        }
        TopWardChartData()
    },

    lessWardChart: function (req, res) {
        var closed_complaint_count = [];
        var labels = [];
        var ward_name = [];
        var vote_count = []
        var ward_data = {}
        async function LessWardChartData() {
            try {
                const result1 = await wardModel.lessWardchart();
                if (result1.rows.length > 0) {
                    for (var i = 0; i < result1.rows.length; i++) {
                        vote_count.push({
                            "ward_name": result1.rows[i]['ward_name'],
                            "closed_complaint_count": result1.rows[i]['closed_complaint_count']
                        })
                        ward_name.push(result1.rows[i]['ward_name'])
                        closed_complaint_count.push(result1.rows[i]['closed_complaint_count'])
                        labels.push((i + 10).toString(36))
                    }
                    ward_data = {
                        closed_complaint_count,
                        labels,
                        ward_name,
                        vote_count
                    }
                    res.status(200).send({
                        status: true,
                        message: "Data Found",
                        data: ward_data
                    });
                } else {
                    ErrorLogs.errorResponse(res, 'lessWardChart', 'Data Not Found', 404)
                }
            } catch (error) {
                ErrorLogs.errorResponse(res, 'lessWardChart', 'Internal server error', 500)
            }
        }
        LessWardChartData()
    },
};

module.exports = wardController;