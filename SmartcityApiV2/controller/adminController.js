const axios = require('axios'),
    express = require('express'),
    jwt = require('jsonwebtoken'),
    userModel = require('../models/UserModel'),
    adminModel = require('../models/adminModel'),
    bcrypt = require('bcrypt'),

    validator = require('validator'),
    isEmpty = require('../controller/isEMpty'),
    errorLogModel = require('../models/ErrorLogModel'),
    moment = require('moment'),
    nodemailer = require('nodemailer'),
    fs = require('fs'),
    emailValidator = require("deep-email-validator");
    const Cryptr = require('cryptr');
const cryptr = new Cryptr('#Screate1489d');
secret_key = cryptr.decrypt(process.env.Secret_Key),
    ErrorLogs = require('./errorController');
errorLogModel.errorData.ControllerName = 'userController';


var adminController ={
    adminRegistration: function (req, res) {
        var adminData = req.body;
        var userName = adminData.full_name;
        var email = adminData.email;
        var phoneNumber = adminData.phonenumber;
        var passcode = adminData.password
        var pincode = adminData.pincode;
        var ward_id = adminData.ward_id;
        var default_image = 'public/UserImage/CardsProfileDefaultImage.png'
        let errors = {}
        userName = !isEmpty(userName) ? userName : ''
        email = !isEmpty(email) ? email : ''
        phoneNumber = !isEmpty(phoneNumber) ? phoneNumber : ''
        passcode = !isEmpty(passcode) ? passcode : ''
        var p_lower_email = email.toLowerCase()

        if (!validator.isLength(userName, {
            min: 2,
            max: 50
        })) {
            errors.userName = 'Username should be between 2 and 50 characters.'
        }
        if (validator.isEmpty(userName)) {
            errors.userName = 'Username is required'
        }

        if (!validator.isEmail(email, {
            min: 2,
            max: 50
        })) {
            errors.email = 'Email is not valid'
        }
        if (validator.isEmpty(email)) {
            errors.email = 'Email is required.'
        }

        var no = phoneNumber.toString()
        if (no.length != 10) {
            errors.phoneNumber = 'phoneNumber should be 10 characters.'
        }

        if (validator.isEmpty(passcode)) {
            errors.passcode = 'passcode is required.'
        }
        if (!validator.isStrongPassword(passcode, {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1,
        })) {
            errors.passcode = 'Passcode should be at least 8 characters.'
        }

        if (Object.keys(errors).length > 0) {
            res.status(402).send({
                status: false,
                message: "Invalid credentials.",
                data: errors,
            });
        } else {
            async function UserRegistrationData() {
                try {
                    const result1 = await adminModel.validateAdminRegistration(p_lower_email, phoneNumber);
                    if (result1.rows.length > 0) {
                        res.status(403).send({
                            status: false,
                            message: "Email or Phone Number already exist",
                            account_verification_flag: result1.rows[0]['citizen_status']
                        });
                    } else {
                        const encryptedPassword = bcrypt.hashSync(passcode, 12);
                        var otp = Math.floor(1000 + Math.random() * 9000);
                        var name = userName.split(" ");
                        var first_name;
                        var last_name;

                        if (name.length == 1) {
                            first_name = name[0]
                            last_name = ' '
                        }else if(name.length == 2) {
                            var first_name = name[0]
                            last_name = name[1]
                        }else{
                            var first_name = name[0];
                            last_name = name[1]
                            for(i=2;i<name.length;i++) {
                                last_name=last_name+' '+name[i]
                            }
                        }
                        const result2 = await adminModel.adminRegister(first_name, last_name, email, phoneNumber, encryptedPassword, pincode, default_image, otp, ward_id,);
                        if (result2.rows.length > 0) {
                         const result3=await sendEmailOTP(otp,email,first_name);
                         if(result3.length>0){
                            res.status(201).send({
                                status: true,
                                message: "Registration Successful",
                                module_flag:"Registration",
                            })
                         }else{
                            ErrorLogs.errorResponse(res, 'adminRegistration', 'Failed to register', 401)
                         }
                        }
                        else ErrorLogs.errorResponse(res, 'adminRegistration', 'Something went wrong', 400)
                    }
                } catch (error) {
                    ErrorLogs.errorResponse(res, 'adminRegistration', 'Internal server error', 500)
                }
            }
            UserRegistrationData()
        }
    },
    userEmailOTPVerify: function (req, res) {
        var UserData = req.body;
        var email = UserData.email;
        var otp = UserData.otp;

        async function VerifyEmailOTP() {
            try {
                const result1 = await userModel.EmailOTPVerify(email);
                if (result1.rows.length > 0) {
                    var DBOTP = result1.rows[0]['email_otp'];
                    var diff = Math.abs(new Date(moment().format("YYYY/MM/DD HH:mm")) - new Date(moment(result1.rows[0]['mobile_otp_date']).format('YYYY/MM/DD HH:mm ')));
                    var minutes = Math.floor((diff / 1000) / 60)
                    if (DBOTP == otp && minutes <= 15) {
                        const result2 = await adminModel.activateAdminAccount(email);
                        if (result2.rows.length > 0) {
                            res.status(200).send({
                                status: true,
                                message: "OTP match",
                                otp: otp
                            })
                        } else ErrorLogs.errorResponse(res, 'userEmailOTPVerify', 'Something went wrong', 400)
                    } else if (DBOTP == otp && minutes > 15) ErrorLogs.errorResponse(res, 'userEmailOTPVerify', 'OTP expired', 401)
                    else ErrorLogs.errorResponse(res, 'userEmailOTPVerify', "OTP doesn't match!!!", 401)
                }
                else ErrorLogs.errorResponse(res, 'userEmailOTPVerify', 'Data Not Found', 404)
            } catch (error) {
                ErrorLogs.errorResponse(res, 'userEmailOTPVerify', 'Internal server error', 500)
            }
        }
        VerifyEmailOTP()
    },
    adminResendOTP: function (req, res) {
        var UserData = req.body;
        var email = UserData.email;
        var otp = Math.floor(1000 + Math.random() * 9000);
        async function ResendOTP() {
            try {
                const result1 = await adminModel.updateadminOTP(email, otp,);
                if (result1.rows.length > 0) {
                    var full_name = result1.rows[0]['f_name'] + " " + result1.rows[0]['l_name'];
                    const result3=await sendEmailOTP(otp,email,full_name);
                    if(result3.length>0){
                       res.status(201).send({
                           status: true,
                           message: "OTP Resend Successful",
                       })
                    }else{
                       ErrorLogs.errorResponse(res, 'adminResendOTP', 'Failed to resend OTP', 401)
                    }
                    
                } else {
                    ErrorLogs.errorResponse(res, 'adminResendOTP', 'Something went wrong', 400)
                }
            } catch (error) {
                ErrorLogs.errorResponse(res, 'adminResendOTP', 'Internal server error', 500)
            }
        }
        ResendOTP()
    },
    
    adminProfile: function (req, res) {
        var UserData = req.body;
        var user_id = UserData.user_id;
        var profile_data = []

        async function ProfileData() {
            try {
                const result1 = await userModel.userProfile(user_id);
                if (result1.rows.length > 0) {
                    var dob;
                    var email;
                    var emergency_number;
                    var blood_group_id;
                    var address;

                    if (result1.rows[0]['age'] == null || result1.rows[0]['age'] == 'null' || result1.rows[0]['age'] == undefined || result1.rows[0]['age'] == 'undefined') {
                        dob = ' '
                    } else {
                        dob = result1.rows[0]['age']
                    }
                    if (result1.rows[0]['email'] == null || result1.rows[0]['email'] == 'null' || result1.rows[0]['email'] == undefined || result1.rows[0]['email'] == 'undefined') {
                        email = ' '
                    } else {
                        email = result1.rows[0]['email']
                    }
                    if (result1.rows[0]['emergency_number'] == null || result1.rows[0]['emergency_number'] == 'null' || result1.rows[0]['emergency_number'] == undefined || result1.rows[0]['emergency_number'] == 'undefined') {
                        emergency_number = null
                    } else {
                        emergency_number = result1.rows[0]['emergency_number']
                    }
                    if (result1.rows[0]['blood_group_id'] == null || result1.rows[0]['blood_group_id'] == 'null' || result1.rows[0]['blood_group_id'] == undefined || result1.rows[0]['blood_group_id'] == 'undefined') {
                        blood_group_id = null
                    } else {
                        blood_group_id = Number(result1.rows[0]['blood_group_id'])
                    }
                    if (result1.rows[0]['address'] == null || result1.rows[0]['address'] == 'null' || result1.rows[0]['address'] == undefined || result1.rows[0]['address'] == 'undefined' || result1.rows[0]['address'] == " " || result1.rows[0]['address'] == ' ') {
                        address = null
                    } else {
                        address = result1.rows[0]['address']
                    }
                    profile_data.push({
                        "image_path": result1.rows[0]['image_path'],
                        "full_name": result1.rows[0]['f_name'] + " " + result1.rows[0]['l_name'],
                        "phonenumber": result1.rows[0]['phone_number'],
                        "dob": dob,
                        "email": email,
                        "address": address,
                        "emergency_number": emergency_number,
                        "blood_group_id": blood_group_id,
                        "city": result1.rows[0]['city'],
                        "pincode": result1.rows[0]['pincode'],
                        "ward_name": result1.rows[0]['ward_name'],
                        "ward_id": result1.rows[0]['ward_id']
                    })
                    res.status(200).send({
                        status: true,
                        message: "Data Found Successful",
                        data: profile_data
                    })
                } else {
                    ErrorLogs.errorResponse(res, 'adminProfile', 'Data Not Found', 404)
                }
            } catch (error) {
                ErrorLogs.errorResponse(res, 'adminProfile', 'Internal server error', 500)
            }
        }
        ProfileData()
    },

    adminUpdateProfile: function (req, res) {
        var UpdateData = req.body;
        var email = UpdateData.email;
        var phoneNumber = UpdateData.phoneNumber;
        var userName = UpdateData.full_name;
        var emergencymobile = UpdateData.emergency_number
        let errors = {}
        email = !isEmpty(email) ? email : ''
        phoneNumber = !isEmpty(phoneNumber) ? phoneNumber : ''
        emergencymobile = !isEmpty(emergencymobile) ? emergencymobile : '';
        bloodgroup = UpdateData.blood_group==undefined ? '':UpdateData.blood_group;
        userName = !isEmpty(userName) ? userName : ''
        var p_lower_email = email.toLowerCase()
        if (!validator.isLength(userName, {
            min: 2,
            max: 50
        })) {
            errors.userName = 'Username should be between 2 and 50 characters.'
        }
        if (validator.isEmpty(userName)) {
            errors.userName = 'Username is required'
        }

        if (!validator.isEmail(email, {
            min: 2,
            max: 50
        })) {
            errors.email = 'Email should be between 2 and 50 characters.'
        }
        if (validator.isEmpty(email)) {
            errors.email = 'Email is required.'
        }
        var no = phoneNumber.toString()
        if (no.length != 10) {
            errors.phoneNumber = 'phoneNumber should be 10 characters.'
            }
            if(emergencymobile==undefined ||emergencymobile=='' || emergencymobile==' ' || emergencymobile==null || emergencymobile=='null' ){
                emergencymobile='' ;
            }else{  
                var emergencyno = emergencymobile.toString();      
                if(emergencyno.length>0 && emergencyno.length!=10){
                    errors.emergency_number = 'phoneNumber should be 10 characters.'
                }
            }
            if (Object.keys(errors).length > 0) {
            res.status(402).send({
                status: false,
                message: "Invalid credentials.",
                data: errors,
            });
        } else {
            var name = userName.split(" ");
            var first_name;
            var last_name;
            if (name.length == 1) {
                first_name = name[0]
                last_name = ' '
            }else if(name.length == 2) {
                var first_name = name[0]
                last_name = name[1]
            }else{
                var first_name = name[0];
                last_name = name[1]
                for(i=2;i<name.length;i++) {
                    last_name=last_name+' '+name[i]
                }
            }
            var d_dob, d_emergency_no, d_address, blood_group, ward_id;
            d_dob=null;
            if (validator.isEmpty(UpdateData.ward_id) || UpdateData.ward_id == undefined || UpdateData.ward_id == null) {
                ward_id = null
            } else ward_id = UpdateData.ward_id
            if (validator.isEmpty(bloodgroup) || bloodgroup == null || bloodgroup == 'null' || bloodgroup == '') {
                blood_group = null
            } else blood_group = bloodgroup
            if (emergencymobile=='' || UpdateData.emergency_number == null || UpdateData.emergency_number == 'null') {
                d_emergency_no = null
            } else d_emergency_no = UpdateData.emergency_number
            if (validator.isEmpty(UpdateData.address) || UpdateData.address == 'null' || UpdateData.address == null) {
                d_address = ' '
            } else d_address = UpdateData.address
            if (req.files && req.files != null && Object.keys(req.files).length > 0) {
                var newfile = req.files.file;
                var path = "./public/UserImage/" + newfile.name;
                fs.writeFile(path, newfile.data, function (err, result) {
                    var dbpath = "public/UserImage/" + newfile.name;
                    if (err) {
                        ErrorLogs.errorResponse(res, 'userUpdateProfile', 'Failed to upload file', 403)
                    } else {
                        async function UpdateDataWithImage() {
                            try {
                                const duplicateNumber = await userModel.userProfileData(UpdateData.phoneNumber, UpdateData.user_id);
                                const duplicateEmail = await userModel.validateEmail(UpdateData.email, UpdateData.user_id);
                                if (duplicateNumber.rows.length > 0) {
                                    ErrorLogs.errorResponse(res, 'adminUpdateProfile', 'Phone number already exists', 400)
                                } else  if (duplicateEmail.rows.length > 0) {
                                    ErrorLogs.errorResponse(res, 'adminUpdateProfile', 'Email already exists', 400)
                                } else {
                                    const result1 = await userModel.userProfile(UpdateData.user_id);
                                    if (result1.rows.length > 0) {
                                        var result3;
                                        if (result1.rows[0]['email'] == UpdateData.email) {
                                            if(result1.rows[0]['phone_number'] == UpdateData.phoneNumber){
                                             result3 = await adminModel.adminUpdateProfileWithImage(UpdateData,d_emergency_no, d_address, blood_group, ward_id, dbpath,first_name,last_name);
                                            }else{
                                             result3 = await adminModel.adminUpdateProfileWithImageMobile(UpdateData,d_emergency_no, d_address, blood_group, ward_id, dbpath,first_name,last_name);
                                            }
                                            if (result3.rows.length > 0) {
                                                res.status(200).send({
                                                    status: true,
                                                    message: "Data Update Successful",
                                                })
                                            } else {
                                                ErrorLogs.errorResponse(res, 'adminUpdateProfile', 'Failed to update data', 400)
                                            }
                                        } else {
                                            let otp = Math.floor(1000 + Math.random() * 9000);
                                            var updateProfile;
                                          if(result1.rows[0]['phone_number'] == UpdateData.phoneNumber){
                                             updateProfile = await adminModel.adminUpdateProfileWithImage(UpdateData, d_dob, d_emergency_no, d_address, blood_group, ward_id, dbpath,first_name,last_name);
                                            }else{
                                             updateProfile = await adminModel.adminUpdateProfileWithImageMobile(UpdateData, d_dob, d_emergency_no, d_address, blood_group, ward_id, dbpath,first_name,last_name);
                                            }
                                            if (updateProfile.rows.length > 0) {
                                                const result2 = await adminModel.adminSaveOTPAndUpdateStatus(UpdateData.user_id, otp);
                                                if (result2.rows.length > 0) {
                                                    var full_name = result2.rows[0]['f_name'] + " " + result2.rows[0]['l_name'];
                                                    const result3=await sendEmailOTP(otp,UpdateData.email,full_name);
                                                    if(result3.length>0){
                                                       res.status(201).send({
                                                           status: true,
                                                           message: "OTP send Successful",
                                                           module_flag:"UpdateProfile"
                                                       })
                                                    }else{
                                                       ErrorLogs.errorResponse(res, 'adminUpdateProfile', 'Failed to send OTP', 401)
                                                    }
                                                   
                                                } else {
                                                    ErrorLogs.errorResponse(res, 'adminUpdateProfile', 'Something went wrong', 400)
                                                }
                                            }
                                            else {
                                                ErrorLogs.errorResponse(res, 'adminUpdateProfile', 'Failed to update data', 400)
                                            }
                                        }
                                    } else {
                                        ErrorLogs.errorResponse(res, 'adminUpdateProfile', 'Data Not Found', 404)
                                    }
                                }
                            } catch (error) {
                                ErrorLogs.errorResponse(res, 'adminUpdateProfile', 'Internal server error', 500)
                            }
                        }
                        UpdateDataWithImage()
                    }
                });
            } else if (req.files == '' || req.files == undefined || req.files == null || Object.keys(req.files).length == 0) {
                async function UpdateDataWithoutImage() {
                    try {
                        const duplicateNumber = await userModel.userProfileData(UpdateData.phoneNumber, UpdateData.user_id);
                        const duplicateEmail = await userModel.validateEmail(UpdateData.email, UpdateData.user_id);
                        if (duplicateNumber.rows.length > 0) {
                            ErrorLogs.errorResponse(res, 'adminUpdateProfile', 'Phone number already exists', 400)
                        } else  if (duplicateEmail.rows.length > 0) {
                            ErrorLogs.errorResponse(res, 'adminUpdateProfile', 'Email already exists', 400)
                        }else {
                            const result1 = await userModel.userProfile(UpdateData.user_id);
                            if (result1.rows.length > 0) {
                                var result3;
                                if (result1.rows[0]['email'] == UpdateData.email) {
                                    if(result1.rows[0]['phone_number'] == UpdateData.phoneNumber){
                                    result3 = await adminModel.adminUpdateProfileWithoutImage(UpdateData, d_emergency_no, d_address, blood_group, ward_id,first_name,last_name);
                                    }else{
                                    result3 = await adminModel.adminUpdateProfileWithoutImageMobile(UpdateData, d_emergency_no, d_address, blood_group, ward_id,first_name,last_name);    
                                    }
                                    if (result3.rows.length > 0) {
                                        res.status(200).send({
                                            status: true,
                                            message: "Data Update Successful",
                                        })
                                    } else {
                                        ErrorLogs.errorResponse(res, 'adminUpdateProfile', 'Failed to update data', 400)
                                    }
                                } else {
                                    let otp = Math.floor(1000 + Math.random() * 9000);
                                    var updateProfile;
                                   if(result1.rows[0]['phone_number'] == UpdateData.phoneNumber){
                                     updateProfile = await adminModel.adminUpdateProfileWithoutImage(UpdateData, d_emergency_no, d_address, blood_group, ward_id,first_name,last_name);
                                    }else{
                                     updateProfile = await adminModel.adminUpdateProfileWithoutImageMobile(UpdateData, d_emergency_no, d_address, blood_group, ward_id,first_name,last_name);    
                                    }
                                    if (updateProfile.rows.length > 0) {
                                        const result2 = await adminModel.adminSaveOTPAndUpdateStatus(UpdateData.user_id, otp);
                                        if (result2.rows.length > 0) {
                                            var full_name = result2.rows[0]['f_name'] + " " + result2.rows[0]['l_name'];
                                            const result3=await sendEmailOTP(otp,UpdateData.email,full_name);
                                            if(result3.length>0){
                                               res.status(201).send({
                                                   status: true,
                                                   message: "OTP send Successful",
                                                   module_flag:"UpdateProfile",                                               })
                                            }else{
                                               ErrorLogs.errorResponse(res, 'adminUpdateProfile', 'Failed to send OTP', 401)
                                            }
                                           
                                        } else {
                                            ErrorLogs.errorResponse(res, 'adminUpdateProfile', 'Something went wrong', 400)
                                        }
                                    } else {
                                        ErrorLogs.errorResponse(res, 'adminUpdateProfile', 'Failed to update data', 400)
                                    }
                                }
                            } else {
                                ErrorLogs.errorResponse(res, 'adminUpdateProfile', 'Data Not Found', 404)
                            }
                        }
                    } catch (error) {
                        ErrorLogs.errorResponse(res, 'adminUpdateProfile', 'Internal server error', 500)
                    }
                }
                UpdateDataWithoutImage()
            } else {
                ErrorLogs.errorResponse(res, 'adminUpdateProfile', 'Internal server error', 500)
            }
        }
    },
    changeAdminPassword: function (req, res) {
        var UserData = req.body;
        var user_id = UserData.user_id;
        var old_password = UserData.old_password;
        var new_password = UserData.new_password;
        let errors = {}

        if (!validator.isStrongPassword(old_password, {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1,
        })) {
            errors.old_password = 'old_password should be at least 8 characters'
        }
        if (!validator.isStrongPassword(new_password, {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1,
        })) {
            errors.new_password = 'new_password should be at least 8 characters'
        }

        if (Object.keys(errors).length > 0) {
            res.status(403).send({
                status: false,
                message: errors,
            })
        } else {
            async function ChangePasswordData() {
                try {
                    const result1 = await userModel.getOldPassword(user_id);
                    if (result1.rows.length > 0) {
                        var oldPassword = result1.rows[0]['passcode']
                        var checkPassword = bcrypt.compareSync(old_password, oldPassword);
                        if (checkPassword) {
                            const hash_password = bcrypt.hashSync(new_password, 12);
                            const result2 = await userModel.changeNewPassword(user_id, hash_password);
                            if (result2.rows.length > 0) {
                                res.status(200).send({
                                    status: true,
                                    message: "Password Set Successful",
                                })
                            } else {
                                ErrorLogs.errorResponse(res, 'changeUserPassword', 'Failed to set password', 400)
                            }
                        } else {
                            ErrorLogs.errorResponse(res, 'changeUserPassword', "Old Password doesn't match", 402)
                        }
                    } else {
                        ErrorLogs.errorResponse(res, 'changeUserPassword', 'Data Not Found', 404)
                    }
                } catch (error) {
                    ErrorLogs.errorResponse(res, 'changeUserPassword', 'Internal server error', 500)
                }
            }
            ChangePasswordData()
        }
    },

    adminForgetPassword: function (req, res) {
        var UserData = req.body;
        var email = UserData.email
        let errors = {}
        email = !isEmpty(email) ? email : ''
        if (!validator.isEmail(email, {
            min: 2,
            max: 50
        })) {
            errors.email = 'Email is not valid'
        }
        if (validator.isEmpty(email)) {
            errors.email = 'Email is required.'
        }
        if (Object.keys(errors).length > 0) {
            res.status(402).send({
                status: false,
                message: "Invalid credentials.",
                data: errors,
            });
        } else {
            async function ForgetPassword() {
                try {
                    const result1 = await adminModel.validateAdmin(email);
                    if (result1.rows.length > 0) {
                        if (result1.rows[0]['citizen_status'] == 'inactive') {
                            res.status(403).send({
                                status: false,
                                message: "Account is inactive",
                                account_verification_flag: result1.rows[0]['citizen_status']
                            });
                        } else if (result1.rows[0]['is_admin'] == false || result1.rows[0]['is_admin'] == 'false') {
                            ErrorLogs.errorResponse(res, 'adminForgetPassword', 'You are not admin', 400)
                        } else {
                            var user_id = result1.rows[0]['user_id']
                            var otp = Math.floor(1000 + Math.random() * 9000);
                            const result2 = await adminModel.saveEmailOTP(user_id, otp);
                            if (result2.rows.length > 0) {
                                var full_name = result2.rows[0]['f_name'] + " " + result2.rows[0]['l_name'];
                                const result3=await sendEmailOTP(otp,email,full_name);
                                if(result3.length>0){
                                   res.status(201).send({
                                       status: true,
                                       message: "OTP send Successful",
                                       module_flag:"ForgetPassword",
                                       
                                   })
                                }else{
                                   ErrorLogs.errorResponse(res, 'adminForgetPassword', 'Failed to send OTP', 401)
                                }
                      
                            } else {
                                ErrorLogs.errorResponse(res, 'adminForgetPassword', 'Something went wrong', 400)
                            }
                        }
                    } else {
                        ErrorLogs.errorResponse(res, 'adminForgetPassword', 'Data Not Found', 404)
                    }
                } catch (error) {
                    ErrorLogs.errorResponse(res, 'adminForgetPassword', 'Internal server error', 500)
                }
            }
            ForgetPassword()
        }
    },
    
    adminResetPassword: function (req, res) {
        var UserData = req.body;
        var email = UserData.email
        var new_password = UserData.new_password;
        let errors = {}

        if (!validator.isStrongPassword(new_password, {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1,
        })) {
            errors.new_password = 'new_password should be at least 8 characters'
        }
        if (!validator.isEmail(email, {
            min: 2,
            max: 50
        })) {
            errors.email = 'Email is not valid'
        }
        if (validator.isEmpty(email)) {
            errors.email = 'Email is required.'
        }

        if (Object.keys(errors).length > 0) {
            ErrorLogs.errorResponse(res, 'adminResetPassword', errors, 402)
        } else {
            const encryptedPassword = bcrypt.hashSync(new_password, 12);
            async function ResetPassword() {
                try {
                    const result1 = await adminModel.changeNewPassword(email, encryptedPassword);
                    if (result1.rows.length > 0) {
                        res.status(200).send({
                            status: true,
                            message: "Password Set Successful",
                            data: result1.rows[0]['user_id']
                        })
                    } else {
                        ErrorLogs.errorResponse(res, 'adminResetPassword', 'Failed to save password', 403)
                    }
                } catch (error) {
                    ErrorLogs.errorResponse(res, 'adminResetPassword', 'Internal server error', 500)
                }
            }
            ResetPassword()
        }
    },

    adminProfileInfo: function (req, res) {
        var UserData = req.body;
        var user_id = UserData.user_id;
        var profile_data = []

        async function AdminProfileData() {
            try {
                const result1 = await userModel.userProfile(user_id);
                if (result1.rows.length > 0) {
                    profile_data.push({
                        "image_path": result1.rows[0]['image_path'],
                        "full_name": result1.rows[0]['f_name'] + " " + result1.rows[0]['l_name'],
                    })
                    res.status(200).send({
                        status: true,
                        message: "Data Found Successful",
                        data: profile_data
                    })
                } else {
                    ErrorLogs.errorResponse(res, 'adminProfileInfo', 'Data Not Found', 404)
                }
            } catch (error) {
                ErrorLogs.errorResponse(res, 'adminProfileInfo', 'Internal server error', 500)
            }
        }
        AdminProfileData()
    },
    VerifyAdminChangePassword: function (req, res) {
        var UserData = req.body;
        var user_id = UserData.user_id
            async function ForgetPassword() {
                try {
                    const result1 = await adminModel.getAdminEmail(user_id);
                    if (result1.rows.length > 0) {
                            var email = result1.rows[0]['email']
                            var otp = Math.floor(1000 + Math.random() * 9000);
                            const result2 = await adminModel.saveEmailOTP(user_id, otp);
                            if (result2.rows.length > 0) {
                                var full_name = result2.rows[0]['f_name'] + " " + result2.rows[0]['l_name'];
                                const result3=await sendEmailOTP(otp,email,full_name);
                                if(result3.length>0){
                                   res.status(201).send({
                                       status: true,
                                       message: "OTP send Successful",
                                       module_flag:"ChangePassword",
                                       
                                   })
                                }else{
                                   ErrorLogs.errorResponse(res, 'VerifyAdminChangePassword', 'Failed to send OTP', 401)
                                }
                            } else {
                                ErrorLogs.errorResponse(res, 'VerifyAdminChangePassword', 'Something went wrong', 400)
                            }
                        }
                } catch (error) {
                    ErrorLogs.errorResponse(res, 'VerifyAdminChangePassword', 'Internal server error', 500)
                }
            }
            ForgetPassword()
    },
    

}

function sendEmailOTP(otp, p_lower_email, first_name) {
    return new Promise((resolve,reject)=>{
        var transporter = nodemailer.createTransport({
            from: 'no-reply@raceeye.us',
            host: 'raceeye.us', // hostname
            secureConnection: true, // use SSL
            port: 587, // port for secure SMTP
            transportMethod: 'SMTP',
            auth: {
                user: 'no-reply@raceeye.us',
                pass: 'Cu$t0mer@30201'
            },
            tls: {
                rejectUnauthorized: false
            }
        });
    
        var mailOptions = {
            from: 'no-reply@raceeye.us', // sender address 
            to: p_lower_email, // list of receivers
            bcc: 'parag.badgujar@eqw.io',
            subject: 'Smart-City', // Subject line 
            // text: '', // html body 
            html: "<b>Hi " + first_name + "<br> Your OTP for Smart City is " + otp,
        };
    
        transporter.sendMail(mailOptions, function (err, data) {
            if (err) {
                return reject(err)
            } else {
                return resolve("Mail Send");
            }
        });
    })
  
}

module.exports = adminController;