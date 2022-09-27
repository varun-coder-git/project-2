const db = require('../config/dbConnection'); //reference of dbconnection.js
const moment = require('moment');
const validator = require('validator')

const adminModel={
    adminRegister: function (first_name, last_name, email, phoneNumber, encryptedPassword, pin_code, default_image, otp, ward_id) {
        return new Promise((resolve, reject) => {
            let today_date = moment().format("MM-DD-YYYY HH:mm")
            db.query("insert into users(f_name,l_name,email,phone_number, passcode,pincode,image_path, email_otp, citizen_status,registration_date,ward_id,mobile_otp_date,is_admin) values($1,$2,$3,$4,$5,$6,$7,$8,'inactive',$9,$10,$9,true) returning user_id", [first_name, last_name, email, '{'+phoneNumber+'}', encryptedPassword, pin_code, default_image, otp, today_date, ward_id], (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    },

    activateAdminAccount: function (email) {
        return new Promise((resolve, reject) => {
            db.query("update users set citizen_status='active' where email=$1 and login_type='manual' and is_admin=true returning user_id;", [email], (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    },
    updateadminOTP: function (email, otp) {
        return new Promise((resolve, reject) => {
            let today_date = moment().format("MM-DD-YYYY HH:mm")
            db.query("update users set email_otp=$2,mobile_otp_date=$3 where email =$1 and login_type='manual' and is_admin=true returning user_id,f_name,l_name", [email, otp, today_date], (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    },
    adminSaveOTPAndUpdateStatus: function (user_id, otp) {
        return new Promise((resolve, reject) => {
            let today_date = moment().format("MM-DD-YYYY HH:mm")
            db.query("update users set email_otp =$2,mobile_otp_date =$3,citizen_status='inactive' where user_id =$1 returning user_id,f_name ,l_name ", [user_id, otp, today_date], (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    },
    updateAdminProfile: function (UpdateData, d_dob, d_emergency_no, d_address, blood_group, ward_id) {
        return new Promise((resolve, reject) => {
            db.query("update users set age=$1,emergency_number=$2,blood_group_id=$3,pincode=$4,address=$5,city=$6,ward_id=$8,is_profile_complete=$9,email=$10,phone_number = array_append(phone_number, $11) where user_id=$7 returning user_id", [d_dob, d_emergency_no, blood_group, UpdateData.pincode, d_address, UpdateData.city, UpdateData.user_id, ward_id,true,UpdateData.email,UpdateData.phoneNumber], (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    },
    adminUpdateProfileWithImage: function (UpdateData,d_emergency_no, d_address, blood_group, ward_id, imgpath,first_name,last_name) {
        return new Promise((resolve, reject) => {
            db.query("update users set emergency_number=$1,blood_group_id=$2,pincode=$3,address=$4,city=$5,ward_id=$7,is_profile_complete=$8,email=$9,f_name=$10,l_name=$11,image_path=$12 where user_id=$6 returning user_id", [d_emergency_no, blood_group, UpdateData.pincode, d_address, UpdateData.city, UpdateData.user_id, ward_id,true,UpdateData.email,first_name,last_name,imgpath], (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    },
    adminUpdateProfileWithImageMobile: function (UpdateData, d_emergency_no, d_address, blood_group, ward_id, imgpath,first_name,last_name) {
        return new Promise((resolve, reject) => {
            db.query("update users set emergency_number=$1,blood_group_id=$2,pincode=$3,address=$4,city=$5,ward_id=$7,is_profile_complete=$8,email=$9,phone_number = array_append(phone_number, $10),f_name=$11,l_name=$12,image_path=$13 where user_id=$6 returning user_id", [d_emergency_no, blood_group, UpdateData.pincode, d_address, UpdateData.city, UpdateData.user_id, ward_id,true,UpdateData.email,UpdateData.phoneNumber,first_name,last_name,imgpath], (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    },
    validateAdmin: function (email) {
        return new Promise((resolve, reject) => {
            db.query("select u.user_id,u.citizen_status,is_admin from users u where u.email=$1 and u.login_type='manual'", [email], (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    },
    getAdminEmail: function (user_id) {
        return new Promise((resolve, reject) => {
            db.query("select u.email from users u where u.user_id=$1;", [user_id], (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    },
    adminUpdateProfileWithoutImage: function (UpdateData,d_emergency_no, d_address, blood_group, ward_id,first_name,last_name) {
        return new Promise((resolve, reject) => {
            db.query("update users set emergency_number=$1,blood_group_id=$2,pincode=$3,address=$4,city=$5,ward_id=$7,is_profile_complete=$8,email=$9,f_name=$10,l_name=$11 where user_id=$6 returning user_id", [d_emergency_no, blood_group, UpdateData.pincode, d_address, UpdateData.city, UpdateData.user_id, ward_id,true,UpdateData.email,first_name,last_name], (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    },
    adminUpdateProfileWithoutImageMobile: function (UpdateData, d_emergency_no, d_address, blood_group, ward_id,first_name,last_name) {
        return new Promise((resolve, reject) => {
            db.query("update users set emergency_number=$1,blood_group_id=$2,pincode=$3,address=$4,city=$5,ward_id=$7,is_profile_complete=$8,email=$9,phone_number = array_append(phone_number, $10),f_name=$11,l_name=$12 where user_id=$6 returning user_id", [d_emergency_no, blood_group, UpdateData.pincode, d_address, UpdateData.city, UpdateData.user_id, ward_id,true,UpdateData.email,UpdateData.phoneNumber,first_name,last_name], (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    },
    saveEmailOTP: function (user_id, otp) {
        return new Promise((resolve, reject) => {
            let today_date = moment().format("MM-DD-YYYY HH:mm")
            db.query("update users set email_otp =$2,mobile_otp_date =$3 where user_id =$1 returning user_id,f_name ,l_name ", [user_id, otp, today_date], (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    },
    changeNewPassword: function (email, new_password) {
        return new Promise((resolve, reject) => {
            db.query("update users set passcode=$2 where email=$1 and is_admin=true returning user_id", [email, new_password], (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    },
    validateAdminRegistration: function (email, phoneNumber) {
        return new Promise((resolve, reject) => {
            db.query("select email,phone_number[array_length(phone_number, 1)],citizen_status from users where (email=$1 or phone_number[array_length(phone_number, 1)] =$2)", [email, phoneNumber], (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    },

}

module.exports=adminModel