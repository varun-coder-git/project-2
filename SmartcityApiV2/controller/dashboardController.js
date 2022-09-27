const express = require('express'),
    dashboardModel = require('../models/dashboardModel'),
    ErrorLogs = require('./errorController'),
    errorLogModel = require('../models/ErrorLogModel');
errorLogModel.errorData.ControllerName = 'DashboardController';

var DashboardController = {
    getComplaintIncidentLocationDashboard: function (req, res) {
        var complaint_data = [];
        var incident_data = [];
        var map_data = [];
        var dashboard_data = {}

        async function DashboardData() {
            try {
                const result1 = await dashboardModel.getDashboardComplaint();
                const result2 = await dashboardModel.getDashboardIncident();
                const result3 = await dashboardModel.getMarkers();
                let complaintMarker=result3.rows[0]['marker_path'],incidentMarker=result3.rows[1]['marker_path'];

                map_data.push({
                    "complaint": complaintMarker,
                    "incident": incidentMarker,
                })
                if (result1.rows.length > 0 || result2.rows.length > 0) {
                    for (var i = 0; i < result2.rows.length; i++) {
                        incident_data.push({
                            "id": result2.rows[i]['id'],
                            "title": result2.rows[i]['title'],
                            "description": result2.rows[i]['description'],
                            "latitude": result2.rows[i]['latitude'],
                            "longitude": result2.rows[i]['longitude'],
                            "address": result2.rows[i]['address'],
                            "type": result2.rows[i]['type_data'],
                            "marker_path": result2.rows[i]['path']
                        })
                    }
                    for (var i = 0; i < result1.rows.length; i++) {
                        complaint_data.push({
                            "id": result1.rows[i]['id'],
                            "title": result1.rows[i]['title'],
                            "description": result1.rows[i]['description'],
                            "latitude": result1.rows[i]['latitude'],
                            "longitude": result1.rows[i]['longitude'],
                            "address": result1.rows[i]['address'],
                            "type": result1.rows[i]['type_data'],
                            "marker_path": result1.rows[i]['path']
                        })
                    }
                    dashboard_data = {
                        map_data,
                        complaint_data,
                        incident_data
                    }
                    res.status(200).send({
                        status: true,
                        message: "Data Found Successful",
                        data: dashboard_data
                    });
                } else {
                    ErrorLogs.errorResponse(res, 'getComplaintIncidentLocationDashboard', 'Data Not Found', 404)
                }
            } catch (error) {
                ErrorLogs.errorResponse(res, 'getComplaintIncidentLocationDashboard', 'Internal server error', 500)
            }
        }
        DashboardData()
    },
};

module.exports = DashboardController;