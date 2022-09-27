const express = require('express'),
    citizenModel = require('../models/citizenReportModel'),
    ErrorLogs = require('./errorController'),
    errorLogModel = require('../models/ErrorLogModel');
errorLogModel.errorData.ControllerName = 'citizenReportController';

var citizenReport = {
    getCitizenData: function (req, res) {
        var CitizenData = [];
        async function GetCitizenDetails() {
            try {
                const result1 = await citizenModel.getCitizenData();
                if (result1.rows.length > 0) {
                    for (var i = 0; i < result1.rows.length; i++) {
                        CitizenData.push({
                            "ward_id": result1.rows[i]['ward_id'],
                            "wards": result1.rows[i]['ward_name'],
                            "full_name": result1.rows[i]['f_name'] + " " + result1.rows[i]['l_name'],
                            "registration_date": result1.rows[i]['registration_date'],
                            "user_id": result1.rows[i]['user_id'],
                            "pincode": result1.rows[i]['pincode']
                        })
                    }
                    res.status(200).send({
                        status: true,
                        message: "Data Found Successful",
                        data: CitizenData
                    })
                } else {
                    ErrorLogs.errorResponse(res, 'getCitizenData', 'Data Not Found', 404)
                }
            } catch (error) {
                ErrorLogs.errorResponse(res, 'getCitizenData', 'Internal server error', 500)
            }
        }
        GetCitizenDetails()
    },

    getCitizenById: function (req, res) {
        var citizen_user_id = req.body.citizen_user_id;
        var CitizenData = [];
        var Phonenumberdata=[];
        var uniquePhonenumberdata=[];
        var finalPhonenumber;
        async function GetCitizenByIdData() {
            try {
                const result2 = await citizenModel.getComplaintCount(citizen_user_id);
                const result3 = await citizenModel.checkCitizenLogin(citizen_user_id);
                if (result3.rows.length > 0 && (result3.rows[0]['login_type'] == 'google' || result3.rows[0]['login_type'] == 'facebook')) {
                    const result1 = await citizenModel.getCitizenByIdExceptSocial(citizen_user_id);
                    if (result1.rows.length > 0) {
                        if(result1.rows[0]['phone_number'].length>1){
                            Phonenumberdata=result1.rows[0]['phone_number'].split(', ');
                            for(i=(Phonenumberdata.length-1);i>=0;i--){
                                if(!uniquePhonenumberdata.includes(Phonenumberdata[i])){
                                    uniquePhonenumberdata.push(Phonenumberdata[i]);
                                }
                            }
                            finalPhonenumber=uniquePhonenumberdata.reverse().join(", ");
                        }else{
                            finalPhonenumber=result1.rows[0]['phone_number'];
                        }
                        CitizenData.push({
                            "full_name": result1.rows[0]['f_name'] + " " + result1.rows[0]['l_name'],
                            "image_path": result1.rows[0]['image_path'],
                            "email": result1.rows[0]['email'],
                            "phone_number": finalPhonenumber,
                            "ward_name": result1.rows[0]['ward_name'],
                            "ward_id": result1.rows[0]['ward_id'],
                            "registration_date": result1.rows[0]['registration_date'],
                            "complaint_logged_count": result2.rows[0]['logged_count'],
                            "idea_count": result2.rows[1]['logged_count'],
                            "incident_count": result2.rows[2]['logged_count'],
                            "volunteer_activity": result2.rows[3]['logged_count'],
                        })
                        res.status(200).send({
                            status: true,
                            message: "Data Found Successful",
                            data: CitizenData
                        })
                    }else {
                        ErrorLogs.errorResponse(res, 'getCitizenById', 'Data Not Found222222222', 404)
                    }
                } else {
                    const result1 = await citizenModel.getCitizenById(citizen_user_id);
                    if (result1.rows.length > 0) {
                        if(result1.rows[0]['phone_number'].length>1){
                        Phonenumberdata=result1.rows[0]['phone_number'].split(', ');
                        for(i=(Phonenumberdata.length-1);i>=0;i--){
                            if(!uniquePhonenumberdata.includes(Phonenumberdata[i])){
                                uniquePhonenumberdata.push(Phonenumberdata[i]);
                            }
                        }
                        finalPhonenumber=uniquePhonenumberdata.reverse().join(", ");
                    }else{
                        finalPhonenumber=result1.rows[0]['phone_number'];
                    }
                        CitizenData.push({
                            "full_name": result1.rows[0]['f_name'] + " " + result1.rows[0]['l_name'],
                            "image_path": result1.rows[0]['image_path'],
                            "email": result1.rows[0]['email'],
                            "phone_number":finalPhonenumber,
                            "ward_name": result1.rows[0]['ward_name'],
                            "ward_id": result1.rows[0]['ward_id'],
                            "registration_date": result1.rows[0]['registration_date'],
                            "complaint_logged_count": result2.rows[0]['logged_count'],
                            "idea_count": result2.rows[1]['logged_count'],
                            "incident_count": result2.rows[2]['logged_count'],
                            "volunteer_activity": result2.rows[3]['logged_count'],
                        })
                        res.status(200).send({
                            status: true,
                            message: "Data Found Successful",
                            data: CitizenData
                        })
                    }
                    else {
                        ErrorLogs.errorResponse(res, 'getCitizenById', 'Data Not Found1111', 404)
                    }
                } 
            } catch (error) {
                ErrorLogs.errorResponse(res, 'getCitizenById', 'Internal server error', 500)
            }
        }
        GetCitizenByIdData()
    },

    deleteCitizen: function (req, res) {
        async function DeleteCitizenData() {
            try {
                const result1 = await citizenModel.deleteCitizen(req.body.citizen_user_id);
                if (result1.rows.length > 0) {
                    res.status(200).send({
                        status: true,
                        message: "Data Deleted Successful",
                    })
                } else {
                    ErrorLogs.errorResponse(res, 'deleteCitizen', 'Failed to delete data', 400)
                }
            } catch (error) {
                ErrorLogs.errorResponse(res, 'deleteCitizen', 'Internal server error', 500)
            }
        }
        DeleteCitizenData()
    },
};


module.exports = citizenReport;