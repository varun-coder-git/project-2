const db = require('../config/dbConnection'); //reference of dbconnection.js
const moment = require('moment');

const SocialLoginTask = {
    checkGoogleLogin: function (data) {
        return new Promise((resolve, reject) => {
            db.query("select user_id,f_name,l_name,is_admin,ward_id,image_path,is_profile_complete,email,login_type from users where social_id=$1 and (login_type='facebook' or login_type='google')", [data.Id], (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    },

    updateGoogleLoginState: function (user_id,) {
        return new Promise((resolve, reject) => {
            db.query("update users set is_login=true where user_id=$1 returning user_id", [user_id], (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    },

    registerGoogleUser: function(data, callback) {
        if (data.login_type == 'google') {
            let today_date = moment().format("YYYY-MM-DD HH:mm")
            db.query("insert into users(f_name,l_name,email,image_path,citizen_status,registration_date,login_type,is_profile_complete,social_id,latitude,longitude,address) values($1,$2,$3,$4,'active',$5,'google','false',$6,$7,$8,$9) returning user_id,f_name,l_name,is_admin,ward_id,image_path,is_profile_complete,email,login_type,is_login", [data.givenName, data.familyName, data.email, data.imageUrl, today_date, data.Id, data.latitude, data.longitude, data.address], callback);
        } else {
            let today_date = moment().format("YYYY-MM-DD HH:mm")
            db.query("insert into users(f_name,l_name,email,image_path,citizen_status,registration_date,login_type,is_profile_complete,social_id,latitude,longitude,address) values($1,$2,$3,$4,'active',$5,'facebook','false',$6,$7,$8,$9) returning user_id,f_name,l_name,is_admin,ward_id,image_path,is_profile_complete,email,login_type,is_login", [data.givenName, data.familyName, data.email, data.imageUrl, today_date, data.Id, data.latitude, data.longitude, data.address], callback);
        }
    },

    registerGoogleUser: function (data) {
        if (data.login_type == 'google') {
            let today_date = moment().format("YYYY-MM-DD HH:mm")
            return new Promise((resolve, reject) => {
                db.query("insert into users(f_name,l_name,email,image_path,citizen_status,registration_date,login_type,is_profile_complete,social_id,latitude,longitude,address) values($1,$2,$3,$4,'active',$5,'google','false',$6,$7,$8,$9) returning user_id,f_name,l_name,is_admin,ward_id,image_path,is_profile_complete,email,login_type,is_login", [data.givenName, data.familyName, data.email, data.imageUrl, today_date, data.Id, data.latitude, data.longitude, data.address], (error, results) => {
                    if (error) return reject(error);
                    return resolve(results);
                });
            });
        } else {
            let today_date = moment().format("YYYY-MM-DD HH:mm")
            return new Promise((resolve, reject) => {
                db.query("insert into users(f_name,l_name,email,image_path,citizen_status,registration_date,login_type,is_profile_complete,social_id,latitude,longitude,address) values($1,$2,$3,$4,'active',$5,'facebook','false',$6,$7,$8,$9) returning user_id,f_name,l_name,is_admin,ward_id,image_path,is_profile_complete,email,login_type,is_login", [data.givenName, data.familyName, data.email, data.imageUrl, today_date, data.Id, data.latitude, data.longitude, data.address],  (error, results) => {
                    if (error) return reject(error);
                    return resolve(results);
                });
            });
        }
    },

    getGoogleProfile: function (user_id) {
        return new Promise((resolve, reject) => {
            db.query("select u.is_login,w.ward_id ,w.ward_name,w.pincode,u.image_path,u.f_name,u.l_name,u.age,u.phone_number[array_length(u.phone_number, 1)],u.email,u.emergency_number,u.blood_group_id,u.address,u.city,state from users u left join ward w on w.ward_id =u.ward_id where user_id=$1", [user_id],(error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    },

    updateGoogleProfileWithImage: function(update_data, image_path, callback) {
        var blood;
        if (update_data.blood_group == 'null' || update_data.blood_group == null || update_data.blood_group == ' ' || update_data.blood_group == undefined) {
            blood = null
        } else {
            blood = update_data.blood_group
        }
        db.query("update users set age=$1,emergency_number=$2,blood_group_id=$3,pincode=$4,address=$5,city=$6,image_path=$7,ward_id=$9,is_profile_complete=$10,phone_number=array_append(phone_number,$11),is_login='true' where user_id=$8 returning user_id", [update_data.dob, update_data.emergency_number, blood, update_data.pincode, update_data.address, update_data.city, image_path, update_data.user_id, update_data.ward_id, update_data.is_profile_complete, update_data.phone_number], callback)
    },

    updateGoogleProfileWithoutImage: function(update_data, callback) {
        var blood;
        if (update_data.blood_group == 'null' || update_data.blood_group == null || update_data.blood_group == ' ' || update_data.blood_group == undefined) {
            blood = null
        } else {
            blood = update_data.blood_group
        }
        db.query("update users set age=$1,emergency_number=$2,blood_group_id=$3,pincode=$4,address=$5,city=$6,ward_id=$8,is_profile_complete=$9,phone_number=array_append(phone_number,$10),is_login='true' where user_id=$7 returning user_id", [update_data.dob, update_data.emergency_number, blood, update_data.pincode, update_data.address, update_data.city, update_data.user_id, update_data.ward_id, update_data.is_profile_complete, update_data.phone_number], callback)
    },

};

module.exports = SocialLoginTask;