const express = require('express'),
    jwt = require('jsonwebtoken'),
    socialModel = require('../models/socialModel'),
    errorLogModel = require('../models/ErrorLogModel'),
    userModel = require('../models/UserModel'),
    ErrorLogs = require('./errorController'),
    fs = require('fs');
    const Cryptr = require('cryptr');
    const cryptr = new Cryptr('#Screate1489d');
    secret_key = cryptr.decrypt(process.env.Secret_Key),
errorLogModel.errorData.ControllerName = 'SocialLoginController';

var SocialLoginController = {
    getGoogleLogin: function (req, res) {
        async function GetGoogleLogin() {
            try {
                const result1 = await socialModel.checkGoogleLogin(req.body);
                if (result1.rows.length > 0) {
                    const result2 = await socialModel.updateGoogleLoginState(result1.rows[0]['user_id'], req.body);
                if (result2.rows.length > 0) {
                        var token = jwt.sign({
                            id: result1.rows[0]['user_id']
                        }, secret_key);
                        var data = {
                            "user_id": result1.rows[0]['user_id'],
                            "is_admin": result1.rows[0]['is_admin'],
                            "token": token,
                            "email": result1.rows[0]['email'],
                            "full_name": result1.rows[0]['f_name'] + " " + result1.rows[0]['l_name'],
                            "image": result1.rows[0]['image_path'],
                            "ward_id": result1.rows[0]['ward_id'],
                            "is_profile_complete": result1.rows[0]['is_profile_complete'],
                            "login_type": result1.rows[0]['login_type'],
                        }
                        res.status(200).send({
                            status: true,
                            message: "Logged In Successful",
                            data: data
                        })
                    } else {
                        ErrorLogs.errorResponse(res, 'getGoogleLogin', 'Failed to login', 400)
                    }
                } else {
                    for (var p = 0; p < Object.keys(req.body).length; p++) {
                        if ((req.body.login_type == 'facebook' && Object.keys(req.body)[p] == 'email') || req.body.login_type == 'google') {
                            const result3 = await socialModel.registerGoogleUser(req.body);
                            if (result3.rows.length > 0) {
                                var token = jwt.sign({
                                    id: result3.rows[0]['user_id']
                                }, secret_key);
                                var data = {
                                    "user_id": result3.rows[0]['user_id'],
                                    "is_admin": result3.rows[0]['is_admin'],
                                    "token": token,
                                    "email": result3.rows[0]['email'],
                                    "full_name": result3.rows[0]['f_name'] + " " + result3.rows[0]['l_name'],
                                    "image": result3.rows[0]['image_path'],
                                    "ward_id": result3.rows[0]['ward_id'],
                                    "is_profile_complete": result3.rows[0]['is_profile_complete'],
                                    "login_type": result3.rows[0]['login_type'],
                                    "is_login": result3.rows[0]['is_login'],
                                }
                                res.status(200).send({
                                    status: true,
                                    message: "Logged In Successful",
                                    data: data
                                })
                            } else {
                                ErrorLogs.errorResponse(res, 'getGoogleLogin', 'Failed to register', 400)
                            }
                            break;
                        } else {
                            ErrorLogs.errorResponse(res, 'getGoogleLogin', 'Please update your email id in your Facebook account to login. Or please login using your Gmail ID or register as new user', 403)
                        }
                    }
                }
            } catch (error) {
                ErrorLogs.errorResponse(res, 'getGoogleLogin', 'Internal server error', 500)
            }
        }
        GetGoogleLogin()
    },

    getGoogleProfile: function (req, res) {
        var profile_data = []
        async function GetGoogleProfile() {
            try {
                const result1 = await socialModel.getGoogleProfile(req.body.user_id);
                if (result1.rows.length > 0) {
                    var dob, email, emergency_number, blood_group_id, address, phone_number, city, pincode, ward_name, ward_id;

                    if (result1.rows[0]['age'] == null || result1.rows[0]['age'] == 'null' || result1.rows[0]['age'] == undefined || result1.rows[0]['age'] == 'undefined') dob = ' '
                    else dob = result1.rows[0]['age']
                    if (result1.rows[0]['email'] == null || result1.rows[0]['email'] == 'null' || result1.rows[0]['email'] == undefined || result1.rows[0]['email'] == 'undefined') email = ' '
                    else email = result1.rows[0]['email']
                    if (result1.rows[0]['emergency_number'] == null || result1.rows[0]['emergency_number'] == 'null' || result1.rows[0]['emergency_number'] == undefined || result1.rows[0]['emergency_number'] == 'undefined') emergency_number = ' '
                    else emergency_number = result1.rows[0]['emergency_number']
                    if (result1.rows[0]['phone_number'] == null || result1.rows[0]['phone_number'] == 'null' || result1.rows[0]['phone_number'] == undefined || result1.rows[0]['phone_number'] == 'undefined') phone_number = ' '
                    else phone_number = result1.rows[0]['phone_number']
                    if (result1.rows[0]['blood_group_id'] == null || result1.rows[0]['blood_group_id'] == 'null' || result1.rows[0]['blood_group_id'] == undefined || result1.rows[0]['blood_group_id'] == 'undefined') blood_group_id = ' '
                    else blood_group_id = Number(result1.rows[0]['blood_group_id'])
                    if (result1.rows[0]['address'] == null || result1.rows[0]['address'] == 'null' || result1.rows[0]['address'] == undefined || result1.rows[0]['address'] == 'undefined') address = ' '
                    else address = result1.rows[0]['address']
                    if (result1.rows[0]['city'] == null || result1.rows[0]['city'] == 'null' || result1.rows[0]['city'] == undefined || result1.rows[0]['city'] == 'undefined') city = ' '
                    else city = result1.rows[0]['city']
                    if (result1.rows[0]['pincode'] == null || result1.rows[0]['pincode'] == 'null' || result1.rows[0]['pincode'] == undefined || result1.rows[0]['pincode'] == 'undefined') pincode = ' '
                    else pincode = result1.rows[0]['pincode']
                    if (result1.rows[0]['ward_name'] == null || result1.rows[0]['ward_name'] == 'null' || result1.rows[0]['ward_name'] == undefined || result1.rows[0]['ward_name'] == 'undefined') ward_name = ' '
                    else ward_name = Number(result1.rows[0]['ward_name'])
                    if (result1.rows[0]['ward_id'] == null || result1.rows[0]['ward_id'] == 'null' || result1.rows[0]['ward_id'] == undefined || result1.rows[0]['ward_id'] == 'undefined') ward_id = ' '
                    else ward_id = result1.rows[0]['ward_id']
                    profile_data.push({
                        "image_path": result1.rows[0]['image_path'],
                        "full_name": result1.rows[0]['f_name'] + " " + result1.rows[0]['l_name'],
                        "phonenumber": phone_number,
                        "dob": dob,
                        "email": email,
                        "emergency_number": emergency_number,
                        "blood_group_id": blood_group_id,
                        "address": address,
                        "city": city,
                        "pincode": pincode,
                        "ward_name": ward_name,
                        "ward_id": ward_id,
                        "is_login": result1.rows[0]['is_login']
                    })
                    res.status(200).send({
                        status: true,
                        message: "Data Found Successful",
                        data: profile_data
                    })
                } else {
                    ErrorLogs.errorResponse(res, 'getGoogleProfile', 'Data Not Found', 404)
                }
            } catch (error) {
                ErrorLogs.errorResponse(res, 'getGoogleProfile', 'Internal server error', 500)
            }
        }
        GetGoogleProfile()
    },

    updateGoogleProfile: async function (req, res) {
        // if (req.files || req.files != null || Object.keys(req.files).length > 0) {
            try{
               
            const duplicateNumber = await userModel.userProfileData(req.body.phone_number,req.body.user_id);
            if (duplicateNumber.rows.length > 0) {
                ErrorLogs.errorResponse(res, 'userUpdateProfile', 'Phone number already exists', 400)
            }else{
        if (req.files) {
            var newfile = req.files.file;
            var path = "./public/UserImage/" + newfile.name;
            fs.writeFile(path, newfile.data, function (err, result) {
                var dbpath = "public/UserImage/" + newfile.name;
                if (err) {
                    ErrorLogs.errorResponse(res, 'updateGoogleProfile', 'File not uploaded!!', 403)
                } else {
                    socialModel.updateGoogleProfileWithImage(req.body, dbpath, function (err, data) {
                        if (err) {
                            ErrorLogs.errorResponse(res, 'updateGoogleProfile', 'Internal server error', 500)
                        } else {
                            if (data.rows.length > 0) {
                                res.status(200).send({
                                    status: true,
                                    message: "Data Updated Successful",
                                })
                            } else {
                                ErrorLogs.errorResponse(res, 'updateGoogleProfile', 'Failed to update data', 400)
                            }
                        }
                    });
                }
            });
        } else {
            socialModel.updateGoogleProfileWithoutImage(req.body, function (err, data_without_image) {
                if (err) {
                    ErrorLogs.errorResponse(res, 'updateGoogleProfile', 'Internal server error', 500);
                  
                } else {
                    if (data_without_image.rows.length > 0) {
                        res.status(200).send({
                            status: true,
                            message: "Data Updated Successful",
                        })
                    } else {
                        ErrorLogs.errorResponse(res, 'updateGoogleProfile', 'Failed to update data', 400)
                    }
                }
            });
        }
    }
            }catch(error){
                console.log("error in query",error);
                ErrorLogs.errorResponse(res, 'updateGoogleProfile', 'Failed to update data', 400)  
            }
    },

};

module.exports = SocialLoginController;