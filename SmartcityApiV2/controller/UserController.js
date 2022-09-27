const axios = require('axios'),
    express = require('express'),
    jwt = require('jsonwebtoken'),
    userModel = require('../models/UserModel'),
    bcrypt = require('bcrypt'),
    validator = require('validator'),
    isEmpty = require('../controller/isEMpty'),
    errorLogModel = require('../models/ErrorLogModel'),
    moment = require('moment'),
    nodemailer = require('nodemailer'),
    fs = require('fs');
    emailValidator = require("deep-email-validator");
    const Cryptr = require('cryptr');
    const cryptr = new Cryptr('#Screate1489d');
    secret_key = cryptr.decrypt(process.env.Secret_Key),
    ErrorLogs = require('./errorController');
errorLogModel.errorData.ControllerName = 'userController';

console.log(jwt.sign({
    id: 1
},secret_key));

// async function AdminLogin() {
//     const email = 'paragbadgujar1@gmail.com';
//     const data = await isEmailValid(email);
//     // if (valid) 
//     console.log("valid",data);

//     function isEmailValid(email) {
//         return emailValidator.validate(email);
//         // return res.status(400).send({
//         //     message: "Please provide a valid email address.",
//         //     reason: validators[reason].reason,
//         // });
//     };
// }
// AdminLogin();

// async function DealersList() {
//     try {
//         // const email = 'paragbadgujar96@gmail.com';
//         const data = await isEmailValid('paragbadgujar96@gmail.com');
//         console.log("data",data);
//         function isEmailValid(email) {
//             return emailValidator.validate(email);
//         };
//     } catch (error) {
//         ErrorLogs.errorResponse(res, 'userRegistration', 'Internal server error', 500)
//     }
// }
// DealersList()

// const data=emailValidator.validate('paragbadgujar@gmail.com');
// console.log("data",data);

function isEmailValid(email) {
    return emailValidator.validate(email);

}
// async function emailCheck() {
//     try {
//         email='paragbadgujar1@gmail.com'
//         const data = await isEmailValid(email);
//         console.log(data);
//         if (true) return res.send({ message: "OK" });
//         else {
//             return res.status(400).send({
//                 message: "Please provide a valid email address.",
//                 reason: validators[reason].reason,
//             });
//         }
//     } catch (err) {
//         console.log("err", err);
//     }
// }

// emailCheck();

