const express = require('express'),
    FacilityTypeModel = require('../models/FacilityTypeModel'),
    ErrorLogs = require('./errorController'),
    errorLogModel = require('../models/ErrorLogModel');
errorLogModel.errorData.ControllerName = 'FacilityTypeController';

var FacilityTypeController = {
    getFacilityType: function (req, res) {
        var FacilityData = req.body;
        var query_id = FacilityData.id;
        var facility_data = [],category_data=[];
        async function getFacilityTypeData() {
            try {
                const result1 = await FacilityTypeModel.getFacilityType(query_id);
                if (result1.rows.length > 0) {
                    for (var i = 0; i < result1.rows.length; i++) {
                        facility_data.push({
                            "location_id": result1.rows[i]['location_id'],
                            "facility_name": result1.rows[i]['facility_name'],
                            "location_category_id": result1.rows[i]['location_category_id'],
                            "latitude": result1.rows[i]['latitude'],
                            "longitude": result1.rows[i]['longitude'],
                            "facility_icon_path": result1.rows[i]['facility_icon_path'],
                            "facility_type": result1.rows[i]['facility_type'],
                        })
                    }
                    category_data.push({
                        "facility_type": result1.rows[0]['facility_type'],
                        "facility_image": result1.rows[0]['facility_icon_path'],
                        "facility_data": facility_data
                    })
                    res.status(200).send({
                        status: true,
                        message: "Data Found Successful",
                        data: category_data
                    });
                } else {
                    ErrorLogs.errorResponse(res, 'getFacilityType', 'Data Not Found', 404)
                }
            } catch (error) {
                ErrorLogs.errorResponse(res, 'getFacilityType', 'Internal server error', 500)
            }
        }
        getFacilityTypeData()
    },

    updateFacilityType: function (req, res) {
        var FacilityData = req.body;
        var location_category_id = FacilityData.location_category_id;
        var location_id = FacilityData.location_id;
        var facility_name = FacilityData.name;
        var latitude = FacilityData.latitude;
        var longitude = FacilityData.longitude;

        async function UpdateFacilityTypeData() {
            try {
                const result1 = await FacilityTypeModel.updateFacilityType(location_id, location_category_id, facility_name, latitude, longitude);

                if (result1.rows.length > 0) {
                    res.status(200).send({
                        status: true,
                        message: "Data Updated successful",
                        data: result1.rows,
                    })
                } else {
                    ErrorLogs.errorResponse(res, 'updateFacilityType', 'Failed to update data', 400)
                }
            } catch (error) {
                ErrorLogs.errorResponse(res, 'updateFacilityType', 'Internal server error', 500)
            }
        }
        UpdateFacilityTypeData()
    },

    registerFacilityType: function (req, res) {
        async function RegisterFacilityType() {
            try {
                const result1 = await FacilityTypeModel.addFacilityType(req.body.name);

                if (result1.rows.length > 0) {
                    res.status(201).send({
                        status: true,
                        message: "Data Inserted Successful",
                        data: result1.rows,
                    })
                } else {
                    ErrorLogs.errorResponse(res, 'registerFacilityType', 'Failed to insert data', 400)
                }
            } catch (error) {
                ErrorLogs.errorResponse(res, 'registerFacilityType', 'Internal server error', 500)
            }
        }
        RegisterFacilityType()
    },

    deleteFacilityType: function (req, res) {
         async function DeleteFacilityTypeData() {
            try {
                const result1 = await FacilityTypeModel.deleteFacilityType(req.body.location_category_id);
                if (result1.rows.length > 0) {
                    res.status(200).send({
                        status: true,
                        message: "Data Deleted Successful",
                        data: result1.rows,
                    })
                } else {
                    ErrorLogs.errorResponse(res, 'deleteFacilityType', 'Failed to delete data', 400)
                }
            } catch (error) {
                ErrorLogs.errorResponse(res, 'deleteFacilityType', 'Internal server error', 500)
            }
        }
        DeleteFacilityTypeData()
    },
};


module.exports = FacilityTypeController;