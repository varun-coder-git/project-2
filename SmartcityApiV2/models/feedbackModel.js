const db = require('../config/dbConnection'); //reference of dbconnection.js

const feedbackTask = {
    getAllComplaintFeedback: function () {
        return new Promise((resolve, reject) => {
            db.query("select c.user_id ,w.ward_name,c.thread_id ,c.complaint_comment ,cc.category_name,c.submission_date,c.feedback_rating,c.feedback_description,c.feedback_submission_date from complaints c left join users u on u.user_id =c.user_id left join ward w on w.ward_id =u.ward_id left join complaint_category cc on cc.complaint_cat_id = c.complaint_cat_id where c.active_delete='active' and c.complaint_comment='complaint' and c.subject is not null and c.feedback_status='active' and c.feedback_submission_date is not null   union select i.user_id,w.ward_name,i.incident_id ,i.incident_comment,ic.incident_cat_type,i.reported_date ,i.feedback_rating,i.feedback_description,i.feedback_submission_date from incident i left join users u on u.user_id =i.user_id left join ward w on w.ward_id =u.ward_id left join incident_category ic on ic.incident_cat_id =i.incident_cat_id left join incident_status is2 on is2.incident_status_id =i.incident_status_id where (ic.incident_status='active' AND i.incident_active_delete='active' AND is2.status='active' ) and i.title is not null and i.feedback_status='active' and i.feedback_status='active' and i.feedback_submission_date is not null order by ward_name asc nulls first ", [], (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    },

    deleteFeedBack: function (feedbackFor, feedback_id) {
        if (feedbackFor == 'Complaint' || feedbackFor == 'complaint') {
            return new Promise((resolve, reject) => {
                db.query("update complaints set feedback_status='deleted' where thread_id=$1 returning thread_id ", [feedback_id], (error, results) => {
                    if (error) return reject(error);
                    return resolve(results);
                });
            });
        }
        else {
            return new Promise((resolve, reject) => {
                db.query("update incident set feedback_status='deleted' where incident_id=$1 returning incident_id", [feedback_id], (error, results) => {
                    if (error) return reject(error);
                    return resolve(results);
                });
            });
        }
    },

    getFeedbackById: function (feedbackFor, feedback_id, callback) {
        if (feedbackFor == 'Complaint' || feedbackFor == 'complaint') {
            db.query("select c.thread_id,w.ward_id,w.ward_name,u.f_name,u.l_name,c.complaint_comment,cc.category_name,c.subject,c.submission_date,c.feedback_rating,c.feedback_description,c.feedback_submission_date from users u inner join ward w on u.ward_id =w.ward_id inner join complaints c on c.user_id = u.user_id inner join complaint_category cc  on cc.complaint_cat_id =c.complaint_cat_id where c.thread_id =$1 and c.complaint_comment='complaint' ; ", [feedback_id], callback);
        }
        else {
            db.query("Select i.incident_id,w.ward_id,w.ward_name,u.user_id,u.f_name,u.l_name,i.incident_comment ,ic.incident_cat_type ,i.title ,i.description ,i.reported_date ,i.feedback_rating ,i.feedback_description ,i.feedback_submission_date from incident i left join users u on u.user_id =i.user_id left join ward w on w.ward_id =u.ward_id left join incident_category ic on ic.incident_cat_id =i.incident_cat_id where i.incident_id =$1 and i.incident_comment='incident' ; ", [feedback_id], callback);
        }
    },

    getFeedbackById: function (feedbackFor, feedback_id) {
        if (feedbackFor == 'Complaint' || feedbackFor == 'complaint') {
            return new Promise((resolve, reject) => {
                db.query("select c.thread_id as id,w.ward_id,w.ward_name,u.f_name,u.l_name,c.complaint_comment as comment,cc.category_name as cat_name,c.subject as subject,c.submission_date as submission_date,c.feedback_rating,c.feedback_description,c.feedback_submission_date from users u inner join ward w on u.ward_id =w.ward_id inner join complaints c on c.user_id = u.user_id inner join complaint_category cc  on cc.complaint_cat_id =c.complaint_cat_id where c.thread_id =$1 and c.complaint_comment='complaint' ; ", [feedback_id], (error, results) => {
                    if (error) return reject(error);
                    return resolve(results);
                });
            });
        }
        else {
            return new Promise((resolve, reject) => {
                db.query("Select i.incident_id,w.ward_id,w.ward_name,u.user_id,u.f_name,u.l_name,i.incident_comment as comment,ic.incident_cat_type as cat_name,i.title as subject ,i.reported_date submission_date,i.feedback_rating ,i.feedback_description ,i.feedback_submission_date from incident i left join users u on u.user_id =i.user_id left join ward w on w.ward_id =u.ward_id left join incident_category ic on ic.incident_cat_id =i.incident_cat_id where i.incident_id =$1 and i.incident_comment='incident' ;", [feedback_id], (error, results) => {
                    if (error) return reject(error);
                    return resolve(results);
                });
            });
        }
    },
};

module.exports = feedbackTask;