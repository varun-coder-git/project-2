const express = require('express'),
    jwt = require('jsonwebtoken'),
    SOSModel = require('../models/SOSModel'),
    errorLogModel = require('../models/ErrorLogModel'),
    axios = require('axios'),
    ErrorLogs = require('./errorController');
    const Cryptr = require('cryptr');
    const cryptr = new Cryptr('#Screate1489d');
    secret_key = cryptr.decrypt(process.env.Secret_Key),

errorLogModel.errorData.ControllerName = 'SOS';

var SOSController = {
    getSOSData: function (req, res) {
        var sos_data = req.body;
        var user_id = sos_data.user_id;

        SOSModel.GetSOSData(user_id, function (err, data) {
            if (err) {
                ErrorLogs.errorResponse(res, 'userMobileOTPVerify', 'Internal server error', 500)
            } else {
                if (data.rows.length > 0) {
                    var full_name = data.rows[0]['f_name'] + " " + data.rows[0]['l_name'];
                    var phone_number = data.rows[0]['phone_number'];
                    var emergency_number = data.rows[0]['emergency_number']
                    var latitude = data.rows[0]['latitude'];
                    var longitude = data.rows[0]['longitude'];
                    var otp = 1234
                    var url;
                    if (emergency_number == null || emergency_number == 'null' || emergency_number == ' ') {
                        url = `http://103.231.100.41/websms/sendsms.aspx?userid=amitnitinshah&password=12345&sender=SMRTTM&mobileno=${phone_number}&msg=Hello ${full_name},
${otp} is login access code for Thiruvananthapuram  Smart City App.
                                    
Thanks,
Thiruvananthapuram  Smart City&peid=1201160855947153583&tpid=1207162788633877392`
                    } else {
                        url = `http://103.231.100.41/websms/sendsms.aspx?userid=amitnitinshah&password=12345&sender=SMRTTM&mobileno=${[phone_number, emergency_number]}&msg=Hello ${full_name},
${otp} is login access code for Thiruvananthapuram  Smart City App.
                                    
Thanks,
Thiruvananthapuram  Smart City&peid=1201160855947153583&tpid=1207162788633877392`
                    }
                    axios.get(url).then(function (response) {
                        res.status(201).send({
                            status: true,
                            message: "SOS Send Successful",
                        })
                    }).catch(function (err) {
                        ErrorLogs.errorResponse(res, 'getSOSData', 'Failed to send SOS', 400)
                    })
                } else {
                    ErrorLogs.errorResponse(res, 'getSOSData', 'Data Not Found', 404)
                }
            }
        });

    },
};

module.exports = SOSController;