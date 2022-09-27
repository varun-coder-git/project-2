const db = require('../config/dbConnection'); //reference of dbconnection.js
const moment = require('moment');
const IncidentTask = {
    getIncidentDetails: function () {
        return new Promise((resolve, reject) => {
            db.query("select w.ward_id,w.ward_name,i.incident_id, i.title,i.description,i.reported_date ,u.user_id,u.f_name ,u.l_name,u.is_admin ,ic.incident_cat_id,ic.incident_cat_type,is2.incident_status_id,is2.incident_status_type from incident i left join users u on u.user_id =i.user_id left join ward w on w.ward_id =u.ward_id left join incident_category ic on ic.incident_cat_id =i.incident_cat_id left join incident_status is2 on is2.incident_status_id =i.incident_status_id where (ic.incident_status='active' AND i.incident_active_delete='active' AND is2.status='active') and i.title is not null order by w.ward_name ASC nulls first", [], (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    },

    getIncidentDetailsById: function (incident_id) {
        return new Promise((resolve, reject) => {
            db.query("select count(im.incident_media_id) as media_count,i.latitude,i.longitude,i.address,subqueryI.comment_count ,im.incident_media_id ,im.media_path ,w.ward_id,w.ward_name,i.incident_id, i.title,i.description,i.reported_date ,u.user_id,u.f_name ,u.l_name,u.is_admin ,u.image_path, ic.incident_cat_id,ic.incident_cat_type,is2.incident_status_id,is2.incident_status_type, i.feedback_rating ,i.feedback_description ,i.feedback_submit  from incident i left join users u on u.user_id =i.user_id left join ward w on w.ward_id =u.ward_id left join incident_category ic on ic.incident_cat_id =i.incident_cat_id left join incident_status is2 on is2.incident_status_id =i.incident_status_id full outer join incident_media im on im.incident_id =i.incident_id left join (select  main_incident_id ,count(comment) as comment_count from incident where comment_active_delete='active' and comment is not null group by main_incident_id ) subqueryI on(i.incident_id = subqueryI.main_incident_id ) where i.incident_id =$1 group by i.address,subqueryI.comment_count ,im.incident_media_id ,im.media_path ,w.ward_id,w.ward_name,i.incident_id, i.title,i.description,i.reported_date ,u.user_id,u.f_name ,u.l_name,u.is_admin ,u.image_path, ic.incident_cat_id,ic.incident_cat_type,is2.incident_status_id,is2.incident_status_type, i.feedback_rating ,i.feedback_description ,i.feedback_submit,i.latitude,i.longitude order by w.ward_name asc", [incident_id], (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    },

    getIncidentComments: function (incident_id, offset) {
        return new Promise((resolve, reject) => {
            db.query("select u.login_type,u.user_id ,u.image_path,u.is_admin,u.f_name,u.l_name,i.comment,i.incident_id ,i.reported_date from users u inner join incident i on u.user_id=i.user_id where i.main_incident_id=$1 AND i.comment_active_delete='active' order by i.reported_date DESC limit $2 ", [incident_id, offset], (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    },

    getIncidentCategory: function () {
        return new Promise((resolve, reject) => {
            db.query("select incident_cat_id,incident_cat_type from incident_category order by incident_cat_type ASC", [], (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    },

    getIncidentStatusCategory: function () {
        return new Promise((resolve, reject) => {
            db.query("select incident_status_id,incident_status_type from incident_status order by incident_status_type ASC", [], (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    },

    deleteIncident: function (incident_id) {
        return new Promise((resolve, reject) => {
            db.query("update incident set incident_active_delete='deleted' where incident_id=$1 returning incident_id", [incident_id], (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    },

    updateIncidentStatus: function (incident_id, incident_status_id) {
        return new Promise((resolve, reject) => {
            let current_date = moment().format("MM-DD-YYYY HH:mm:ss")
            db.query("update incident set incident_status_id=$2,status_update_date=$3 where incident_id=$1 returning incident_id", [incident_id, incident_status_id, current_date], (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    },

    addIncidentComment: function (user_id, comment, incident_id,) {
        return new Promise((resolve, reject) => {
            let reported_date = moment().format(" MM-DD-YYYY HH:mm:ss")
            db.query("insert into incident(user_id,comment,main_incident_id,reported_date,incident_comment) values($1,$2,$3,$4,'comment') returning incident_id", [user_id, comment, incident_id, reported_date], (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    },

    deleteIncidentComment: function (incident_id) {
        return new Promise((resolve, reject) => {
            db.query("update incident set comment_active_delete='deleted' where incident_id=$1 returning incident_id", [incident_id], (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    },

    // OCM API

    searchIncident: function (mainQuery) {
        return new Promise((resolve, reject) => {
            db.query(mainQuery, [], (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    },

    myIncidentStatus: function (user_id) {
        return new Promise((resolve, reject) => {
            db.query("select count(title) filter (where incident_active_delete='active' and user_id=$1) as total,count(incident_status_id) filter (where incident_status_id=3 and incident_active_delete='active' and user_id=$1) as in_progress,count(incident_status_id) filter (where incident_status_id=2 and incident_active_delete='active' and user_id=$1) as closed,count(incident_status_id ) filter (where incident_status_id=4 and incident_active_delete='active' and user_id=$1) as rejected,count(incident_status_id ) filter (where incident_status_id=5 and incident_active_delete='active' and user_id=$1) as reopen,count(incident_status_id) filter (where incident_status_id=1 and incident_active_delete='active' and user_id=$1) as open from incident", [user_id], (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    },

    myIncidentFeedback: function (incident_id, feedback_rating, feedback_description) {
        return new Promise((resolve, reject) => {
            let submission_date = moment().format(" MM-DD-YYYY HH:mm:ss")

            db.query("update incident set feedback_rating=$2,feedback_description=$3,feedback_status='active',feedback_submission_date =$4,feedback_submit='true' where incident_id =$1 returning incident_id ", [incident_id, feedback_rating, feedback_description, submission_date], (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    },

    createIncident: function (user_id, is_anonymous, title, incident_cat_id, description, latitude, longitude, address, callback) {
        let reported_date = moment().format(" MM-DD-YYYY HH:mm:ss")
        if (is_anonymous == 'true' || is_anonymous == true) {
            db.query("insert into incident(incident_cat_id,incident_status_id,reported_date,is_anonymous,title,  description, incident_active_delete,incident_comment,latitude,longitude,address) values($1,1,$2,$3,$4,$5,'active','incident',$6,$7,$8) returning incident_id", [incident_cat_id, reported_date, is_anonymous, title, description, latitude, longitude, address], callback)
        }
        else {
            db.query("insert into incident(user_id,incident_cat_id,incident_status_id,reported_date,is_anonymous,title,  description,incident_active_delete,incident_comment,latitude,longitude,address) values($1,$2,1,$3,$4,$5,$6,'active','incident',$7,$8,$9) returning incident_id", [user_id, incident_cat_id, reported_date, is_anonymous, title, description, latitude, longitude, address], callback)
        }
    },

    insertIncidentMedia: function (incident_id, db_path, callback) {
        db.query("insert into incident_media(incident_id,media_path) values($1,$2) returning incident_media_id ", [incident_id, db_path], callback)
    },

};

module.exports = IncidentTask;