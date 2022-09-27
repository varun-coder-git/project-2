const db = require('../config/dbConnection'); //reference of dbconnection.js

const CitizenReportTask = {
    getCitizenData: function () {
        return new Promise((resolve, reject) => {
            db.query("select u.f_name,u.l_name,w.ward_name,w.ward_id,u.registration_date,u.user_id,u.pincode from users u inner join ward w on u.ward_id = w.ward_id  where u.citizen_status='active' and u.is_admin ='false' order by w.ward_name ASC", [], (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    },

    checkCitizenLogin: function (user_id) {
        return new Promise((resolve, reject) => {
            db.query("select u.login_type  from users u where u.user_id =$1", [user_id], (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    },

    getCitizenById: function (user_id) {
        return new Promise((resolve, reject) => {
            db.query("select u.f_name,u.l_name,u.image_path,u.email,array_to_string(array(select phone_number from users where user_id=$1), ', ') as phone_number,u.user_id,u.ward_id,u.registration_date,w.ward_name from users u inner join ward w on u.ward_id = w.ward_id where u.user_id=$1", [user_id], (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    },

    getCitizenByIdExceptSocial: function (user_id) {
        return new Promise((resolve, reject) => {
            db.query("select u.f_name,u.l_name,u.image_path,u.email,array_to_string(array(select phone_number from users where user_id=$1), ', ') as phone_number,u.user_id,u.ward_id,u.registration_date,w.ward_name from users u inner join ward w on u.ward_id = w.ward_id where u.user_id=$1", [user_id], (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    },

    getComplaintCount: function (user_id) {
        return new Promise((resolve, reject) => {
            db.query("SELECT 'complaint_count' AS label ,COUNT (c.thread_id) logged_count FROM complaints c where c.user_id =$1 AND c.subject is not null AND c.active_delete ='active' and c.complaint_comment ='complaint' union SELECT 'idea_count' as idea_count ,COUNT (i.user_id) idea_count FROM ideas i inner join status_master sm on i.status =sm.status_id where i.user_id=$1 and sm.status_code !='Delete' and i.subject is not null union select 'incident_count' as incident_count,COUNT(i2.incident_id) incident_count from incident i2 where i2.user_id =$1  and i2.incident_active_delete ='active' and i2.incident_comment ='incident' union select 'volunteer_count' as volunteer_count,count(v.volunteer_id) volunteer_count from volunteers v  where v.user_id =$1 and v.volunteer_account ='active' and v.volunteer_comment ='volunteer' order by label ASC", [user_id], (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    },

    getIdeaCount: function (id) {
        return new Promise((resolve, reject) => {
            db.query("SELECT COUNT (i.user_id) idea_count FROM ideas i inner join status_master sm on i.status =sm.status_id where i.user_id=$1 and sm.status_code !='Delete' and i.subject is not null ", [id], (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    },
    deleteCitizen: function (citizen_user_id,) {
        return new Promise((resolve, reject) => {
            db.query("update users set citizen_status='deleted' where user_id=$1 returning user_id", [citizen_user_id], (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    },

};
module.exports = CitizenReportTask;