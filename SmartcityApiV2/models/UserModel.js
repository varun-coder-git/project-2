const db = require('../config/dbConnection'); //reference of dbconnection.js
const moment = require('moment');
const validator = require('validator')

const UserTask = {

    authenticateUser: function (phoneNumber) {
        return new Promise((resolve, reject) => {
            db.query("select login_type,is_profile_complete,user_id,is_admin,passcode,f_name,l_name,image_path,ward_id,citizen_status from users where phone_number[array_length(phone_number, 1)]=$1 AND login_type='manual' and (citizen_status='active' or citizen_status='inactive' )", [phoneNumber], (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    },

    updateUserLocation: function (user_id, latitude, longitude, address) {
        return new Promise((resolve, reject) => {
            db.query("update users set latitude=$2,longitude=$3,address=$4,is_login=true where user_id=$1 returning user_id,is_admin,passcode,f_name,l_name,image_path,ward_id,citizen_status", [user_id, latitude, longitude, address], (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    },

    authenticateAdmin: function (p_lower_email) {
        return new Promise((resolve, reject) => {
            db.query("select user_id,is_admin,passcode,f_name,l_name,image_path,ward_id,citizen_status from users where email=$1 AND is_admin=true", [p_lower_email], (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    },

    getOldPassword: function (user_id) {
        return new Promise((resolve, reject) => {
            db.query("select passcode from users where user_id=$1 AND citizen_status='active'", [user_id], (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    },

    changeNewPassword: function (user_id, new_password) {
        return new Promise((resolve, reject) => {
            db.query("update users set passcode=$2 where user_id=$1 returning user_id", [user_id, new_password], (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    },

    facility_count: function () {
        return new Promise((resolve, reject) => {
            db.query("SELECT l.location_category_id,lc.facility_type,lc.facility_icon_path,COUNT(l.location_category_id) item_count FROM locations l inner JOIN location_category lc ON l.location_category_id = lc.location_category_id where location_status='active' GROUP BY l.location_category_id,lc.facility_type,lc.facility_icon_path order by l.location_category_id", [], (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    },

    getWardId: function (pin_code) {
        return new Promise((resolve, reject) => {
            db.query("select ward_id from ward where pincode=$1", [pin_code], (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    },

    userRegister: function (first_name, last_name, email, phoneNumber, encryptedPassword, pin_code, default_image, otp, ward_id) {
        return new Promise((resolve, reject) => {
            let today_date = moment().format("MM-DD-YYYY HH:mm")
            db.query("insert into users(f_name,l_name,email,phone_number, passcode,pincode,image_path, mobile_otp, citizen_status,registration_date,ward_id,mobile_otp_date) values($1,$2,$3,$4,$5,$6,$7,$8,'inactive',$9,$10,$9) returning user_id", [first_name, last_name, email, '{'+phoneNumber+'}', encryptedPassword, pin_code, default_image, otp, today_date, ward_id], (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    },

    validate: function (email, phoneNumber) {
        return new Promise((resolve, reject) => {
            db.query("select email,phone_number[array_length(phone_number, 1)],citizen_status from users where (email=$1 or phone_number[array_length(phone_number, 1)] =$2) and login_type='manual'", [email, phoneNumber], (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    },

    validateEmail: function (email,user_id) {
        return new Promise((resolve, reject) => {
            db.query("select user_id from users where email=$1 and login_type='manual' and user_id !=$2", [email,user_id], (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    },

    userProfile: function (user_id) {
        return new Promise((resolve, reject) => {
            db.query("select w.ward_id ,w.ward_name,w.pincode,u.image_path,u.f_name,u.l_name,u.age,u.phone_number[array_length(u.phone_number, 1)],u.email,u.emergency_number,u.blood_group_id,u.address,u.city,state from users u inner join ward w on w.ward_id =u.ward_id where user_id=$1 ", [user_id], (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    },

    // userUpdateProfileWithImage: function (update_data, imgpath,) {
    //     return new Promise((resolve, reject) => {
    //         var d_dob;
    //         var d_emergency_no;
    //         var d_address;
    //         var blood_group;
    //         var ward_id;
    //         if (validator.isEmpty(update_data.ward_id) || update_data.ward_id == undefined || update_data.ward_id == null) {
    //             ward_id = null
    //         } else {
    //             ward_id = update_data.ward_id
    //         }

    //         if (validator.isEmpty(update_data.blood_group) || update_data.blood_group == null || update_data.blood_group == 'null') {
    //             blood_group = null
    //         } else {
    //             blood_group = update_data.blood_group
    //         }
    //         if (validator.isEmpty(update_data.dob) || update_data.dob == null || update_data.dob == 'null') {
    //             d_dob = null
    //         } else {
    //             d_dob = update_data.dob
    //         }
    //         if (validator.isEmpty(update_data.emergency_number) || update_data.emergency_number == null || update_data.emergency_number == 'null') {
    //             d_emergency_no = null
    //         } else {
    //             d_emergency_no = update_data.emergency_number
    //         }

    //         if (validator.isEmpty(update_data.address) || update_data.address == 'null' || update_data.address == null) {
    //             d_address = ' '
    //         } else {
    //             d_address = update_data.address
    //         }
    //         db.query("update users set age=$1,emergency_number=$2,blood_group_id=$3,pincode=$4,address=$5,city=$6,image_path=$7,ward_id=$9,is_profile_complete=$10 where user_id=$8", [d_dob, d_emergency_no, blood_group, update_data.pincode, d_address, update_data.city, imgpath, update_data.user_id, ward_id, update_data.is_profile_complete], (error, results) => {
    //             if (error) return reject(error);
    //             return resolve(results);
    //         });
    //     });
    // },

    // userUpdateProfileWithImage: function (update_data, imgpath, callback) {
    //     var d_dob, d_emergency_no,d_address, blood_group,ward_id;
    //     if (validator.isEmpty(update_data.ward_id) || update_data.ward_id == undefined || update_data.ward_id == null) {
    //         ward_id = null
    //     } else ward_id = update_data.ward_id

    //     if (validator.isEmpty(update_data.blood_group) || update_data.blood_group == null || update_data.blood_group == 'null') {
    //         blood_group = null
    //     } else blood_group = update_data.blood_group
    //     if (validator.isEmpty(update_data.dob) || update_data.dob == null || update_data.dob == 'null') {
    //         d_dob = null
    //     } else d_dob = update_data.dob
    //     if (validator.isEmpty(update_data.emergency_number) || update_data.emergency_number == null || update_data.emergency_number == 'null') {
    //         d_emergency_no = null
    //     } else d_emergency_no = update_data.emergency_number
    //     if (validator.isEmpty(update_data.address) || update_data.address == 'null' || update_data.address == null) {
    //         d_address = ' '
    //     } else d_address = update_data.address

    //     db.query("update users set age=$1,emergency_number=$2,blood_group_id=$3,pincode=$4,address=$5,city=$6,image_path=$7,ward_id=$9,is_profile_complete=$10 where user_id=$8 returning user_id", [d_dob, d_emergency_no, blood_group, update_data.pincode, d_address, update_data.city, imgpath, update_data.user_id, ward_id, update_data.is_profile_complete], callback)
    // },

    // userUpdateProfileWithoutImage: function (update_data, callback) {
    //     var d_dob, d_emergency_no,d_address,blood_group,ward_id;
    //     if (validator.isEmpty(update_data.ward_id) || update_data.ward_id == undefined || update_data.ward_id == null) {
    //         ward_id = null
    //     } else ward_id = update_data.ward_id

    //     if (validator.isEmpty(update_data.blood_group) || update_data.blood_group == null || update_data.blood_group == 'null') {
    //         blood_group = null
    //     } else blood_group = update_data.blood_group

    //     if (validator.isEmpty(update_data.dob) || update_data.dob == null || update_data.dob == 'null') {
    //         d_dob = null
    //     } else d_dob = update_data.dob

    //     if (validator.isEmpty(update_data.emergency_number) || update_data.emergency_number == null || update_data.emergency_number == 'null') {
    //         d_emergency_no = null
    //     } else d_emergency_no = update_data.emergency_number

    //     if (validator.isEmpty(update_data.address) || update_data.address == 'null' || update_data.address == null) {
    //         d_address = ' '
    //     } else d_address = update_data.address
    //     db.query("update users set age=$1,emergency_number=$2,blood_group_id=$3,pincode=$4,address=$5,city=$6,ward_id=$8,is_profile_complete=$9 where user_id=$7 returning user_id", [d_dob, d_emergency_no, blood_group, update_data.pincode, d_address, update_data.city, update_data.user_id, ward_id, update_data.is_profile_complete], callback)
    // },

    userUpdateProfileWithImage: function (UpdateData, d_dob, d_emergency_no, d_address, blood_group, ward_id, imgpath) {
        return new Promise((resolve, reject) => {
            db.query("update users set age=$1,emergency_number=$2,blood_group_id=$3,pincode=$4,address=$5,city=$6,image_path=$7,ward_id=$9,is_profile_complete=$10,email=$11 where user_id=$8 returning user_id", [d_dob, d_emergency_no, blood_group, UpdateData.pincode, d_address, UpdateData.city, imgpath, UpdateData.user_id, ward_id, UpdateData.is_profile_complete,UpdateData.email], (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    },

    userUpdateProfileWithoutImage: function (UpdateData, d_dob, d_emergency_no, d_address, blood_group, ward_id) {
        return new Promise((resolve, reject) => {
            db.query("update users set age=$1,emergency_number=$2,blood_group_id=$3,pincode=$4,address=$5,city=$6,ward_id=$8,is_profile_complete=$9,email=$10 where user_id=$7 returning user_id", [d_dob, d_emergency_no, blood_group, UpdateData.pincode, d_address, UpdateData.city, UpdateData.user_id, ward_id, UpdateData.is_profile_complete,UpdateData.email], (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    },

    updateUserProfile: function (UpdateData, d_dob, d_emergency_no, d_address, blood_group, ward_id) {
        return new Promise((resolve, reject) => {
            db.query("update users set age=$1,emergency_number=$2,blood_group_id=$3,pincode=$4,address=$5,city=$6,ward_id=$8,is_profile_complete=$9,email=$10,phone_number = array_append(phone_number, $11) where user_id=$7 returning user_id", [d_dob, d_emergency_no, blood_group, UpdateData.pincode, d_address, UpdateData.city, UpdateData.user_id, ward_id, UpdateData.is_profile_complete,UpdateData.email,UpdateData.phoneNumber], (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    },

    userProfileData: function (phoneNumber,user_id) {
        return new Promise((resolve, reject) => {
            db.query("select user_id  from users where phone_number[array_length(phone_number, 1)]=$1 and user_id!=$2 ", [phoneNumber,user_id], (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    },

    EmailOTP: function (otp, email) {
        return new Promise((resolve, reject) => {
            let today_date = moment().format("MM-DD-YYYY HH:mm")
            db.query("update users set email_otp=$1,email_otp_date=$3 where email=$2 returning f_name", [otp, email,today_date], (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    },

    EmailOTPVerify: function (email) {
        return new Promise((resolve, reject) => {
            db.query("select email_otp,mobile_otp_date from users where email=$1 and is_admin=true", [email], (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    },

    mobileOTPVerify: function (phoneNumber) {
        return new Promise((resolve, reject) => {
            db.query("select mobile_otp,mobile_otp_date from users where phone_number[array_length(phone_number, 1)]=$1 and login_type='manual'", [phoneNumber], (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    },

    activateUserAccount: function (phoneNumber) {
        return new Promise((resolve, reject) => {
            db.query("update users set citizen_status='active' where phone_number[array_length(phone_number, 1)]=$1 and login_type='manual' returning user_id", [phoneNumber], (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    },

    updateUserOTP: function (phoneNumber, otp) {
        return new Promise((resolve, reject) => {
            let today_date = moment().format("MM-DD-YYYY HH:mm")
            db.query("update users set mobile_otp=$2,mobile_otp_date=$3 where phone_number[array_length(phone_number, 1)]=$1 and login_type='manual' returning user_id,f_name,l_name", [phoneNumber, otp, today_date], (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    },

    UpdateNewPassword: function (email, passcode) {
        return new Promise((resolve, reject) => {
            db.query("update users set passcode=$2 where email=$1 returning user_id", [email, passcode], (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    },

    getBloodGroup: function () {
        return new Promise((resolve, reject) => {
            db.query("select * from blood_group order by  blood_group_id ASC", [], (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    },

    getPincode: function () {
        return new Promise((resolve, reject) => {
            db.query("select * from ward where ward_id!=417 order by ward_id", [], (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    },

    validateUser: function (phoneNumber) {
        return new Promise((resolve, reject) => {
            db.query("select u.user_id,u.citizen_status,is_admin from users u where u.phone_number[array_length(u.phone_number, 1)] =$1 and u.login_type='manual'", [phoneNumber], (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    },

    saveOTP: function (user_id, otp) {
        return new Promise((resolve, reject) => {
            let today_date = moment().format("MM-DD-YYYY HH:mm")
            db.query("update users set mobile_otp =$2,mobile_otp_date =$3 where user_id =$1 returning user_id,f_name ,l_name ", [user_id, otp, today_date], (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    },

    saveOTPAndUpdateStatus: function (user_id, otp) {
        return new Promise((resolve, reject) => {
            let today_date = moment().format("MM-DD-YYYY HH:mm")
            db.query("update users set mobile_otp =$2,mobile_otp_date =$3,citizen_status='inactive' where user_id =$1 returning user_id,f_name ,l_name ", [user_id, otp, today_date], (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    },

    signOut: function (user_id) {
        return new Promise((resolve, reject) => {
            db.query("update users set is_login = false where user_id =$1 returning user_id ", [user_id], (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    },
};
module.exports = UserTask;