var userController = {
    authenticateLogin: function (req, res) {
        var UserData = req.body;
        var phoneNumber = UserData.phoneNumber
        let password = UserData.password
        var latitude = UserData.latitude;
        var longitude = UserData.longitude;
        var address = UserData.address;
        let errors = {}
        password = !isEmpty(password) ? password : ''

        if (validator.isEmpty(password)) {
            errors.password = 'Passcode is required.'
        }

        if (!validator.isStrongPassword(password, {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1,
        })) {
            errors.passcode = 'Passcode should be at least 8 characters'
        }

        if (Object.keys(errors).length > 0) {
            res.status(402).send({
                status: false,
                message: "Invalid credentials.",
                data: errors,
            });
        } else {
            async function LoginUser() {
                try {
                    const result1 = await userModel.authenticateUser(phoneNumber);
                    if (result1.rows.length > 0) {
                        var encryptedPassword = result1.rows[0]['passcode']
                        var decodedPassword = bcrypt.compareSync(password, encryptedPassword);

                        if (result1.rows[0]['is_admin'] == 'true' || result1.rows[0]['is_admin'] == true && decodedPassword && result1.rows[0]['citizen_status'] == 'active') {
                            ErrorLogs.errorResponse(res, 'authenticateUser', 'Internal server error', 500)
                        } else if (result1.rows[0]['citizen_status'] == 'inactive') {
                            ErrorLogs.errorResponse(res, 'authenticateUser', 'Inactive account,please verify mobile number first!!', 400)
                        } else if (decodedPassword && result1.rows[0]['citizen_status'] == 'active') {
                            const result2 = await userModel.updateUserLocation(result1.rows[0]['user_id'], latitude, longitude, address);
                            if (result2.rows.length > 0) {
                                var token = jwt.sign({
                                    id: result2.rows[0]['user_id']
                                }, secret_key);
                                var data = {
                                    "user_id": result2.rows[0]['user_id'],
                                    "is_admin": result2.rows[0]['is_admin'],
                                    "token": token,
                                    "userName": result2.rows[0]['f_name'] + " " + result2.rows[0]['l_name'],
                                    "image": result2.rows[0]['image_path'],
                                    "ward_id": result2.rows[0]['ward_id'],
                                    'is_profile_complete': result2.rows[0]['is_profile_complete'],
                                    'login_type': result1.rows[0]['login_type']
                                }
                                res.status(200).send({
                                    status: true,
                                    message: "Logged in Successful",
                                    data: data,
                                });
                            } else {
                                ErrorLogs.errorResponse(res, 'authenticateUser', 'Something went wrong', 400)
                            }
                        } else {
                            ErrorLogs.errorResponse(res, 'authenticateUser', 'Invalid Credentials', 402)
                        }
                    } else {
                        ErrorLogs.errorResponse(res, 'authenticateUser', 'Data Not Found/Account is disable', 404)
                    }
                } catch (error) {
                    ErrorLogs.errorResponse(res, 'authenticateUser', 'Internal server error', 500)
                }
            }
            LoginUser()
        }
    },

    authenticateAdmin: function (req, res) {
        var UserData = req.body;
        var email = UserData.email
        let password = UserData.password
        let errors = {}
        var p_lower_email = email.toLowerCase()
        // async function isEmailValid(email) {
        //     return emailValidator.validate(email);
        //     return res.status(400).send({
        //         message: "Please provide a valid email address.",
        //         reason: validators[reason].reason,
        //     });
        // };

        // const { valid, reason, validators } = await isEmailValid(email);
        // if (valid) return res.send({ message: "OK" });

        email = !isEmpty(email) ? email : ''
        password = !isEmpty(password) ? password : ''

        if (!validator.isEmail(email, {
            min: 2,
            max: 50
        })) {
            errors.email = 'email should be between 2 and 50 characters.'
        }
        if (validator.isEmpty(email)) {
            errors.email = 'Email is required.'
        }

        if (validator.isEmpty(password)) {
            errors.password = 'Passcode is required.'
        }
        if (!validator.isStrongPassword(password, {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1,
        })) {
            errors.passcode = 'Passcode should be at least 8 characters'
        }

        if (Object.keys(errors).length > 0) {
            res.status(402).send({
                status: false,
                message: "Invalid credentials.",
                data: errors,
            });
        }
        else {
            async function AdminLogin() {
                try {
                    const result1 = await userModel.authenticateAdmin(p_lower_email);
                    if (result1.rows.length > 0) {
                        var encryptedPassword = result1.rows[0]['passcode']
                        var decodedPassword = bcrypt.compareSync(password, encryptedPassword);
                        if (result1.rows[0]['citizen_status'] == 'inactive') {
                            ErrorLogs.errorResponse(res, 'authenticateAdmin', 'Inactive account,please verify email first!!', 400)
                        } else if (decodedPassword && result1.rows[0]['is_admin']) {
                            var user_id = result1.rows[0]['user_id']
                            var token = jwt.sign({
                                id: user_id
                            }, secret_key);
                            var data = {
                                "user_id": user_id,
                                "is_admin": result1.rows[0]['is_admin'],
                                "token": token,
                                "userName": result1.rows[0]['f_name'] + " " + result1.rows[0]['l_name'],
                                "image": result1.rows[0]['image_path'],
                                "ward_id": result1.rows[0]['ward_id'],
                            }
                            res.status(200).send({
                                status: true,
                                message: "Logged in Successful",
                                data: data,
                            });
                        } else {
                            ErrorLogs.errorResponse(res, 'authenticateAdmin', 'Invalid Credentials', 402)
                        }
                    } else {
                        ErrorLogs.errorResponse(res, 'authenticateAdmin', 'Data Not Found/Account is disable', 404)
                    }
                } catch (error) {
                    ErrorLogs.errorResponse(res, 'authenticateAdmin', 'Internal server error', 500)
                }
            }
            AdminLogin()
        }
    },

    userRegistration: function (req, res) {
        var UserData = req.body;
        var userName = UserData.full_name;
        var email = UserData.email;
        var phoneNumber = UserData.phonenumber;
        var passcode = UserData.password
        var pincode = UserData.pincode;
        var ward_id = UserData.ward_id;
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
            errors.email = 'Email should be between 2 and 50 characters.'
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
                    const result1 = await userModel.validate(p_lower_email, phoneNumber);
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
                        var last_name;
                        if (name.length == 1) {
                            first_name = name[0]
                            last_name = ' '
                        } else if(name.length == 2) {
                            var first_name = name[0]
                            last_name = name[1]
                        }else{
                            var first_name = name[0];
                            last_name = name[1]
                            for(i=2;i<name.length;i++) {
                                last_name=last_name+' '+name[i]
                            }
                        }
                        const result2 = await userModel.userRegister(first_name, last_name, email, phoneNumber, encryptedPassword, pincode, default_image, otp, ward_id,);
                        if (result2.rows.length > 0) {
                            let url = `http://103.231.100.41/websms/sendsms.aspx?userid=amitnitinshah&password=12345&sender=SMRTTM&mobileno=${phoneNumber}&msg=Hello ${userName},
${otp} is login access code for Thiruvananthapuram  Smart City App.
                            
Thanks,
Thiruvananthapuram  Smart City&peid=1201160855947153583&tpid=1207162788633877392`
                            axios.get(url).then(function (response) {
                                res.status(201).send({
                                    status: true,
                                    message: "Registration Successful",
                                })
                            }).catch(function (err) {
                                ErrorLogs.errorResponse(res, 'userRegistration', 'Failed to register', 401)
                            })
                        }
                        else ErrorLogs.errorResponse(res, 'userRegistration', 'Something went wrong', 400)
                    }
                } catch (error) {
                    ErrorLogs.errorResponse(res, 'userRegistration', 'Internal server error', 500)
                }
            }
            UserRegistrationData()
        }
    },

    userMobileOTPVerify: function (req, res) {
        var UserData = req.body;
        var phoneNumber = UserData.phonenumber;
        var otp = UserData.otp;

        async function VerifyMobileOTP() {
            try {
                const result1 = await userModel.mobileOTPVerify(phoneNumber);
                if (result1.rows.length > 0) {
                    var DBOTP = result1.rows[0]['mobile_otp'];
                    var diff = Math.abs(new Date(moment().format("YYYY/MM/DD HH:mm")) - new Date(moment(result1.rows[0]['mobile_otp_date']).format('YYYY/MM/DD HH:mm ')));
                    var minutes = Math.floor((diff / 1000) / 60)
                    if (DBOTP == otp && minutes <= 15) {
                        const result2 = await userModel.activateUserAccount(phoneNumber);
                        if (result2.rows.length > 0) {
                            res.status(200).send({
                                status: true,
                                message: "OTP match",
                                otp: otp
                            })
                        } else ErrorLogs.errorResponse(res, 'userMobileOTPVerify', 'Something went wrong', 400)
                    } else if (DBOTP == otp && minutes > 15) ErrorLogs.errorResponse(res, 'userMobileOTPVerify', 'OTP expired', 401)
                    else ErrorLogs.errorResponse(res, 'userMobileOTPVerify', "OTP doesn't match!!!", 401)
                }
                else ErrorLogs.errorResponse(res, 'userMobileOTPVerify', 'Data Not Found', 404)
            } catch (error) {
                ErrorLogs.errorResponse(res, 'userMobileOTPVerify', 'Internal server error', 500)
            }
        }
        VerifyMobileOTP()
    },

    userResendOTP: function (req, res) {
        var UserData = req.body;
        var phoneNumber = UserData.phonenumber;
        var otp = Math.floor(1000 + Math.random() * 9000);
        async function ResendOTP() {
            try {
                const result1 = await userModel.updateUserOTP(phoneNumber, otp,);
                if (result1.rows.length > 0) {
                    var full_name = result1.rows[0]['f_name'] + " " + result1.rows[0]['l_name'];
                    let url = `http://103.231.100.41/websms/sendsms.aspx?userid=amitnitinshah&password=12345&sender=SMRTTM&mobileno=${phoneNumber}&msg=Hello ${full_name},
${otp} is login access code for Thiruvananthapuram  Smart City App.
                        
Thanks,
Thiruvananthapuram  Smart City&peid=1201160855947153583&tpid=1207162788633877392`
                    axios.get(url).then(function (response) {
                        res.status(200).send({
                            status: true,
                            message: "OTP Resend Successful",
                            otp: otp
                        })
                    }).catch(function (err) {
                        ErrorLogs.errorResponse(res, 'userResendOTP', 'Failed to resend OTP', 401)
                    })
                } else {
                    ErrorLogs.errorResponse(res, 'userResendOTP', 'Something went wrong', 400)
                }
            } catch (error) {
                ErrorLogs.errorResponse(res, 'userResendOTP', 'Internal server error', 500)
            }
        }
        ResendOTP()
    },

    userProfile: function (req, res) {
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
                        emergency_number = ' '
                    } else {
                        emergency_number = result1.rows[0]['emergency_number']
                    }
                    if (result1.rows[0]['blood_group_id'] == null || result1.rows[0]['blood_group_id'] == 'null' || result1.rows[0]['blood_group_id'] == undefined || result1.rows[0]['blood_group_id'] == 'undefined') {
                        blood_group_id = ' '
                    } else {
                        blood_group_id = Number(result1.rows[0]['blood_group_id'])
                    }
                    if (result1.rows[0]['address'] == null || result1.rows[0]['address'] == 'null' || result1.rows[0]['address'] == undefined || result1.rows[0]['address'] == 'undefined') {
                        address = ' '
                    } else {
                        address = result1.rows[0]['address']
                    }
                    profile_data.push({
                        "image_path": result1.rows[0]['image_path'],
                        "full_name": result1.rows[0]['f_name'] + " " + result1.rows[0]['l_name'],
                        "phonenumber": result1.rows[0]['phone_number'],
                        "dob": dob,
                        "email": email,
                        "emergency_number": emergency_number,
                        "blood_group_id": blood_group_id,
                        "address": address,
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
                    ErrorLogs.errorResponse(res, 'userProfile', 'Data Not Found', 404)
                }
            } catch (error) {
                ErrorLogs.errorResponse(res, 'userProfile', 'Internal server error', 500)
            }
        }
        ProfileData()
    },

    userUpdateProfile: function (req, res) {
        var UpdateData = req.body;
        var email = UpdateData.email;
        var phoneNumber = UpdateData.phoneNumber
        var emergencymobile = UpdateData.emergency_number
        let errors = {}
        email = !isEmpty(email) ? email : ''
        phoneNumber = !isEmpty(phoneNumber) ? phoneNumber : ''
        emergencymobile = !isEmpty(emergencymobile) ? emergencymobile : ''
        var p_lower_email = email.toLowerCase()
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

            var d_dob, d_emergency_no, d_address, blood_group, ward_id;
            if (validator.isEmpty(UpdateData.ward_id) || UpdateData.ward_id == undefined || UpdateData.ward_id == null) {
                ward_id = null
            } else ward_id = UpdateData.ward_id

            if (validator.isEmpty(UpdateData.blood_group) || UpdateData.blood_group == null || UpdateData.blood_group == 'null') {
                blood_group = null
            } else blood_group = UpdateData.blood_group
            if (validator.isEmpty(UpdateData.dob) || UpdateData.dob == null || UpdateData.dob == 'null') {
                d_dob = null
            } else d_dob = UpdateData.dob
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
                                if (duplicateNumber.rows.length > 0) {
                                    ErrorLogs.errorResponse(res, 'userUpdateProfile', 'Phone number already exists', 400)
                                } else {
                                    const result1 = await userModel.userProfile(UpdateData.user_id);
                                    if (result1.rows.length > 0) {
                                        if (result1.rows[0]['phone_number'] == UpdateData.phoneNumber) {
                                            const result3 = await userModel.userUpdateProfileWithImage(UpdateData, d_dob, d_emergency_no, d_address, blood_group, ward_id, dbpath);
                                            if (result3.rows.length > 0) {
                                                res.status(200).send({
                                                    status: true,
                                                    message: "Data Update Successful",
                                                })
                                            } else {
                                                ErrorLogs.errorResponse(res, 'userUpdateProfile', 'Failed to update data', 400)
                                            }
                                        } else {
                                            let otp = Math.floor(1000 + Math.random() * 9000);
                                            const updateProfile = await userModel.updateUserProfile(UpdateData, d_dob, d_emergency_no, d_address, blood_group, ward_id);
                                            if (updateProfile.rows.length > 0) {
                                                const result2 = await userModel.saveOTPAndUpdateStatus(UpdateData.user_id, otp);
                                                if (result2.rows.length > 0) {
                                                    var full_name = result2.rows[0]['f_name'] + " " + result2.rows[0]['l_name']
                                                    let url = `http://103.231.100.41/websms/sendsms.aspx?userid=amitnitinshah&password=12345&sender=SMRTTM&mobileno=${UpdateData.phoneNumber}&msg=Hello ${full_name},
        ${otp} is login access code for Thiruvananthapuram  Smart City App.
                                        
        Thanks,
        Thiruvananthapuram  Smart City&peid=1201160855947153583&tpid=1207162788633877392`
                                                    axios.get(url).then(function (response) {
                                                        res.status(200).send({
                                                            status: true,
                                                            message: "OTP Send Successful",
                                                        })
                                                    }).catch(function (err) {
                                                        ErrorLogs.errorResponse(res, 'userUpdateProfile', 'Failed to send OTP', 402)
                                                    })
                                                } else {
                                                    ErrorLogs.errorResponse(res, 'userUpdateProfile', 'Something went wrong', 400)
                                                }
                                            }
                                            else {
                                                ErrorLogs.errorResponse(res, 'userUpdateProfile', 'Failed to update data', 400)
                                            }
                                        }
                                    } else {
                                        ErrorLogs.errorResponse(res, 'userUpdateProfile', 'Data Not Found', 404)
                                    }
                                }
                            } catch (error) {
                                ErrorLogs.errorResponse(res, 'userUpdateProfile', 'Internal server error', 500)
                            }
                        }
                        UpdateDataWithImage()
                    }
                });
            } else if (req.files == '' || req.files == undefined || req.files == null || Object.keys(req.files).length == 0) {
                async function UpdateDataWithoutImage() {
                    try {
                        const duplicateNumber = await userModel.userProfileData(UpdateData.phoneNumber, UpdateData.user_id);
                        if (duplicateNumber.rows.length > 0) {
                            ErrorLogs.errorResponse(res, 'userUpdateProfile', 'Phone number already exists', 400)
                        } else {
                            const result1 = await userModel.userProfile(UpdateData.user_id);
                            if (result1.rows.length > 0) {
                                if (result1.rows[0]['phone_number'] == UpdateData.phoneNumber) {
                                    const result3 = await userModel.userUpdateProfileWithoutImage(UpdateData, d_dob, d_emergency_no, d_address, blood_group, ward_id);
                                    if (result3.rows.length > 0) {
                                        res.status(200).send({
                                            status: true,
                                            message: "Data Update Successful",
                                        })
                                    } else {
                                        ErrorLogs.errorResponse(res, 'userUpdateProfile', 'Failed to update data', 400)
                                    }
                                } else {
                                    let otp = Math.floor(1000 + Math.random() * 9000);
                                    const updateProfile = await userModel.updateUserProfile(UpdateData, d_dob, d_emergency_no, d_address, blood_group, ward_id);
                                    if (updateProfile.rows.length > 0) {
                                        const result2 = await userModel.saveOTPAndUpdateStatus(UpdateData.user_id, otp);
                                        if (result2.rows.length > 0) {
                                            var full_name = result2.rows[0]['f_name'] + " " + result2.rows[0]['l_name']
                                            let url = `http://103.231.100.41/websms/sendsms.aspx?userid=amitnitinshah&password=12345&sender=SMRTTM&mobileno=${UpdateData.phoneNumber}&msg=Hello ${full_name},
            ${otp} is login access code for Thiruvananthapuram  Smart City App.
                                    
            Thanks,
            Thiruvananthapuram  Smart City&peid=1201160855947153583&tpid=1207162788633877392`
                                            axios.get(url).then(function (response) {
                                                res.status(200).send({
                                                    status: true,
                                                    message: "OTP Send Successful",
                                                })
                                            }).catch(function (err) {
                                                ErrorLogs.errorResponse(res, 'userUpdateProfile', 'Failed to send OTP', 401)
                                            })
                                        } else {
                                            ErrorLogs.errorResponse(res, 'userUpdateProfile', 'Something went wrong', 400)
                                        }
                                    } else {
                                        ErrorLogs.errorResponse(res, 'userUpdateProfile', 'Failed to update data', 400)
                                    }
                                }
                            } else {
                                ErrorLogs.errorResponse(res, 'userUpdateProfile', 'Data Not Found', 404)
                            }
                        }
                    } catch (error) {
                        ErrorLogs.errorResponse(res, 'userUpdateProfile', 'Internal server error', 500)
                    }
                }
                UpdateDataWithoutImage()
            } else {
                ErrorLogs.errorResponse(res, 'userUpdateProfile', 'Internal server error', 500)
            }
        }
    },

    userEmailOTP: function (req, res) {
        var UserData = req.body;
        var email = UserData.email;
        let errors = {}

        email = !isEmpty(email) ? email : ''
        var p_lower_email = email.toLowerCase()

        if (!validator.isEmail(email, {
            min: 2,
            max: 50
        })) {
            errors.email = 'email should be between 2 and 30 characters'
        }
        if (validator.isEmpty(email)) {
            errors.email = 'email is required'
        }

        if (Object.keys(errors).length > 0) {
            res.status(402).send({
                status: false,
                message: "Invalid credentials.",
                data: errors,
            });
        } else {
            async function EmailOTP() {
                try {
                    var otp = Math.floor(100000 + Math.random() * 9000);
                    const result1 = await userModel.EmailOTP(otp, p_lower_email);
                    if (result1.rows.length > 0) {
                        var first_name = result1.rows[0]['f_name'];
                        sendEmailOTP(otp, p_lower_email, first_name)
                        res.status(200).send({
                            status: true,
                            message: "OTP Send Successful",
                            otp: otp
                        })
                    } else {
                        ErrorLogs.errorResponse(res, 'userEmailOTP', 'Please check email ID or try again in some time!!!', 403)
                    }
                } catch (error) {
                    ErrorLogs.errorResponse(res, 'userEmailOTP', 'Internal server error', 500)
                }
            }
            EmailOTP()
        }
    },

    userEmailOTPVerify: function (req, res) {
        var UserData = req.body;
        var email = UserData.email;
        var otp = UserData.otp;
        let errors = {}
        email = !isEmpty(email) ? email : ''
        var p_lower_email = email.toLowerCase()

        if (!validator.isEmail(email, {
            min: 2,
            max: 50
        })) {
            errors.email = 'email should be between 2 and 30 characters'
        }
        if (validator.isEmpty(email)) {
            errors.email = 'email is required'
        }

        if (Object.keys(errors).length > 0) {
            res.status(402).send({
                status: false,
                message: "Invalid credentials.",
                data: errors,
            });
        } else {
            async function EmailOTPVerify() {
                try {
                    const result1 = await userModel.EmailOTPVerify();
                    if (result1.rows.length > 0) {
                        var DBOTP = result1.rows[0]['email_otp'];
                        var diff = Math.abs(new Date(moment().format("YYYY/MM/DD HH:mm")) - new Date(moment(result1.rows[0]['email_otp_date']).format('YYYY/MM/DD HH:mm ')));
                        var minutes = Math.floor((diff / 1000) / 60)
                        if (DBOTP == otp && minutes <= 15) {
                            res.status(200).send({
                                status: true,
                                message: "OTP match",
                                otp: otp
                            })
                        }
                        else if (DBOTP == otp && minutes > 15) {
                            ErrorLogs.errorResponse(res, 'userEmailOTPVerify', 'OTP expired', 401)
                        } else {
                            ErrorLogs.errorResponse(res, 'userEmailOTPVerify', "OTP  doesn't match!!!", 401)
                        }
                    } else {
                        ErrorLogs.errorResponse(res, 'userEmailOTPVerify', 'Data Not Found', 404)
                    }
                } catch (error) {
                    ErrorLogs.errorResponse(res, 'userEmailOTPVerify', 'Internal server error', 500)
                }
            }
            EmailOTPVerify()
        }
    },

    userUpdateNewPassword: function (req, res) {
        var UserData = req.body;
        var email = UserData.email;
        var passcode = UserData.password;
        let errors = {}
        email = !isEmpty(email) ? email : ''
        var p_lower_email = email.toLowerCase()

        if (!validator.isEmail(email, {
            min: 2,
            max: 50
        })) {
            errors.email = 'email should be between 2 and 50 characters'
        }
        if (validator.isEmpty(email)) {
            errors.email = 'email is required'
        }
        if (!validator.isStrongPassword(passcode, {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1,
        })) {
            errors.passcode = 'passcode should be at least 8 characters'
        }

        if (Object.keys(errors).length > 0) {
            res.status(402).send({
                status: false,
                message: "Invalid credentials.",
                data: errors,
            });
        } else {
            async function UpdateNewPassword() {
                try {
                    const encryptedPassword = bcrypt.hashSync(passcode, 12);
                    const result1 = await userModel.UpdateNewPassword(p_lower_email, encryptedPassword);
                    if (result1.rows.length) {
                        var user_id = result1.rows[0]['user_id'];
                        var id_info = {
                            "user_id": user_id
                        }
                        res.status(200).send({
                            status: true,
                            message: "Password Set Successful",
                            data: id_info
                        })
                    } else {
                        ErrorLogs.errorResponse(res, 'userUpdateNewPassword', 'Data Not Found', 404)

                    }
                } catch (error) {
                    ErrorLogs.errorResponse(res, 'userUpdateNewPassword', 'Internal server error', 500)
                }
            }
            UpdateNewPassword()
        }
    },

    changeUserPassword: function (req, res) {
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

    getBloodGroupCategory: function (req, res) {
        var UserData = req.body;
        var user_id = UserData.user_id;
        async function BloodGroupCategory() {
            try {
                const result1 = await userModel.getBloodGroup();
                if (result1.rows.length > 0) {
                    res.status(200).send({
                        status: true,
                        message: "Data Found Successful",
                        data: result1.rows
                    })
                } else {
                    ErrorLogs.errorResponse(res, 'getBloodGroupCategory', 'Data Not Found', 404)
                }
            } catch (error) {
                ErrorLogs.errorResponse(res, 'getBloodGroupCategory', 'Internal server error', 500)
            }
        }
        BloodGroupCategory()
    },

    getPincodeDetails: function (req, res) {
        async function PincodeDetails() {
            try {
                const result1 = await userModel.getPincode();
                if (result1.rows.length > 0) {
                    var pincode_list = [];
                    for (var i = 0; i < result1.rows.length; i++) {
                        pincode_list.push({
                            "ward_id": result1.rows[i]['ward_id'],
                            "ward_name": result1.rows[i]['ward_name'],
                            "pincode": result1.rows[i]['pincode'],
                        })
                    }
                    res.status(200).send({
                        status: true,
                        message: "Data Found Successful",
                        data: pincode_list
                    })
                } else {
                    ErrorLogs.errorResponse(res, 'getPincodeDetails', 'Data Not Found', 404)

                }
            } catch (error) {
                ErrorLogs.errorResponse(res, 'getPincodeDetails', 'Internal server error', 500)
            }
        }
        PincodeDetails()
    },

    userForgetPassword: function (req, res) {
        var UserData = req.body;
        var phoneNumber = UserData.phonenumber
        let errors = {}
        phoneNumber = !isEmpty(phoneNumber) ? phoneNumber : ''

        var no = phoneNumber.toString()
        if (no.length != 10) {
            errors.phoneNumber = 'phoneNumber should be 10 characters.'
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
                    const result1 = await userModel.validateUser(phoneNumber);
                    if (result1.rows.length > 0) {
                        if (result1.rows[0]['citizen_status'] == 'inactive') {
                            res.status(403).send({
                                status: false,
                                message: "Account is inactive",
                                account_verification_flag: result1.rows[0]['citizen_status']
                            });
                        } else if (result1.rows[0]['is_admin'] == true || result1.rows[0]['is_admin'] == 'true') {
                            ErrorLogs.errorResponse(res, 'userForgetPassword', 'You are not user', 400)
                        } else {
                            var user_id = result1.rows[0]['user_id']
                            var otp = Math.floor(1000 + Math.random() * 9000);
                            const result2 = await userModel.saveOTP(user_id, otp);
                            if (result2.rows.length > 0) {
                                var full_name = result2.rows[0]['f_name'] + " " + result2.rows[0]['l_name']
                                let url = `http://103.231.100.41/websms/sendsms.aspx?userid=amitnitinshah&password=12345&sender=SMRTTM&mobileno=${phoneNumber}&msg=Hello ${full_name},
${otp} is login access code for Thiruvananthapuram  Smart City App.
                                
Thanks,
Thiruvananthapuram  Smart City&peid=1201160855947153583&tpid=1207162788633877392`
                                axios.get(url).then(function (response) {
                                    res.status(200).send({
                                        status: true,
                                        message: "OTP Send Successful",
                                        data: result2.rows[0]['user_id']
                                    })
                                }).catch(function (err) {
                                    ErrorLogs.errorResponse(res, 'userForgetPassword', 'Failed to send OTP', 401)
                                })
                            } else {
                                ErrorLogs.errorResponse(res, 'userForgetPassword', 'Something went wrong', 400)
                            }
                        }
                    } else {
                        ErrorLogs.errorResponse(res, 'userForgetPassword', 'Data Not Found', 404)
                    }
                } catch (error) {
                    ErrorLogs.errorResponse(res, 'userForgetPassword', 'Internal server error', 500)
                }
            }
            ForgetPassword()
        }
    },

    userResetPassword: function (req, res) {
        var UserData = req.body;
        var user_id = UserData.user_id
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

        if (Object.keys(errors).length > 0) {
            ErrorLogs.errorResponse(res, 'userResetPassword', errors, 402)
        } else {
            const encryptedPassword = bcrypt.hashSync(new_password, 12);
            async function ResetPassword() {
                try {
                    const result1 = await userModel.changeNewPassword(user_id, encryptedPassword);
                    if (result1.rows.length > 0) {
                        res.status(200).send({
                            status: true,
                            message: "Password Set Successful",
                            data: result1.rows[0]['user_id']
                        })
                    } else {
                        ErrorLogs.errorResponse(res, 'userResetPassword', 'Failed to save password', 403)
                    }
                } catch (error) {
                    ErrorLogs.errorResponse(res, 'userResetPassword', 'Internal server error', 500)
                }
            }
            ResetPassword()
        }
    },

    userSignOut: function (req, res) {
        var UserData = req.body;
        var user_id = UserData.user_id;
        async function SignOut() {
            try {
                const result1 = await userModel.signOut(user_id);
                if (result1.rows.length > 0) {
                    res.status(200).send({
                        status: true,
                        message: "Signout Successful",
                        data: result1.rows
                    })
                } else {
                    ErrorLogs.errorResponse(res, 'userSignOut', 'Something went wrong', 400)
                }
            } catch (error) {
                ErrorLogs.errorResponse(res, 'userSignOut', 'Internal server error', 500)
            }
        }
        SignOut()
    },
};


function sendEmailOTP(otp, p_lower_email, first_name) {
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
        html: "Hi <b>" + first_name + "</,<brb>>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Your OTP for Smart City is " + otp,
    };

    transporter.sendMail(mailOptions, function (err, data) {
        if (err) {
            // res.status(500).send({
            //     status: false,
            //     message: err.message
            // })
            console.log("err ", err);
        } else {
            // res.status(200).send({
            //     status: true,
            //     message: "Mail sent"
            // })
            // console.log("Mail Send")
        }
    });
}


module.exports = userController;