const express = require('express'),
    FacilityModels = require('../models/FacilityModels'),
    ErrorLogs = require('./errorController'),
    errorLogModel = require('../models/ErrorLogModel');
errorLogModel.errorData.ControllerName = 'FacilityController';

var FacilityController = {
    getFacilityLocation: function (req, res) {
        async function GetFacilityLocationData() {
            try {
                const result1 = await FacilityModels.getFacilityLocation();
                if (result1.rows.length > 0) {
                    res.status(200).send({
                        status: true,
                        message: "Data Found Successful",
                        data: result1.rows
                    });
                } else {
                    ErrorLogs.errorResponse(res, 'getFacilityLocation', 'Data Not Found', 404)
                }
            } catch (error) {
                ErrorLogs.errorResponse(res, 'getFacilityLocation', 'Internal server error', 500)
            }
        }
        GetFacilityLocationData()
    },

    updateLocation: function (req, res) {
        var LocationData = req.body;
        var location_id = LocationData.location_id;
        var long = LocationData.longitude;
        var lat = LocationData.latitude;
        var location_category_id = LocationData.location_category_id;
        var facility_name = LocationData.name;
        async function UpdateLocationData() {
            try {
                const result1 = await FacilityModels.checkDuplicateUpdate();
                const result2 = await FacilityModels.updateLocation(location_id, long, lat, location_category_id, facility_name);

                if (result1.rows.length > 0) {
                    if (result1.rows[0]['location_id'] != location_id) ErrorLogs.errorResponse(res, 'updateLocation', 'Duplicate Data Found', 403)
                    else {
                        if (result2.rows.length > 0) {
                            res.status(200).send({
                                status: true,
                                message: "Data Updated Successful",
                                data: result2.rows,
                            })
                        }
                        else ErrorLogs.errorResponse(res, 'updateLocation', 'Failed to update data', 400)
                    }
                } else {
                    if (result2.rows.length > 0) {
                        res.status(200).send({
                            status: true,
                            message: "Data Updated Successful",
                            data: result2.rows,
                        })
                    }
                    else ErrorLogs.errorResponse(res, 'updateLocation', 'Failed to update data', 400)
                }
            } catch (error) {
                ErrorLogs.errorResponse(res, 'updateLocation', 'Internal server error', 500)
            }
        }
        UpdateLocationData()
    },

    deleteFacility: function (req, res) {
        var LocationData = req.body;
        var location_id = LocationData.location_id;
        async function DeleteFacilityData() {
            try {
                const result1 = await FacilityModels.deleteFacility(location_id);
                if (result1.rows.length > 0) {
                    res.status(200).send({
                        status: true,
                        message: "Data Deleted Successful",
                        data: result1.rows,
                    })
                } else {
                    ErrorLogs.errorResponse(res, 'deleteFacility', 'Failed to delete data', 400)
                }
            } catch (error) {
                ErrorLogs.errorResponse(res, 'deleteFacility', 'Internal server error', 500)
            }
        }
        DeleteFacilityData()
    },

    registerFacility: function (req, res) {
        var LocationData = req.body;
        var location_category_id = LocationData.location_category_id;
        var facility_name = LocationData.name;
        var longitude = LocationData.longitude;
        var latitude = LocationData.latitude;
        async function FacilityLocationData() {
            try {
                const result1 = await FacilityModels.checkDuplicateUpdate(facility_name, location_category_id, latitude, longitude,);
                if (result1.rows.length > 0) {
                    ErrorLogs.errorResponse(res, 'updateLocation', 'Duplicate Data Found', 403)
                } else {
                    const result2 = await FacilityModels.facilityLocation(location_category_id, facility_name, longitude, latitude);
                    if (result2.rows.length > 0) {
                        res.status(201).send({
                            status: true,
                            message: "Data Inserted Successful",
                            data: result2.rows,
                        })
                    } else {
                        ErrorLogs.errorResponse(res, 'registerFacility', 'Failed to insert data', 400)
                    }
                }
            } catch (error) {
                ErrorLogs.errorResponse(res, 'registerFacility', 'Internal server error', 500)
            }
        }
        FacilityLocationData()
    },

    getFacilityCount: function (req, res) {
        async function GetFacilityCountData() {
            try {
                const result1 = await FacilityModels.facility_count();
                if (result1.rows.length > 0) {
                    res.status(200).send({
                        status: true,
                        message: "Data Found Successful",
                        data: result1.rows
                    })
                } else {
                    ErrorLogs.errorResponse(res, 'getFacilityCount', 'Data Not Found', 404)
                }
            } catch (error) {
                ErrorLogs.errorResponse(res, 'getFacilityCount', 'Internal server error', 500)
            }
        }
        GetFacilityCountData()
    },

    getFacilityById: function (req, res) {
        var LocationData = req.body;
        var location_id = LocationData.location_id;
        var LocationDetails = []
        async function GetFacilityByIdData() {
            try {
                const result1 = await FacilityModels.getFacilityByID(location_id);
                if (result1.rows.length > 0) {
                    LocationDetails.push({
                        "location_id": result1.rows[0]['location_id'],
                        "location_category_id": result1.rows[0]['location_category_id'],
                        "facility_name": result1.rows[0]['facility_name'],
                        "latitude": result1.rows[0]['latitude'],
                        "longitude": result1.rows[0]['longitude'],
                        "facility_type": result1.rows[0]['facility_type'],
                    })
                    res.status(200).send({
                        status: true,
                        message: "Data Found Successful",
                        data: LocationDetails
                    })
                } else {
                    ErrorLogs.errorResponse(res, 'getFacilityById', 'Data Not Found', 404)
                }
            } catch (error) {
                ErrorLogs.errorResponse(res, 'getFacilityById', 'Internal server error', 500)
            }
        }
        GetFacilityByIdData()
    },

    getFacilityCategory: function (req, res) {
        var LocationDetails = []
        async function GetFacilityCategoryData() {
            try {
                const result1 = await FacilityModels.facilityCategory();
                if (result1.rows.length > 0) {
                    for (var i = 0; i < result1.rows.length; i++) {
                        LocationDetails.push({
                            "location_category_id": result1.rows[i]['location_category_id'],
                            "facility_type": result1.rows[i]['facility_type'],
                        })
                    }
                    res.status(200).send({
                        status: true,
                        message: "Data Found Successful",
                        data: LocationDetails,
                    })
                } else {
                    ErrorLogs.errorResponse(res, 'getFacilityCategory', 'Data Not Found', 404)
                }
            } catch (error) {
                ErrorLogs.errorResponse(res, 'getFacilityCategory', 'Internal server error', 500)
            }
        }
        GetFacilityCategoryData()
    },
};

module.exports = FacilityController;