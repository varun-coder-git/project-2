const db = require('../config/dbConnection'); //reference of dbconnection.js
const moment = require('moment');

const UserTask = {
    createComplaintData: function (user_id, subject, complaint_cat_id, complaint, ward_id, latitude, longitude, address, callback) {
        let submission_date = moment().format(" MM-DD-YYYY HH:mm:ss ")
        db.query("insert into complaints(user_id,subject,complaint_cat_id,complaint, submission_date, complaint_status_id,complaint_comment,ward_id,latitude,longitude,address,complaint_status_date) values($1,$2,$3,$4,$5,1,'complaint',$6,$7,$8,$9,$5) returning thread_id", [user_id, subject, complaint_cat_id, complaint, submission_date, ward_id, latitude, longitude, address], callback);
    },

    insertComplaintMedia: function (thread_id, DB1_path, callback) {
        db.query("insert into complaint_media(thread_id,file_name) values($1,$2) returning thread_id", [thread_id, DB1_path], callback);
    },

    addThreadId: function (thread_id, media_path) {
        return new Promise((resolve, reject) => {
            db.query("insert into complaint_media(thread_id,file_name) values($1,$2) returning complaint_media_id", [thread_id, media_path], (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    },

    getComplaint: function () {
        return new Promise((resolve, reject) => {
            db.query("select w.ward_id,w.ward_name,c.subject,c.complaint,u.f_name,u.l_name,c.submission_date,cc.category_name,c.complaint_cat_id,c.complaint_status_id,s.status_name,c.thread_id from complaints c inner join users u on c.user_id = u.user_id inner join complaint_category cc on c.complaint_cat_id= cc.complaint_cat_id inner join complaint_status s on s.complaint_status_id=c.complaint_status_id inner join ward w on w.ward_id=c.ward_id where c.active_delete='active' order by w.ward_name", [], (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    },

    getComplaintSummaryById: function (thread_id) {
        return new Promise((resolve, reject) => {
            db.query("SELECT count(cm.complaint_media_id) as media_count,c.latitude,c.longitude,cm.complaint_media_id,c.address ,cm.file_name ,subqueryI.comment_count,u.f_name,u.user_id,u.is_admin,u.l_name,u.image_path,cs.complaint_status_id,w.ward_id,w.ward_name,c.subject,c.complaint,c.thread_id, c.complaint_cat_id,c.submission_date,cc.category_name, cs.status_name,c.feedback_rating,c.feedback_description,c.feedback_submit FROM users u inner JOIN complaints c on c.user_id = u.user_id inner JOIN complaint_category cc on c.complaint_cat_id=cc.complaint_cat_id inner Join ward w on w.ward_id=c.ward_id left JOIN complaint_status cs on cs.complaint_status_id=c.complaint_status_id left join complaint_media cm on cm.thread_id =c.thread_id left join (select main_thread_id , count(comments) as comment_count from complaints where active_delete='active' and comments is not null GROUP by main_thread_id) subqueryI on(c.thread_id = subqueryI.main_thread_id ) where c.thread_id=$1 group by cm.complaint_media_id,c.address ,cm.file_name , subqueryI.comment_count,u.f_name,u.user_id,u.is_admin, u.l_name,u.image_path,cs.complaint_status_id,w.ward_id,w.ward_name,c.subject,c.complaint,c.thread_id, c.complaint_cat_id,c.submission_date,cc.category_name, cs.status_name,c.feedback_rating, c.feedback_description,c.feedback_submit,c.latitude,c.longitude", [thread_id], (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    },

    getComments: function (thread_id, offset) {
        return new Promise((resolve, reject) => {
            db.query("select u.login_type,u.image_path,u.is_admin,u.f_name,u.l_name,c.comments,c.thread_id,c.user_id,c.submission_date from users u inner join complaints c on u.user_id=c.user_id where c.main_thread_id=$1 AND c.active_delete='active' and c.comments is not null order by c.submission_date DESC limit $2", [thread_id, offset], (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    },

    updateAdminComplaintStatus: function (thread_id, complaint_status_id) {
        return new Promise((resolve, reject) => {
            let submission_date = moment().format("MM-DD-YYYY HH:mm:ss")
            if (complaint_status_id == 3) {
                db.query("update complaints set complaint_status_id=$2,complaint_status_date=$3,feedback_submit='false' where thread_id=$1 AND active_delete='active' returning thread_id", [thread_id, complaint_status_id, submission_date], (error, results) => {
                    if (error) return reject(error);
                    return resolve(results);
                });
            }
            else {
                db.query("update complaints set complaint_status_id=$2,complaint_status_date=$3 where thread_id=$1 AND active_delete='active' returning thread_id", [thread_id, complaint_status_id, submission_date], (error, results) => {
                    if (error) return reject(error);
                    return resolve(results);
                });
            }
        });
    },

    getComplaintStatusDate: function (thread_id) {
        return new Promise((resolve, reject) => {
            db.query("select complaint_status_date from complaints where thread_id=$1", [thread_id,], (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    },

    deleteComplaint: function (thread_id) {
        return new Promise((resolve, reject) => {
            db.query("update complaints set active_delete='delete' where thread_id=$1 returning thread_id", [thread_id], (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    },

    addComment: function (user_id, comments, thread_id) {
        return new Promise((resolve, reject) => {
            let submission_date = moment().format(" MM-DD-YYYY HH:mm:ss")
            db.query("INSERT into complaints(user_id,comments,submission_date,main_thread_id,complaint_comment) values($1,$2,$3,$4,'comment') returning thread_id", [user_id, comments, submission_date, thread_id], (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    },

    deleteComment: function (comment_thread_id) {
        return new Promise((resolve, reject) => {
            db.query("update complaints set active_delete='delete' where thread_id=$1 returning thread_id", [comment_thread_id], (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    },

    getComplaintStatus: function () {
        return new Promise((resolve, reject) => {
            db.query("select complaint_status_id,status_name from complaint_status order by status_name ASC", [], (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    },

    searchComplaint: function (mainQuery) {
        return new Promise((resolve, reject) => {
            db.query(mainQuery, [], (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    },

    myComplaintStatus: function (user_id) {
        return new Promise((resolve, reject) => {
            db.query("select count(complaint_status_id) filter (where active_delete='active' and user_id=$1) as total,count(complaint_status_id) filter (where complaint_status_id=2 and active_delete='active' and user_id=$1) as in_progress,count(complaint_status_id) filter (where complaint_status_id=3 and active_delete='active' and user_id=$1) as closed,count(complaint_status_id) filter (where complaint_status_id=4 and active_delete='active' and user_id=$1) as rejected,count(complaint_status_id) filter (where complaint_status_id=5 and active_delete='active' and user_id=$1) as reopen,count(complaint_status_id) filter (where complaint_status_id=1 and active_delete='active' and user_id=$1) as open from complaints", [user_id], (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    },

    myComplaintFeedback: function (thread_id, feedback_rating, feedback_description) {
        return new Promise((resolve, reject) => {
            let submission_date = moment().format(" MM-DD-YYYY HH:mm:ss")
            db.query("update complaints set feedback_rating=$2,feedback_description=$3,feedback_status='active',feedback_submission_date =$4,feedback_submit='true' where thread_id =$1 returning thread_id ", [thread_id, feedback_rating, feedback_description, submission_date], (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    },

    complaintCategory: function () {
        return new Promise((resolve, reject) => {
            db.query("select * from complaint_category order by category_name ASC", [], (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    },


};
module.exports = UserTask;